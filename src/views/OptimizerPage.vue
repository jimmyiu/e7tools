<template>
  <div>
    <v-card class="section">
      <v-card-text>
        <strong>Debug Panel</strong><br />
        <span v-for="(item, key) in gearStore.distribution" :key="key">{{ key }} ({{ item }}), </span>
        <!-- Filter: {{ filter }}, Criteria: {{ criteria }}<br /> -->
        <!-- Distribution: {{ gearStore.distribution }}<br /> -->
        <br />
        Number of combinations: {{ gearStore.numOfCombinations | formatNumber }}<br />
        Estimated processing time:
        {{ Math.ceil(((gearStore.numOfCombinations / 10000000) * 8) / 60) | formatNumber }}
        minutes
        <!-- <v-icon>help_outlined</v-icon> -->
        <!-- <i>
          Remark:<br />
          - only first {{ hardLimit | formatNumber }} combinations will be evaluated now (Performance
          issue)<br />
          - 10,000,000 combinations take around 7.1 seconds in the testing machine
        </i> -->
      </v-card-text>
    </v-card>
    <v-card class="mt-2">
      <v-card-text>
        <optimization-profiler v-model="profile" @change-hero="changeHero" />
      </v-card-text>
      <v-divider />
      <!-- <v-card-text> Profile: {{ profile }} </v-card-text>
      <v-divider /> -->
      <v-card-actions>
        <v-btn class="font-weight-bold" color="primary" text @click="optimize">Optimize</v-btn>
        <v-btn text @click="reset">Clear</v-btn>
        <v-divider class="mx-2" vertical />
        <v-btn class="font-weight-bold" color="success" text @click="saveProfile">Save</v-btn>
        <v-btn text @click="loadProfile">Load</v-btn>
        <v-divider class="mx-2" vertical />
      </v-card-actions>
    </v-card>

    <v-card class="mt-2">
      <v-card-text>
        <v-row v-if="equippedHero">
          <v-col class="d-flex" cols="1">
            <v-img max-height="18" max-width="18" :src="require(`@/assets/img/stat/hp.png`)" />
            {{ equippedHero.hp }}
          </v-col>
          <v-col class="d-flex" cols="1">
            <v-img max-height="18" max-width="18" :src="require(`@/assets/img/stat/def.png`)" />
            {{ equippedHero.def }}
          </v-col>
          <v-col class="d-flex" cols="1">
            <v-img max-height="18" max-width="18" :src="require(`@/assets/img/stat/atk.png`)" />
            {{ equippedHero.atk }}
          </v-col>
          <v-col class="d-flex" cols="1">
            <v-img max-height="18" max-width="18" :src="require(`@/assets/img/stat/cri.png`)" />
            {{ equippedHero.cri }}
          </v-col>
          <v-col class="d-flex" cols="1">
            <v-img max-height="18" max-width="18" :src="require(`@/assets/img/stat/cdmg.png`)" />
            {{ equippedHero.cdmg }}
          </v-col>
          <v-col class="d-flex" cols="1">
            <v-img max-height="18" max-width="18" :src="require(`@/assets/img/stat/spd.png`)" />
            {{ equippedHero.spd }}
          </v-col>
          <v-col class="d-flex" cols="1">
            <v-img max-height="18" max-width="18" :src="require(`@/assets/img/stat/eff.png`)" />
            {{ equippedHero.eff }}
          </v-col>
          <v-col class="d-flex" cols="1">
            <v-img max-height="18" max-width="18" :src="require(`@/assets/img/stat/res.png`)" />
            {{ equippedHero.res }}
          </v-col>
          <v-col class="d-flex" cols="2">Damage: {{ equippedHero.damage }}</v-col>
          <v-col class="d-flex" cols="2">EHP: {{ equippedHero.ehp }}</v-col>
        </v-row>
        <v-row>
          <v-col cols="6" lg="2" sm="2">
            <gear-detail-card :gear="selectedSuit.weapon" />
          </v-col>
          <v-col cols="6" lg="2" sm="2">
            <gear-detail-card :gear="selectedSuit.helmet" />
          </v-col>
          <v-col cols="6" lg="2" sm="2">
            <gear-detail-card :gear="selectedSuit.armor" />
          </v-col>
          <v-col cols="6" lg="2" sm="2">
            <gear-detail-card :gear="selectedSuit.necklace" />
          </v-col>
          <v-col cols="6" lg="2" sm="2">
            <gear-detail-card :gear="selectedSuit.ring" />
          </v-col>
          <v-col cols="6" lg="2" sm="2">
            <gear-detail-card :gear="selectedSuit.boot" />
          </v-col>
        </v-row>
      </v-card-text>
      <v-divider />
      <v-card-actions>
        <v-btn class="font-weight-bold" color="primary" text @click="equipAll">Equip All</v-btn>
        <v-btn text @click="unequipAll">Unequip All</v-btn>
      </v-card-actions>
    </v-card>

    <v-card class="mt-2">
      <v-progress-linear v-if="progress.processTime >= 0" height="25" :indeterminate="optimizing" striped>
        <strong>
          Processed ({{ progress.proceeded | formatNumber }}) / Evaluated ({{ progress.evaluated | formatNumber }}) /
          Found ({{ progress.found | formatNumber }}) in {{ progress.processTime }} seconds
        </strong>
      </v-progress-linear>
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
                  <gear-set-icon v-for="(set, key) in item.sets" :key="key" :set="set" small />
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
import { GearDetailCard, GearSetIcon, OptimizationProfiler } from '@/components';
import { Constants, Gear, EquipedHero, OptimizationProfile, Hero, Suit, SiteState } from '@/models';
import { Vue, Component } from 'vue-property-decorator';
import { mapActions, mapGetters } from 'vuex';
import { SuitBuilder, heroService, gearFilterService } from '@/services';
import { OptimizationResult } from '@/models/optimizer';
import { GearOptimizerProgress } from '@/services/gear-optimizer';

@Component({
  name: 'optimizer-page',
  components: { GearDetailCard, GearSetIcon, OptimizationProfiler },
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
  getSuit!: (heroId: string) => Suit;
  getGear!: (gearId: string) => Gear.Gear;
  getHero!: (heroId: string) => Hero;
  getProfile!: (heroId: string) => OptimizationProfile | undefined;
  updateState!: (siteState: Partial<SiteState>) => void;

  // worker
  worker = new Worker('../workers/gear-optimizer-worker.ts', { type: 'module' });

  // models
  profile: OptimizationProfile = {
    id: '',
    heroId: '',
    filter: {},
    stat: {},
    combination: {}
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
    { text: 'EHP', value: 'ehp' }
  ];

  get gearStore() {
    return new Gear.GearStore(
      gearFilterService.filter(this.gears, this.profile.filter, {
        heroId: this.profile.heroId
      })
    );
  }

  get equippedHero(): EquipedHero | undefined {
    if (this.profile.heroId && this.selectedSuit) {
      return heroService.equip(this.getHero(this.profile.heroId), this.selectedSuit);
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
      hero: this.getHero(this.profile.heroId)
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
    [foo.weaponId, foo.helmetId, foo.armorId, foo.necklaceId, foo.ringId, foo.bootId].forEach(x => {
      if (x != undefined) {
        builder.setGear(this.getGear(x));
      }
    });
    return builder.build();
  }

  reset() {
    this.result.splice(0, this.result.length);
    this.profile.filter = Object.assign({}, Constants.GEAR_FILTER_DEFAULT);
    this.profile.stat = {
      hp: {},
      def: {},
      atk: {}, // { min: 3500 },
      cri: { max: 110 }, // min: 96,
      cdmg: { max: 360 }, // min: 270,
      spd: {}, // min: 218
      eff: {},
      res: {},
      ehp: {},
      damage: {}
    };
    this.profile.combination = {
      forcedSets: [], // [Gear.Set.Speed, Gear.Set.Critical]
      limit: Constants.OPTIMIZATION_PROCESS_LIMIT,
      brokenSet: false
    };
    this.selectedSuit = this.getSuit(this.profile.heroId);
  }

  changeHero(heroId: string) {
    this.updateState({ lastSelectedHeroId: heroId });
    this.reset();
    this.loadProfile();
  }

  equipAll() {
    console.log('equipAll::heroId =', this.profile.heroId);
    if (this.selectedSuit) {
      this.unequipAll();
      console.log('equipAll::selectedSuit =', this.selectedSuit);
      const c = this.selectedSuit;
      [c.weapon, c.helmet, c.armor, c.necklace, c.ring, c.boot].forEach(x => {
        if (x != undefined) {
          x.equippedHero = this.profile.heroId;
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
    console.log('saveProfile::profile =', this.profile);
    this.updateProfiles([this.profile]);
    this.popupMsg = 1;
  }

  loadProfile() {
    console.log('loadProfile::hero.id =', this.profile.heroId);
    const profile = this.getProfile(this.profile.heroId);
    console.log('loadProfile::profile =', this.getProfile(this.profile.heroId));
    if (profile) {
      Object.assign(this.profile, profile);
    } else {
      console.log('loadProfile::no saved profile');
      this.profile.id = this.profile.heroId;
    }
    this.selectedSuit = this.getSuit(this.profile.heroId);
  }

  created() {
    this.setupWorker();
    this.profile.heroId = this.siteState.lastSelectedHeroId;
    this.reset();
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
