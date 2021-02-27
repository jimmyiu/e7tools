<template>
  <title-sheet :class="{ 'card-size': $vuetify.breakpoint.smAndUp }" title="Filtering &amp; Sorting" @reset="reset">
    <v-row class="mt-1" dense>
      <v-col class="text-center" cols="12">
        <gear-type-select v-model="form.type" :figures="typeFigures" />
      </v-col>
      <v-col class="text-center" cols="12">
        <gear-set-select v-model="form.sets" :figures="setFigures" multiple />
      </v-col>
      <v-col cols="12">
        <v-row class="justify-center" dense>
          <v-col cols="auto">
            <div class="ml-1 caption">Level</div>
            <v-btn-toggle v-model="form.levelMode" dense>
              <v-btn depressed min-width="38" :value="1">85</v-btn>
              <v-btn depressed min-width="38" :value="2">90</v-btn>
              <v-btn depressed min-width="38" :value="3"><v-icon small>mdi-dots-horizontal</v-icon></v-btn>
            </v-btn-toggle>
          </v-col>
          <v-col cols="auto">
            <div class="ml-1 caption">Enhance</div>
            <v-btn-toggle v-model="form.enhanceMode" dense>
              <v-btn depressed min-width="38" :value="2">15</v-btn>
              <v-btn depressed min-width="38" :value="1"><v-icon small>mdi-dots-horizontal</v-icon></v-btn>
            </v-btn-toggle>
          </v-col>
          <v-col cols="auto">
            <div class="ml-1 caption">Equipped</div>
            <v-btn-toggle v-model="form.equippedMode" dense>
              <v-btn depressed min-width="38" :value="2"><v-icon small>mdi-close-thick</v-icon></v-btn>
              <v-btn depressed min-width="38" :value="1"><v-icon small>mdi-check-bold</v-icon></v-btn>
            </v-btn-toggle>
          </v-col>
          <v-col align-self="end" cols="auto">
            <!-- <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-checkbox
                v-model="form.main"
                v-bind="attrs"
                class="mt-0"
                dense
                hide-details
                label="Main"
                v-on="on"
              ></v-checkbox>
            </template>
            <span>Display main stat value in the table</span>
          </v-tooltip> -->
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-divider class="my-2" />
    <v-row no-gutters style="margin-left: -6px">
      <template v-for="(stat, key) in stats">
        <v-col :key="`${key}-1`" class="d-flex align-center mb-1" cols="4">
          <v-btn icon small @click="toggleSort(stat.value)"><gear-stat-icon :stat="stat"/></v-btn>
          <!-- </v-col>
        <v-col :key="`${key}-2`" class="d-flex align-center" cols="3"> -->
          <v-text-field
            v-model.number="form.minStat[stat.value]"
            dense
            hide-details
            label="Min"
            min="0"
            outlined
            type="number"
          >
            <template v-if="stat.percent" v-slot:append><div class="pt-1">%</div></template>
          </v-text-field>
        </v-col>
      </template>
      <v-col class="d-flex align-center mb-1" cols="4">
        <v-btn icon small><v-icon size="18">mdi-alpha-s-box</v-icon></v-btn>
        <v-text-field v-model.number="form.minStat.score" dense hide-details label="Min" min="0" outlined type="number">
        </v-text-field>
      </v-col>
      <v-col class="d-flex align-center" cols="4">
        <v-btn icon small @click="toggleSort('offScore')"><v-icon size="18">mdi-alpha-a-box</v-icon></v-btn>
        <v-text-field
          v-model.number="form.minStat.offScore"
          dense
          hide-details
          label="Min"
          min="0"
          outlined
          type="number"
        >
        </v-text-field>
      </v-col>
      <v-col class="d-flex align-center" cols="4">
        <v-btn icon small><v-icon size="18">mdi-alpha-d-box</v-icon></v-btn>
        <v-text-field
          v-model.number="form.minStat.defScore"
          dense
          hide-details
          label="Min"
          min="0"
          outlined
          type="number"
        >
        </v-text-field>
      </v-col>
      <v-col align-self="center" cols="4" style="margin-left: -2px">
        <v-checkbox v-model="form.applyToMain" class="mt-0 pt-0 pl-1 caption" dense hide-details label="Filter Main" />
      </v-col>
    </v-row>
    <v-row dense>
      <v-col cols="10">
        <v-select
          v-model="form.sortingColumn"
          clearable
          dense
          hide-details
          :items="sortingColumns"
          outlined
          prepend-inner-icon="sort"
        />
      </v-col>
      <v-col align-self="center" cols="2">
        <v-btn icon>
          <v-icon>mdi-order-numeric-{{ isDescending ? 'descending' : 'ascending' }} </v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <!-- <v-row>
      <v-col color="section">
        {{ form }}
      </v-col>
    </v-row> -->
  </title-sheet>
</template>
<style lang="sass" scoped>
.card-size
  max-width: 328px
  min-width: 328px
</style>
<script lang="ts">
import { Vue, Component, Prop, Emit, Model } from 'vue-property-decorator';
import { Constants, FilterMode, Gear } from '@/models';
import { GearSetIcon, GearSetSelect, GearTypeIcon, GearTypeSelect, GearStatIcon } from './common';
import TitleSheet from '../common/TitleSheet.vue';
import { GearPageFilter, GearStatFilter, SortingColumn } from '@/models/gear-page';
import { SortingOrder } from '@/models/common';

@Component({
  name: 'gear-filter-input-sheet',
  components: {
    TitleSheet,
    GearStatIcon,
    GearSetIcon,
    GearSetSelect,
    GearTypeIcon,
    GearTypeSelect
  }
})
export default class GearFilterInputSheet extends Vue {
  // types = Object.values(Gear.Type);
  @Model() readonly form!: GearPageFilter;
  @Prop() readonly gears!: Gear.Gear[];
  readonly stats = Object.values(Gear.Stat);
  readonly sortingColumns: SortingColumn[] = [
    'level',
    'hpp',
    'hp',
    'defp',
    'def',
    'atkp',
    'atk',
    'cri',
    'cdmg',
    'spd',
    'eff',
    'res',
    'score',
    'offScore',
    'defScore'
  ];

  get typeFigures(): Gear.TypeFigures {
    const result = {
      Weapon: 0,
      Helmet: 0,
      Armor: 0,
      Necklace: 0,
      Ring: 0,
      Boot: 0
    };
    this.gears.forEach(x => result[x.type]++);
    return result;
  }

  get setFigures(): Gear.SetFigures {
    const result: Gear.SetFigures = {
      Speed: 0,
      Critical: 0,
      Hit: 0,
      Destruction: 0,
      LifeSteal: 0,
      Counter: 0,
      Resist: 0,
      Health: 0,
      Defense: 0,
      Attack: 0,
      Immunity: 0,
      Unity: 0,
      Rage: 0,
      Revenge: 0,
      Injury: 0,
      Penetration: 0
    };
    this.gears.forEach(x => result[x.set]++);
    return result;
  }

  get isDescending() {
    return this.form.sortingOrder == SortingOrder.DESCENDING;
  }

  reset() {
    this.form.type = undefined;
    this.form.sets.splice(0);
    this.form.levelMode = Gear.LevelFilterMode.ALL;
    this.form.enhanceMode = Gear.EnhanceModeFilter.ALL;
    this.form.equippedMode = FilterMode.ALL;
    this.form.applyToMain = false;
    Object.keys(this.form.minStat).forEach(key => Vue.set(this.form.minStat, key, undefined));
    this.form.sortingColumn = 'level';
    this.form.sortingOrder = SortingOrder.DESCENDING;
  }

  toggleSort(column: SortingColumn) {
    if (this.form.sortingColumn == column) {
      this.form.sortingOrder =
        this.form.sortingOrder == SortingOrder.ASCENDING ? SortingOrder.DESCENDING : SortingOrder.ASCENDING;
    } else {
      this.form.sortingColumn = column;
      this.form.sortingOrder = SortingOrder.DESCENDING;
    }
  }

  sort() {}
}
</script>
