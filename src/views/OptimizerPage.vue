<template>
  <div>
    <v-sheet class="section body-2 py-1 pl-2 mb-2">
      <strong>Debug Panel</strong><br />
      <span v-for="(item, key) in gearStore.distribution" :key="key">{{ key }} ({{ item }}), </span>
      Number of combinations: <strong class="body-1">{{ gearStore.numOfCombinations | formatNumber }}</strong> /
      Estimated processing time:
      <strong class="body-1">{{
        Math.ceil(((gearStore.numOfCombinations / 10000000) * 8) / 60) | formatNumber
      }}</strong>
      minutes
    </v-sheet>

    <optimization-profiler v-model="form" class="mb-2" @optimize="optimize" />

    <v-progress-linear
      v-if="progress.processTime >= 0"
      class="mb-2"
      color="success"
      height="70"
      :indeterminate="optimizing"
      striped
    >
      <strong class="text-center">
        Processed ({{ progress.proceeded | formatNumber }})<br />
        Evaluated ({{ progress.evaluated | formatNumber }})<br />
        Found ({{ progress.found | formatNumber }}) in {{ progress.processTime }} seconds
      </strong>
    </v-progress-linear>

    <v-card>
      <v-card-text class="pa-2">
        <v-row dense>
          <v-col class="flex-grow-1" cols="12" lg="12" sm="auto">
            <!-- Saved -->
            <suit-gear-view class="mx-auto" :hero="savedEquipped.hero" :suit="savedEquipped.suit" />
          </v-col>
          <v-col class="flex-grow-1" cols="12" lg="12" sm="auto">
            <!-- Equipped -->
            <suit-gear-view
              v-if="currentEquipped"
              class="mx-auto"
              :hero="currentEquipped.hero"
              :suit="currentEquipped.suit"
            />
          </v-col>
          <v-col class="flex-grow-1" cols="12" lg="12" sm="auto">
            <!-- Selected -->
            <suit-gear-view class="mx-auto" :hero="selectionEquipped.hero" :suit="selectionEquipped.suit" />
          </v-col>
          <v-col cols="12" sm="4">
            <!-- <v-row dense>
              <v-col class="d-flex justify-center align-center px-6">
                <div class="mr-2">Current</div>
                <v-divider />
              </v-col>
            </v-row>
            <hero-detail-card
              v-if="currentEquipped && form.hero"
              class="mx-auto"
              :hero="form.hero"
              :suit="currentEquipped.suit"
            /> -->
          </v-col>
          <v-col cols="12" sm="4">
            <!-- <v-row dense>
              <v-col class="d-flex justify-center align-center px-6">
                <div class="mr-2" style="background-color:green">Selected</div>
                <v-divider />
              </v-col>
            </v-row>
            <hero-detail-card
              v-if="selectionEquipped"
              class="mx-auto"
              :hero="form.hero"
              :suit="selectionEquipped.suit"
            /> -->
          </v-col>
          <v-col cols="12" sm="4">
            <!-- <v-row dense>
              <v-col class="d-flex justify-center align-center px-6">
                <div class="mr-2">Saved Suit</div>
                <v-divider />
              </v-col>
            </v-row>
            <hero-detail-card
              v-if="savedEquipped && form.hero"
              class="mx-auto"
              :hero="form.hero"
              :suit="savedEquipped.suit"
            /> -->
          </v-col>
        </v-row>
      </v-card-text>
      <v-divider />
      <v-card-actions>
        <v-btn class="font-weight-bold" color="primary" text @click="equipAll">Equip Selected</v-btn>
        <v-btn text @click="unequipAll">Unequip Current</v-btn>
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
  </div>
</template>

<script lang="ts">
import TitleSheet from '@/components/common/TitleSheet.vue';
import { GearCard, GearSetIcon, HeroDetailCard, OptimizationProfiler, SuitGearView } from '@/components';
import { Gear, EquippedHero, Hero, Suit } from '@/models';
import { Vue, Component } from 'vue-property-decorator';
import { mapActions, mapGetters } from 'vuex';
import { SuitBuilder, HeroService, gearFilterService, ConstantService } from '@/services';
import { OptimizationForm, OptimizationResult } from '@/models/optimizer';
import { GearOptimizerProgress } from '@/services/gear-optimizer';

@Component({
  name: 'optimizer-page',
  components: { GearCard, GearSetIcon, HeroDetailCard, OptimizationProfiler, TitleSheet, SuitGearView },
  computed: {
    ...mapGetters(['heros', 'gears', 'getEquippedHero', 'getHero', 'getGear', 'getSavedSuit'])
  },
  methods: mapActions(['saveGears', 'updateState'])
})
export default class OptimizerPage extends Vue {
  // vuex
  readonly gears!: Gear.Gear[];
  readonly heros!: Hero[];
  getEquippedHero!: (heroId: string) => EquippedHero | undefined;
  getGear!: (gearId: string) => Gear.Gear;
  getHero!: (heroId: string) => Hero;
  getSavedSuit!: (heroId: string) => Suit | undefined;
  saveGears!: (gear: Gear.Gear[]) => void;

  // worker
  worker = new Worker('../workers/gear-optimizer-worker.ts', { type: 'module' });

  // models
  // profile: OptimizationProfile = ConstantService.emptyOptimizationProfile();
  form: OptimizationForm = {
    profile: ConstantService.emptyOptimizationProfile(),
    hero: ConstantService.emptyHero()
  };

  result: OptimizationResult[] = [];
  selectedSuit = ConstantService.emptySuit();
  //
  optimizing = false;
  progress: GearOptimizerProgress = {
    evaluated: 0,
    proceeded: 0,
    found: 0,
    processTime: -1
  };
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
    return gearFilterService.createGearStore(this.gears, this.form.profile.filter, {
      hero: this.form.hero,
      heros: this.heros
    });
  }

  // get hero(): Hero | undefined {
  //   return this.getHero(this.profile.hero.id);
  // }

  get currentEquipped(): EquippedHero | undefined {
    return this.getEquippedHero(this.form.hero.id);
  }

  get savedEquipped() {
    const savedEquipped = this.getSavedSuit(this.form.hero.id);
    if (savedEquipped) {
      return HeroService.equip(this.form.hero, savedEquipped);
    }
    return undefined;
  }

  get selectionEquipped(): EquippedHero | undefined {
    return HeroService.equip(this.form.hero, this.selectedSuit);
  }

  get selectedSuitGears() {
    return [
      this.selectedSuit.weapon,
      this.selectedSuit.helmet,
      this.selectedSuit.armor,
      this.selectedSuit.necklace,
      this.selectedSuit.ring,
      this.selectedSuit.boot
    ];
  }

  async optimize() {
    console.log('optimize::start');
    // this.result.splice(0, this.result.length);
    this.optimizing = true;
    this.worker.postMessage({
      action: 'optimize',
      store: this.gearStore,
      profile: this.form.profile,
      hero: this.form.hero
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
    builder.bonus(this.form.hero.bonusAbility);
    [foo.weaponId, foo.helmetId, foo.armorId, foo.necklaceId, foo.ringId, foo.bootId].forEach(x => {
      if (x != undefined) {
        builder.setGear(this.getGear(x));
      }
    });
    return builder.build();
  }

  equipAll() {
    console.log('equipAll::hero.id =', this.form.profile.hero.id);
    this.unequipAll();
    console.log('equipAll::selectedSuit =', this.selectedSuit);
    this.selectedSuitGears.forEach(x => {
      if (x != undefined) {
        x.equippedHero = this.form.profile.hero.id;
        this.saveGears([x]);
      }
    });
  }

  unequipAll() {
    console.log('unequipAll::', this.currentEquipped);
    if (this.currentEquipped) {
      [
        this.currentEquipped.suit.weapon,
        this.currentEquipped.suit.helmet,
        this.currentEquipped.suit.armor,
        this.currentEquipped.suit.necklace,
        this.currentEquipped.suit.ring,
        this.currentEquipped.suit.boot
      ].forEach(x => {
        if (x) {
          x.equippedHero = '';
          this.saveGears([x]);
        }
      });
    }
  }

  created() {
    this.setupWorker();
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
