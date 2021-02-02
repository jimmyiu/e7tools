<template>
  <div>
    <v-alert dense outlined type="warning">
      This is still an experimental feature
    </v-alert>
    <v-row dense>
      <v-col cols="12">
        <v-card>
          <v-card-text class="pb-0">
            <gear-optimizer-filter v-model="filter" />
          </v-card-text>
          <v-divider />
          <v-card-text class="pb-2">
            <gear-optimizer-criteria v-model="criteria" />
          </v-card-text>
          <v-divider />
          <v-card-text>
            <strong>Debug Panel</strong><br />
            Filter: {{ filter }}, Criteria: {{ criteria }}<br />
            Distribution: {{ gearStore.distribution }}<br />
            Combinations: {{ gearStore.numOfCombinations | formatNumber }}
            <i>(Performance issue: only first {{ hardLimit | formatNumber }} combination will be evaluated now)</i
            ><br />
            Estimated Time:
            {{ Math.round(((gearStore.numOfCombinations / 10000000) * 17.5) / 60) | formatNumber }} minutes
            <i>(10,000,000 combinations take around 17.5 seconds in the testing machine)</i>
          </v-card-text>
          <v-divider />
          <v-card-actions>
            <v-btn class="font-weight-bold" color="primary" text @click="optimize">Optimize</v-btn>
            <v-btn text @click="reset">Reset</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <!-- <v-row>
      <v-col cols="6" lg="2" md="4">aaa</v-col>
      <v-col cols="6" lg="2" md="4">aaa</v-col>
      <v-col cols="6" lg="2" md="4">aaa</v-col>
      <v-col cols="6" lg="2" md="4">aaa</v-col>
      <v-col cols="6" lg="2" md="4">aaa</v-col>
      <v-col cols="6" lg="2" md="4">aaa</v-col>
    </v-row> -->
    <v-row>
      <v-col cols="12">
        <v-progress-linear v-if="progress > 0" v-model="progress" height="25">
          <strong>{{ progress }}%</strong>
        </v-progress-linear>
        <v-data-table
          dense
          :footer-props="{ showFirstLastPage: true }"
          :headers="headers"
          :items="combinations"
          :items-per-page="15"
          :multi-sort="false"
          @click:row="clickRow"
        ></v-data-table>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { GearDetail, GearOptimizerFilter, GearOptimizerCriteria } from '@/components';
import { Constants, Gear } from '@/models';
import { GearOptimizer } from '@/services/gear-optimizer';
import GearService from '@/services/gear-service';
import { Vue, Component } from 'vue-property-decorator';
import { mapState } from 'vuex';

@Component({
  name: 'optimizer-page',
  components: { GearDetail, GearOptimizerFilter, GearOptimizerCriteria },
  computed: { ...mapState(['gears']) }
})
export default class OptimizerPage extends Vue {
  // vuex
  readonly gears!: Gear.Gear[];
  // models
  filter: Gear.GearFilter = Object.assign({}, Constants.GEAR_FILTER_DEFAULT);
  // filter: Gear.GearFilter = {
  //   sets: [],
  //   enhanceMode: Gear.EnhanceModeFilter.ALL
  // };
  criteria: Gear.GearOptimizerCriteria = { spd: { min: 110 }, cri: { min: 40, max: 110 }, cdmg: { min: 0, max: 210 } };
  combinations: Gear.GearCombination[] = [];
  // optimizer: GearOptimizer = new GearOptimizer([], this.filter);
  progress = 0;
  //
  headers = [
    { text: 'HP %', value: 'ability.hpp' },
    { text: 'HP', value: 'ability.hp' },
    { text: 'DEF %', value: 'ability.defp' },
    { text: 'DEF', value: 'ability.def' },
    { text: 'ATK %', value: 'ability.atkp' },
    { text: 'ATK', value: 'ability.atk' },
    { text: 'CRI', value: 'ability.cri' },
    { text: 'C.DMG', value: 'ability.cdmg' },
    { text: 'SPD', value: 'ability.spd' },
    { text: 'EFF', value: 'ability.eff' },
    { text: 'RES', value: 'ability.res' }
  ];

  get gearStore() {
    return new Gear.GearStore(GearService.applyFilter(this.gears, this.filter));
  }

  get hardLimit() {
    return GearOptimizer.COMBINATION_HARD_LIMIT;
  }

  optimize() {
    // this.combinations.splice(0, this.combinations.length);
    console.log('optimize::start');
    this.combinations.splice(0, this.combinations.length);
    const time = Date.now();
    this.combinations = GearOptimizer.optimize(this.gearStore, this.criteria, this.updateProgress);
    console.log(Date.now() - time);
    // this.optimizer.optimize(this.updateProgress);
    // const weapons =
    //   this.gearsByType.get(Gear.Type.Weapon)!.length > 0 ? this.gearsByType.get(Gear.Type.Weapon)! : [undefined];
    // const helmets =
    //   this.gearsByType.get(Gear.Type.Helmet)!.length > 0 ? this.gearsByType.get(Gear.Type.Helmet)! : [undefined];
    // const armors =
    //   this.gearsByType.get(Gear.Type.Armor)!.length > 0 ? this.gearsByType.get(Gear.Type.Armor)! : [undefined];
    // weapons.forEach((weapon: Gear.Gear | undefined) => {
    //   helmets.forEach((helmet?: Gear.Gear) => {
    //     armors.forEach((armor?: Gear.Gear) => {
    //       this.combinations.push(new Gear.GearCombination([weapon, helmet, armor]));
    //     });
    //   });
    // });
  }

  reset() {
    this.filter = Object.assign({}, Constants.GEAR_FILTER_DEFAULT);
  }

  updateProgress(progress: number) {
    // this.progress = progress;
    // console.log('a');
    // this.$forceUpdate();
  }
  // created() {
  //   console.log('created');
  // }
  clickRow(a: any) {
    console.log('clickRow::a =', a);
  }
}
</script>
