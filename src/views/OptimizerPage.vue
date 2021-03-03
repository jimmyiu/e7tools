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
      <!-- <v-icon>help_outlined</v-icon> -->
      <!-- <i>
          Remark:<br />
          - only first {{ hardLimit | formatNumber }} combinations will be evaluated now (Performance
          issue)<br />
          - 10,000,000 combinations take around 7.1 seconds in the testing machine
        </i> -->
    </v-sheet>

    <optimization-profiler v-model="form" class="mb-2" @optimize="optimize" />

    <v-progress-linear v-if="progress.processTime >= 0" class="mb-2" height="50" :indeterminate="optimizing" striped>
      <strong class="text-center">
        Processed ({{ progress.proceeded | formatNumber }}) / Evaluated ({{ progress.evaluated | formatNumber }})<br />
        Found ({{ progress.found | formatNumber }}) in {{ progress.processTime }} seconds
      </strong>
    </v-progress-linear>

    <v-card>
      <v-card-text class="pa-2">
        <v-row dense>
          <v-col cols="12" sm="auto">
            <hero-detail-card
              v-if="lastEquipped && form.hero"
              class="mb-2"
              :hero="form.hero"
              :suit="lastEquipped.suit"
            />
            <hero-detail-card
              v-if="currentEquipped && form.hero"
              class="mb-2"
              :hero="form.hero"
              :suit="currentEquipped.suit"
            />
            <hero-detail-card v-if="selectionEquipped" :hero="form.hero" :suit="selectionEquipped.suit" />
          </v-col>
          <v-col>
            <v-row dense>
              <v-col v-for="(item, key) in selectedSuitGears" :key="key" cols="12" sm="6">
                <gear-card :gear="item" :ref-hero-id="form.profile.hero.id" />
              </v-col>
              <!-- <v-col v-for="(item, key) in selectedSuitGears" :key="key">
            <gear-detail-card :gear="item" :ref-hero-id="form.profile.hero.id" />
          </v-col> -->
            </v-row>
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
import { GearCard, GearDetailCard, GearSetIcon, HeroDetailCard, OptimizationProfiler } from '@/components';
import { Gear, EquippedHero, Hero, Suit } from '@/models';
import { Vue, Component } from 'vue-property-decorator';
import { mapActions, mapGetters } from 'vuex';
import { SuitBuilder, HeroService, gearFilterService, ConstantService } from '@/services';
import { OptimizationForm, OptimizationResult } from '@/models/optimizer';
import { GearOptimizerProgress } from '@/services/gear-optimizer';

@Component({
  name: 'optimizer-page',
  components: { GearCard, GearDetailCard, GearSetIcon, HeroDetailCard, OptimizationProfiler, TitleSheet },
  computed: {
    ...mapGetters(['heros', 'gears', 'getEquippedHero', 'getHero', 'getGear', 'getLastEquippedSuit'])
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
  getLastEquippedSuit!: (heroId: string) => Suit | undefined;
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

  get lastEquipped() {
    const lastEquipped = this.getLastEquippedSuit(this.form.hero.id);
    if (lastEquipped) {
      return HeroService.equip(this.form.hero, lastEquipped);
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
    this.result.splice(0, this.result.length);
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
