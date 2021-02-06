<template>
  <div>
    <v-alert dense dismissible outlined type="warning">
      This is still an experimental feature
    </v-alert>
    <v-card>
      <v-card-text>
        <optimization-profiler v-model="profile" />
      </v-card-text>
      <v-divider />
      <!-- <v-card-text> Profile: {{ profile }} </v-card-text>
      <v-divider /> -->
      <v-card-actions>
        <v-btn class="font-weight-bold" color="primary" text @click="optimize">Optimize</v-btn>
        <v-btn text @click="reset">Reset</v-btn>
      </v-card-actions>
    </v-card>
    <v-card>
      <v-row>
        <v-col cols="12">
          <v-progress-linear v-if="progress > 0" height="25" :value="progress">
            <strong>{{ progress }}%</strong>
          </v-progress-linear>
          <v-data-table
            dense
            :footer-props="{ showFirstLastPage: true }"
            :headers="headers"
            :items="combinations"
            :items-per-page="15"
            :multi-sort="false"
            single-select
            @click:row="clickRow"
          ></v-data-table>
        </v-col>
      </v-row>
    </v-card>
    <v-row v-if="selectedCombination.weapon">
      <v-col cols="6" lg="2" sm="4">
        <gear-detail :gear="selectedCombination.weapon" />
      </v-col>
      <v-col cols="6" lg="2" sm="4">
        <gear-detail :gear="selectedCombination.helmet" />
      </v-col>
      <v-col cols="6" lg="2" sm="4">
        <gear-detail :gear="selectedCombination.armor" />
      </v-col>
      <v-col cols="6" lg="2" sm="4">
        <gear-detail :gear="selectedCombination.necklace" />
      </v-col>
      <v-col cols="6" lg="2" sm="4">
        <gear-detail :gear="selectedCombination.ring" />
      </v-col>
      <v-col cols="6" lg="2" sm="4">
        <gear-detail :gear="selectedCombination.boot" />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
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
            {{ Math.round(((gearStore.numOfCombinations / 10000000) * 8.7) / 60) | formatNumber }}
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
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { GearDetail, OptimizationProfiler } from '@/components';
import { Constants, Gear, Gear2, OptimizationProfile, OptimizationResult } from '@/models';
import { E7dbData } from '@/models/persistence';
import { DefaultGearOptimizer } from '@/services/gear-optimizer';
import GearFilterService from '@/services/gear-filter-service';
import { Vue, Component } from 'vue-property-decorator';
import { mapState } from 'vuex';

@Component({
  name: 'optimizer-page',
  components: { GearDetail, OptimizationProfiler },
  computed: { ...mapState(['gears', 'e7db']) }
})
export default class OptimizerPage extends Vue {
  // vuex
  readonly gears!: Gear.Gear[];
  readonly e7db!: E7dbData;
  worker = new Worker('../workers/gear-optimizer-worker.ts', { type: 'module' });
  // models
  profile: OptimizationProfile = {
    id: '',
    hero: {},
    filter: {},
    criteria: {}
  } as OptimizationProfile;

  combinations: OptimizationResult[] = [];
  selectedCombination = {} as Gear2.GearCombination;
  progress = 0;
  //
  headers = [
    { text: 'Set', value: 'combination.sets' },
    { text: 'HP', value: 'ability.hp' },
    // { text: 'DEF %', value: 'ability.defp' },
    { text: 'DEF', value: 'ability.def' },
    // { text: 'ATK %', value: 'ability.atkp' },
    { text: 'ATK', value: 'ability.atk' },
    { text: 'CRI', value: 'ability.cri' },
    { text: 'C.DMG', value: 'ability.cdmg' },
    { text: 'SPD', value: 'ability.spd' },
    { text: 'EFF', value: 'ability.eff' },
    { text: 'RES', value: 'ability.res' }
  ];

  get gearStore() {
    return new Gear.GearStore(GearFilterService.filter(this.gears, this.profile.filter));
  }

  get hardLimit() {
    return DefaultGearOptimizer.COMBINATION_HARD_LIMIT;
  }

  async optimize() {
    console.log('optimize::start');
    this.combinations.splice(0, this.combinations.length);
    this.worker.postMessage({
      action: 'optimize',
      store: this.gearStore,
      profile: this.profile
    });
  }

  reset() {
    // this.filter = Object.assign({}, Constants.GEAR_FILTER_DEFAULT);
    this.profile.hero = this.e7db.heros[4];
    this.profile.filter = Object.assign({}, Constants.GEAR_FILTER_DEFAULT);
    this.profile.criteria = {
      hp: {},
      def: {},
      atk: {},
      cri: { max: 110 },
      cdmg: { max: 360 },
      spd: { min: 250 },
      eff: {},
      res: {}
    };
  }

  clickRow(item: OptimizationResult, e: any) {
    console.log('clickRow::item =', item);
    console.log('clickRow::e =', e);
    // e.select();
    this.selectedCombination = item.combination;
  }

  created() {
    // this.hero = this.e7db.heros[4];
    this.reset();
    this.worker.onmessage = e => {
      console.log('worker::onmessage::action =', e.data.action);
      if (e.data.action == 'optimize-result') {
        this.combinations = e.data.result;
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
