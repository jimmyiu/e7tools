<template>
  <div>
    <v-sheet class="section body-2 py-1 pl-2" rounded>
      <strong>Debug Panel</strong><br />
      <span v-for="(item, key) in gearStore.distribution" :key="key">{{ key }} ({{ item }}), </span>
      Number of combinations: <strong class="body-1">{{ gearStore.numOfCombinations | formatNumber }}</strong> /
      Estimated processing time:
      <strong class="body-1">{{
        Math.ceil(((gearStore.numOfCombinations / 10000000) * 8) / 60) | formatNumber
      }}</strong>
      minutes
      <!-- <v-icon>help_outlined</v-icon> -->
      <!-- <i>
          Remark:<br />
          - only first {{ hardLimit | formatNumber }} combinations will be evaluated now (Performance
          issue)<br />
          - 10,000,000 combinations take around 7.1 seconds in the testing machine
        </i> -->
    </v-sheet>
    <v-card class="mt-2">
      <optimization-profiler v-model="profile" @change-hero="changeHero" />
      <v-divider />
      <v-progress-linear v-if="progress.processTime >= 0" height="25" :indeterminate="optimizing" striped>
        <strong>
          Processed ({{ progress.proceeded | formatNumber }}) / Evaluated ({{ progress.evaluated | formatNumber }}) /
          Found ({{ progress.found | formatNumber }}) in {{ progress.processTime }} seconds
        </strong>
      </v-progress-linear>
      <v-card-actions>
        <v-btn class="font-weight-bold" color="primary" text @click="optimize">Optimize</v-btn>
        <v-btn text @click="reset">Clear</v-btn>
        <v-divider class="mx-2" vertical />
        <v-btn class="font-weight-bold" color="success" text @click="saveProfile">Save</v-btn>
        <v-btn text @click="loadProfile">Load</v-btn>
        <v-divider class="mx-2" vertical />
      </v-card-actions>
    </v-card>

    <v-card class="mt-2 pa-2">
      <!-- <v-card-text> -->
      <v-row dense>
        <v-col cols="12" lg="auto">
          <hero-detail-card :hero-id="profile.hero.id" :rating="profile.filter.rating.point" :suit="selectedSuit" />
        </v-col>
        <v-col cols="6" lg="auto">
          <gear-detail-card :gear="selectedSuit.weapon" :ref-hero-id="profile.hero.id" />
        </v-col>
        <v-col cols="6" lg="auto">
          <gear-detail-card :gear="selectedSuit.helmet" :ref-hero-id="profile.hero.id" />
        </v-col>
        <v-col cols="6" lg="auto">
          <gear-detail-card :gear="selectedSuit.armor" :ref-hero-id="profile.hero.id" />
        </v-col>
        <v-col cols="6" lg="auto">
          <gear-detail-card :gear="selectedSuit.necklace" :ref-hero-id="profile.hero.id" />
        </v-col>
        <v-col cols="6" lg="auto">
          <gear-detail-card :gear="selectedSuit.ring" :ref-hero-id="profile.hero.id" />
        </v-col>
        <v-col cols="6" lg="auto">
          <gear-detail-card :gear="selectedSuit.boot" :ref-hero-id="profile.hero.id" />
        </v-col>
      </v-row>
      <!-- </v-card-text> -->
      <v-divider class="mt-2" />
      <v-card-actions>
        <v-btn class="font-weight-bold" color="primary" text @click="equipAll">Equip All</v-btn>
        <v-btn text @click="unequipAll">Unequip All</v-btn>
      </v-card-actions>
    </v-card>

    <v-card class="mt-2">
      <v-card-text>
        <v-row>
          <v-col>
            <v-data-table
              dense
              :footer-props="{ showFirstLastPage: true }"
              :headers="headers"
              item-key="id"
              :items="result"
              :items-per-page="10"
              :multi-sort="false"
              single-select
              @click:row="clickRow"
            >
              <template v-slot:item.sets="{ item }">
                <div class="d-flex">
                  <gear-set-icon v-for="(set, key) in item.sets" :key="key" :set="set" />
                </div>
              </template>
            </v-data-table>
          </v-col>
          <v-col cols="auto">
            <!-- <gear-detail :gear="selectedCombination.weapon" /> -->
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <v-snackbar v-if="popupMsg" v-model="popupMsg" bottom color="success" outlined timeout="1500">
      <div v-if="popupMsg == 1" class="text-center">Profile saved</div>
    </v-snackbar>
  </div>
</template>

<script lang="ts">
import { GearDetailCard, GearSetIcon, HeroDetailCard, OptimizationProfiler } from '@/components';
import { Gear, EquippedHero, OptimizationProfile, Hero, Suit, SiteState } from '@/models';
import { Vue, Component } from 'vue-property-decorator';
import { mapActions, mapGetters } from 'vuex';
import { SuitBuilder, heroService, gearFilterService } from '@/services';
import { EMPTY_PROFILE, OptimizationResult } from '@/models/optimizer';
import { GearOptimizerProgress } from '@/services/gear-optimizer';
import { GearAbility } from '@/models/common';

@Component({
  name: 'optimizer-page',
  components: { GearDetailCard, GearSetIcon, HeroDetailCard, OptimizationProfiler },
  computed: {
    ...mapGetters(['siteState', 'heros', 'gears', 'getSuit', 'getProfile', 'getHero', 'getGear'])
  },
  methods: mapActions(['saveGears', 'updateProfiles', 'updateState'])
})
export default class OptimizerPage extends Vue {
  // vuex
  readonly gears!: Gear.Gear[];
  readonly heros!: Hero[];
  readonly siteState!: SiteState;
  saveGears!: (gear: Gear.Gear[]) => void;
  updateProfiles!: (profiles: OptimizationProfile[]) => void;
  getSuit!: (heroId: string, bonusAbility?: GearAbility) => Suit;
  getGear!: (gearId: string) => Gear.Gear;
  getHero!: (heroId: string) => Hero;
  getProfile!: (heroId: string) => OptimizationProfile | undefined;
  updateState!: (siteState: Partial<SiteState>) => void;

  // worker
  worker = new Worker('../workers/gear-optimizer-worker.ts', { type: 'module' });

  // models
  profile: OptimizationProfile = {
    id: '',
    hero: {
      id: '',
      bonusAbility: {}
    },
    filter: {
      sets: [],
      necklaces: [],
      rings: [],
      boots: [],
      enhanceMode: Gear.EnhanceModeFilter.ONLY_15,
      locked: false,
      equipped: false,
      score: 0,
      rating: {
        point: {
          hp: 1,
          def: 1,
          atk: 1,
          cri: 1,
          cdmg: 1,
          spd: 1,
          eff: 1,
          res: 1
        },
        threshold: 100,
        minSize: 20
      }
    },
    stat: {
      hp: {},
      def: {},
      atk: {},
      cri: {},
      cdmg: {},
      spd: {},
      eff: {},
      res: {},
      ehp: {},
      damage: {}
    },
    evaluation: {
      forcedSets: [],
      limit: 10000000,
      brokenSet: false,
      lv85: false
    }
  } as OptimizationProfile;

  result: OptimizationResult[] = [];
  selectedSuit = {} as Suit;
  //
  optimizing = false;
  progress: GearOptimizerProgress = {
    evaluated: 0,
    proceeded: 0,
    found: 0,
    processTime: -1
  };
  popupMsg = 0;
  //
  headers = [
    { text: 'Set', value: 'sets', sortable: false },
    { text: 'HP', value: 'hp' },
    { text: 'DEF', value: 'def' },
    { text: 'ATK', value: 'atk' },
    { text: 'CRI', value: 'cri' },
    { text: 'C.DMG', value: 'cdmg' },
    { text: 'SPD', value: 'spd' },
    { text: 'EFF', value: 'eff' },
    { text: 'RES', value: 'res' },
    { text: 'Damage', value: 'damage' },
    { text: 'DMS', value: 'dms' },
    { text: 'EHP', value: 'ehp' },
    { text: 'Rate', value: 'rating' }
  ];

  get gearStore() {
    return gearFilterService.createGearStore(this.gears, this.profile.filter, {
      heroId: this.profile.hero.id,
      heroAbility: this.getHero(this.profile.hero.id)
    });
  }

  get equippedHero(): EquippedHero | undefined {
    if (this.profile.hero.id && this.selectedSuit) {
      console.log(this.selectedSuit);
      console.log('equippedHero = ', this.profile.hero.id);
      return heroService.equip(this.getHero(this.profile.hero.id), this.selectedSuit);
    }
    return undefined;
  }

  async optimize() {
    console.log('optimize::start');
    this.result.splice(0, this.result.length);
    this.optimizing = true;
    this.worker.postMessage({
      action: 'optimize',
      store: this.gearStore,
      profile: this.profile,
      hero: this.getHero(this.profile.hero.id)
    });
  }

  clickRow(item: OptimizationResult, e: any) {
    console.log('clickRow::item =', item);
    console.log('clickRow::e =', e);
    e.select();
    // console.log('clickRow::armor =', item.combination.sets);
    this.selectedSuit = this.toSuit(item);
  }

  toSuit(foo: OptimizationResult) {
    const builder = new SuitBuilder();
    builder.bonus(this.profile.hero.bonusAbility);
    [foo.weaponId, foo.helmetId, foo.armorId, foo.necklaceId, foo.ringId, foo.bootId].forEach(x => {
      if (x != undefined) {
        builder.setGear(this.getGear(x));
      }
    });
    return builder.build();
  }

  reset() {
    console.log('reset');
    this.result.splice(0, this.result.length);
    this.assignProfile(EMPTY_PROFILE);
    this.selectedSuit = this.getSuit(this.profile.hero.id, this.profile.hero.bonusAbility);
  }

  changeHero(heroId: string) {
    this.updateState({ lastSelectedHeroId: heroId });
    this.reset();
    console.log('changeHero::heroId =', heroId);
    this.profile.hero.id = heroId;
    this.loadProfile();
  }

  equipAll() {
    console.log('equipAll::hero.id =', this.profile.hero.id);
    const current = this.getSuit(this.profile.hero.id);
    [current.weapon, current.helmet, current.armor, current.necklace, current.ring, current.boot].forEach(x => {
      if (x != undefined) {
        x.equippedHero = '';
        this.saveGears([x]);
      }
    });
    if (this.selectedSuit) {
      this.unequipAll();
      console.log('equipAll::selectedSuit =', this.selectedSuit);
      const c = this.selectedSuit;
      [c.weapon, c.helmet, c.armor, c.necklace, c.ring, c.boot].forEach(x => {
        if (x != undefined) {
          x.equippedHero = this.profile.hero.id;
          this.saveGears([x]);
        }
      });
    }
  }

  unequipAll() {
    if (this.selectedSuit) {
      console.log('unequipAll::', this.selectedSuit);
      [
        this.selectedSuit.weapon,
        this.selectedSuit.helmet,
        this.selectedSuit.armor,
        this.selectedSuit.necklace,
        this.selectedSuit.ring,
        this.selectedSuit.boot
      ].forEach(x => {
        if (x != undefined) {
          x.equippedHero = '';
          this.saveGears([x]);
        }
      });
    }
  }

  saveProfile() {
    console.log(`saveProfile::profile.id = ${this.profile.hero.id}, profile =`, this.profile);
    this.updateProfiles([this.profile]);
    this.popupMsg = 1;
  }

  loadProfile() {
    console.log('loadProfile::hero.id =', this.profile.hero.id);
    const profile = this.getProfile(this.profile.hero.id);
    console.log('loadProfile::profile =', profile);
    if (profile) {
      // Object.assign(this.profile, profile);
      this.assignProfile(profile);
    } else {
      console.log('loadProfile::no saved profile');
      this.profile.id = this.profile.hero.id;
    }
    this.selectedSuit = this.getSuit(this.profile.hero.id, this.profile.hero.bonusAbility);
  }

  assignProfile(profile: OptimizationProfile) {
    console.log('assignProfile::profile =', profile);
    this.profile.id = profile.id;
    // this.profile.hero.id = profile.hero.id;
    // console.log('assignProfile', profile.hero.bonusAbility);
    this.profile.hero.bonusAbility = Object.assign({}, profile.hero.bonusAbility);
    this.profile.filter.sets = [...profile.filter.sets];
    this.profile.filter.necklaces = [...profile.filter.necklaces];
    this.profile.filter.rings = [...profile.filter.rings];
    this.profile.filter.boots = [...profile.filter.boots];
    this.profile.filter.enhanceMode = profile.filter.enhanceMode;
    this.profile.filter.locked = profile.filter.locked;
    this.profile.filter.equipped = profile.filter.equipped;
    this.profile.filter.score = profile.filter.score;
    this.profile.filter.rating.threshold = profile.filter.rating.threshold;
    this.profile.filter.rating.minSize = profile.filter.rating.minSize;
    this.profile.filter.rating.point = Object.assign({}, profile.filter.rating.point);
    this.profile.stat.hp = Object.assign({}, profile.stat.hp);
    this.profile.stat.def = Object.assign({}, profile.stat.def);
    this.profile.stat.atk = Object.assign({}, profile.stat.atk);
    this.profile.stat.cri = Object.assign({}, profile.stat.cri);
    this.profile.stat.cdmg = Object.assign({}, profile.stat.cdmg);
    this.profile.stat.spd = Object.assign({}, profile.stat.spd);
    this.profile.stat.eff = Object.assign({}, profile.stat.eff);
    this.profile.stat.res = Object.assign({}, profile.stat.res);
    this.profile.stat.ehp = Object.assign({}, profile.stat.ehp);
    this.profile.stat.damage = Object.assign({}, profile.stat.damage);
    this.profile.evaluation = Object.assign({}, profile.evaluation);
  }

  created() {
    this.setupWorker();
    this.reset();
    this.profile.hero.id = this.siteState.lastSelectedHeroId;
    this.loadProfile();
  }

  setupWorker() {
    this.worker.onmessage = e => {
      console.log('worker::onmessage::action =', e.data.action);
      if (e.data.action == 'optimize-result') {
        this.result = e.data.result;
        this.optimizing = false;
      } else if (e.data.action == 'progress') {
        console.log('worker::onmessage::result =', e.data.result);
        // this.progress.calculated = e.data.result.calculated;
        // this.progress.proceeded = e.data.result.proceeded;
        this.progress = e.data.result;
      }
    };
  }

  destroyed() {
    this.worker.terminate();
  }
}
</script>
