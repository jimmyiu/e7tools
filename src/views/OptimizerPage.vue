<template>
  <div>
    <v-card class="section">
      <v-card-text>
        <strong>Debug Panel</strong><br />
        <span v-for="(item, key) in gearStore.distribution" :key="key">{{ key }} ({{ item }}), </span>
        <!-- Filter: {{ filter }}, Criteria: {{ criteria }}<br /> -->
        <!-- Distribution: {{ gearStore.distribution }}<br /> -->
        <br />
        Number of combinations: {{ gearStore.numOfCombinations | formatNumber }} (Hard limit:
        {{ hardLimit | formatNumber }})<br />
        Estimated processing time:
        {{ Math.round(((gearStore.numOfCombinations / 10000000) * 8) / 60) | formatNumber }}
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
        <optimization-profiler v-model="profile" @change-hero="reset" />
      </v-card-text>
      <v-divider />
      <!-- <v-card-text> Profile: {{ profile }} </v-card-text>
      <v-divider /> -->
      <v-card-actions>
        <v-btn class="font-weight-bold" color="primary" text @click="optimize">Optimize</v-btn>
        <v-btn text @click="reset">Reset</v-btn>
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
            <gear-detail-card :gear="selectedCombination.weapon" />
          </v-col>
          <v-col cols="6" lg="2" sm="2">
            <gear-detail-card :gear="selectedCombination.helmet" />
          </v-col>
          <v-col cols="6" lg="2" sm="2">
            <gear-detail-card :gear="selectedCombination.armor" />
          </v-col>
          <v-col cols="6" lg="2" sm="2">
            <gear-detail-card :gear="selectedCombination.necklace" />
          </v-col>
          <v-col cols="6" lg="2" sm="2">
            <gear-detail-card :gear="selectedCombination.ring" />
          </v-col>
          <v-col cols="6" lg="2" sm="2">
            <gear-detail-card :gear="selectedCombination.boot" />
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
      <v-progress-linear v-if="progress > 0" height="20" indeterminate striped>
        <strong>Processed: {{ progress }}</strong>
      </v-progress-linear>
      <v-card-text>
        <v-row>
          <v-col>
            <v-data-table
              dense
              :footer-props="{ showFirstLastPage: true }"
              :headers="headers"
              item-key="combination.id"
              :items="result"
              :items-per-page="10"
              :multi-sort="false"
              single-select
              @click:row="clickRow"
            >
              <template v-slot:item.combination.sets="{ item }">
                <div class="d-flex">
                  <gear-set-icon v-for="(set, key) in item.combination.sets" :key="key" :set="set" small />
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

    <v-snackbar v-if="profile.hero" v-model="popupMsg" color="success" rounded="pill" timeout="1500" top>
      <div class="text-center">{{ profile.hero.name }} profile saved</div>
    </v-snackbar>
  </div>
</template>

<script lang="ts">
import { GearDetailCard, GearSetIcon, OptimizationProfiler } from '@/components';
import { Constants, Gear, EquipedHero, OptimizationProfile, Hero } from '@/models';
import { DefaultGearOptimizer } from '@/services/gear-optimizer';
import GearFilterService from '@/services/gear-filter-service';
import GearCombinationService from '@/services/gear-combination-service';
import { Vue, Component } from 'vue-property-decorator';
import { mapActions, mapGetters, mapState } from 'vuex';

@Component({
  name: 'optimizer-page',
  components: { GearDetailCard, GearSetIcon, OptimizationProfiler },
  computed: { ...mapGetters(['heros', 'gears', 'getEquipped', 'getProfile', 'getHero', 'getGear']) },
  methods: mapActions(['saveGears', 'updateProfiles'])
})
export default class OptimizerPage extends Vue {
  // vuex
  readonly gears!: Gear.Gear[];
  readonly heros!: Hero[];
  saveGears!: (gear: Gear.Gear[]) => void;
  updateProfiles!: (profiles: OptimizationProfile[]) => void;
  getEquipped!: (heroId: string) => Gear.GearCombination;
  getGear!: (gearId: string) => Gear.Gear;
  getHero!: (heroId: string) => Hero;
  getProfile!: (heroId: string) => OptimizationProfile | undefined;

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
  result: EquipedHero[] = [];
  selectedCombination = {} as Gear.GearCombination;
  progress = 0;
  popupMsg = 0;
  //
  headers = [
    { text: 'Set', value: 'combination.sets', sortable: false },
    { text: 'HP', value: 'hp' },
    { text: 'DEF', value: 'def' },
    { text: 'ATK', value: 'atk' },
    { text: 'CRI', value: 'cri' },
    { text: 'C.DMG', value: 'cdmg' },
    { text: 'SPD', value: 'spd' },
    { text: 'EFF', value: 'eff' },
    { text: 'RES', value: 'res' },
    { text: 'Damage', value: 'damage' },
    { text: 'EHP', value: 'ehp' }
  ];

  get gearStore() {
    return new Gear.GearStore(
      GearFilterService.filter(this.gears, this.profile.filter, {
        heroId: this.profile.heroId
      })
    );
  }

  get equippedHero(): EquipedHero | undefined {
    if (this.profile.heroId && this.selectedCombination) {
      return GearCombinationService.apply(this.selectedCombination, this.getHero(this.profile.heroId));
    }
    return undefined;
  }

  get hardLimit() {
    return DefaultGearOptimizer.COMBINATION_HARD_LIMIT;
  }

  async optimize() {
    console.log('optimize::start');
    this.result.splice(0, this.result.length);
    this.worker.postMessage({
      action: 'optimize',
      store: this.gearStore,
      profile: this.profile,
      hero: this.getHero(this.profile.heroId)
    });
  }

  reset() {
    if (!this.profile.heroId) {
      this.profile.heroId = this.heros[34].id;
    }
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
      forcedSets: [] // [Gear.Set.Speed, Gear.Set.Critical]
    };
    this.selectedCombination = this.getEquipped(this.profile.heroId);
  }

  clickRow(item: EquipedHero, e: any) {
    console.log('clickRow::item =', item);
    console.log('clickRow::e =', e);
    e.select();
    console.log('clickRow::armor =', item.combination.sets);
    this.selectedCombination = this.test(item.combination);
  }

  test(foo: Gear.GearCombination) {
    const builder = new Gear.GearCombinationBuilder();
    builder.weapon(this.getGear(foo.weapon.id));
    builder.helmet(this.getGear(foo.helmet.id));
    builder.armor(this.getGear(foo.armor.id));
    builder.necklace(this.getGear(foo.necklace.id));
    builder.ring(this.getGear(foo.ring.id));
    builder.boot(this.getGear(foo.boot.id));
    return builder.build(-1);
  }

  equipAll() {
    console.log('equipAll::heroId =', this.profile.heroId);
    if (this.selectedCombination) {
      this.unequipAll();
      console.log('equipAll::selectedCombination =', this.selectedCombination);
      const c = this.selectedCombination;
      [c.weapon, c.helmet, c.armor, c.necklace, c.ring, c.boot]
        .filter(x => x.id)
        .forEach(x => {
          x.equippedHero = this.profile.heroId;
          this.saveGears([x]);
        });
    }
  }

  unequipAll() {
    if (this.selectedCombination) {
      console.log('unequipAll::', this.selectedCombination);
      [
        this.selectedCombination.weapon,
        this.selectedCombination.helmet,
        this.selectedCombination.armor,
        this.selectedCombination.necklace,
        this.selectedCombination.ring,
        this.selectedCombination.boot
      ].forEach(x => {
        x.equippedHero = '';
        this.saveGears([x]);
      });
    }
  }

  // changeHero() {
  //   console.log('changeHero::start');
  //   if (this.equippedHero) {
  //     console.log('changeHero::profile.hero.id =', this.profile.hero.id);
  //     // console.log(this.getEquipped(this.profile.hero.id));
  //     this.selectedCombination = this.equippedHero.combination;
  //   }
  // }

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
    }
  }

  created() {
    this.reset();
    this.worker.onmessage = e => {
      console.log('worker::onmessage::action =', e.data.action);
      if (e.data.action == 'optimize-result') {
        this.result = e.data.result;
      } else if (e.data.action == 'progress') {
        this.progress = e.data.result;
      }
    };
  }

  destroyed() {
    this.worker.terminate();
  }
}
</script>
