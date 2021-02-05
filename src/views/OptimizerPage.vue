<template>
  <div>
    <v-alert dense dismissible outlined type="warning">
      This is still an experimental feature
    </v-alert>
    <v-card>
      <v-card-text>
        <v-row>
          <v-col cols="12" md="3">
            <v-autocomplete
              v-model="hero"
              class="mb-4"
              dense
              hide-details
              item-text="name"
              item-value="id"
              :items="e7db.heros"
              label="Hero"
              outlined
              return-object
            >
              <template v-slot:item="data">
                <v-avatar class="mr-2" left size="32">
                  <v-img :src="data.item.icon"></v-img>
                </v-avatar>
                {{ data.item.name }}
              </template>
            </v-autocomplete>
            <v-avatar class="mr-2" left size="48">
              <v-img :src="hero.icon"></v-img>
            </v-avatar>
            {{ hero }}
          </v-col>
          <v-col cols="12" md="auto">
            <gear-optimizer-filter v-model="filter" />
          </v-col>
          <v-col>
            <gear-optimizer-criteria v-model="criteria" />
          </v-col>
        </v-row>
      </v-card-text>
      <v-divider />
      <v-card-actions>
        <v-btn class="font-weight-bold" color="primary" text @click="optimize">Optimize</v-btn>
        <v-btn text @click="reset">Reset</v-btn>
      </v-card-actions>
    </v-card>
    <v-row dense>
      <v-col cols="8"> </v-col>
    </v-row>
    <v-row v-if="selectedCombination.id">
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
        <v-progress-linear v-if="progressPercent > 0" height="25" :value="progressPercent">
          <strong>{{ progressPercent }}%</strong>
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
            {{ Math.round(((gearStore.numOfCombinations / 10000000) * 7.1) / 60) | formatNumber }}
            minutes
            <!-- <v-icon>help_outlined</v-icon> -->
            <!-- <i>
                    Remark:<br />
                    - only first {{ hardLimit | formatNumber }} combinations will be evaluated now (Performance
                    issue)<br />
                    - 10,000,000 combinations take around 7.1 seconds in the testing machine
                  </i> -->
            {{ criteria }}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { GearDetail, GearOptimizerFilter, GearOptimizerCriteria } from '@/components';
import { Constants, Gear, E7db } from '@/models';
import { E7dbData } from '@/models/persistence';
import { GearOptimizer } from '@/services/gear-optimizer';
import GearService from '@/services/gear-service';
import { Vue, Component } from 'vue-property-decorator';
import { mapState } from 'vuex';

@Component({
  name: 'optimizer-page',
  components: { GearDetail, GearOptimizerFilter, GearOptimizerCriteria },
  computed: { ...mapState(['gears', 'e7db']) }
})
export default class OptimizerPage extends Vue {
  // vuex
  readonly gears!: Gear.Gear[];
  readonly e7db!: E7dbData;
  worker = new Worker('../workers/gear-optimizer-worker.ts', { type: 'module' });
  // models
  hero: E7db.Hero = {} as E7db.Hero;
  filter: Gear.GearFilter = Object.assign({}, Constants.GEAR_FILTER_DEFAULT);
  criteria: Gear.GearOptimizerCriteria = {
    hp: {},
    def: {},
    atk: {},
    cri: { max: 110 },
    cdmg: { max: 360 },
    spd: {},
    eff: {},
    res: {}
  };
  combinations: Gear.GearCombination[] = [];
  selectedCombination = { id: '' } as Gear.GearCombination;
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

  get progressPercent() {
    return Math.ceil(
      (this.progress / Math.min(GearOptimizer.COMBINATION_HARD_LIMIT, this.gearStore.numOfCombinations ?? 1)) * 100
    );
  }

  async optimize() {
    // this.combinations.splice(0, this.combinations.length);
    console.log('optimize::start');
    this.combinations.splice(0, this.combinations.length);
    this.worker.postMessage({
      action: 'optimize',
      store: this.gearStore,
      criteria: this.criteria
    });
    // GearOptimizer.optimize(this.gearStore, this.criteria);

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

  clickRow(item: Gear.GearCombination, e: any) {
    console.log('clickRow::item =', item);
    console.log('clickRow::e =', e);
    e.select();
    this.selectedCombination = item;
  }

  created() {
    this.hero = this.e7db.heros[4];
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
