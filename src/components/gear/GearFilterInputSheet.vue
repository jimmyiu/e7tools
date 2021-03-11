<template>
  <title-sheet
    class="pa-2"
    :class="{ 'card-size': $vuetify.breakpoint.smAndUp }"
    :collapsible="false"
    title="Basic Filter"
    @reset="reset"
  >
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
            <v-btn-toggle v-model="form.levelMode" class="gear-filter dense" dense>
              <v-btn class="with-figure" depressed :value="1">
                <div class="d-flex flex-column justify-center align-center">
                  85
                  <div class="caption figure">({{ otherFigures.lv85 }})</div>
                </div>
              </v-btn>
              <v-btn class="with-figure" depressed :value="2">
                <div class="d-flex flex-column justify-center align-center">
                  90
                  <div class="caption figure">({{ otherFigures.lv90 }})</div>
                </div>
              </v-btn>
              <v-btn class="with-figure" depressed :value="3">
                <div class="d-flex flex-column justify-center align-center">
                  <v-icon small>mdi-dots-horizontal</v-icon>
                  <div class="caption figure">({{ otherFigures.lvOthers }})</div>
                </div>
              </v-btn>
            </v-btn-toggle>
          </v-col>
          <v-col cols="auto">
            <div class="ml-1 caption">Enhance</div>
            <v-btn-toggle v-model="form.enhanceMode" class="gear-filter dense" dense>
              <v-btn class="with-figure" depressed :value="2">
                <div class="d-flex flex-column justify-center align-center">
                  15
                  <div class="caption figure">({{ otherFigures.enhance15 }})</div>
                </div>
              </v-btn>
              <v-btn class="with-figure" depressed :value="1">
                <div class="d-flex flex-column justify-center align-center">
                  <v-icon small>mdi-dots-horizontal</v-icon>
                  <div class="caption figure">({{ otherFigures.enhanceOthers }})</div>
                </div>
              </v-btn>
            </v-btn-toggle>
          </v-col>
          <v-col cols="auto">
            <div class="ml-1 caption">Equipped</div>
            <v-btn-toggle v-model="form.equippedMode" class="gear-filter dense" dense>
              <v-btn class="with-figure" depressed :value="2">
                <div class="d-flex flex-column justify-center align-center">
                  <v-icon small>mdi-close-thick</v-icon>
                  <div class="caption figure">({{ otherFigures.unequipped }})</div>
                </div>
              </v-btn>
              <v-btn class="with-figure" depressed :value="1">
                <div class="d-flex flex-column justify-center align-center">
                  <v-icon small>mdi-check-bold</v-icon>
                  <div class="caption figure">({{ otherFigures.equipped }})</div>
                </div>
              </v-btn>
            </v-btn-toggle>
          </v-col>
          <v-col align-self="end" cols="auto"></v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row class="mt-1" no-gutters>
      <v-col align-self="center" class="pr-2" cols="auto">
        Stat Filter
      </v-col>
      <v-col align-self="center">
        <v-divider class="" />
      </v-col>
      <v-col cols="auto">
        <v-btn icon small @click="resetStat"><v-icon size="21">mdi-delete-outline</v-icon></v-btn>
      </v-col>
    </v-row>
    <v-row class="mt-0" dense>
      <v-col v-for="(item, key) in $const.GearStat.PRIMITIVE" :key="key" cols="3">
        <gear-stat-input v-model.number="form.minStat[item.value]" :stat="item" />
      </v-col>
      <v-col class="d-flex align-center" cols="3">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <span v-bind="attrs" v-on="on">
              <v-checkbox v-model="form.applyToMain" class="mt-0 pt-0 pl-1 caption" dense hide-details label="Main" />
            </span>
          </template>
          <span>Apply stat filter to main stat</span>
        </v-tooltip>
      </v-col>
      <v-col v-for="(item, key) in $const.GearStat.SCORES" :key="`s${key}`" cols="3">
        <gear-stat-input v-model.number="form.minStat[item.value]" :stat="item" />
      </v-col>
    </v-row>
    <!-- <v-row dense>
      <v-col cols="10">
        <v-select
          v-model="form.sortingColumn"
          dense
          hide-details
          :items="sortingColumns"
          outlined
          prepend-inner-icon="sort"
        />
      </v-col>
      <v-col align-self="center" cols="2">
        <v-btn icon @click="toggleSort()">
          <v-icon>mdi-order-numeric-{{ isDescending ? 'descending' : 'ascending' }} </v-icon>
        </v-btn>
      </v-col>
    </v-row> -->
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
.figure
  margin-top: -2px
  color: #EEEEEE
</style>
<script lang="ts">
import { Vue, Component, Prop, Emit, Model } from 'vue-property-decorator';
import { FilterMode, Gear } from '@/models';
import { GearSetIcon, GearSetSelect, GearTypeIcon, GearTypeSelect, GearStatIcon, GearStatInput } from './common';
import TitleSheet from '../common/TitleSheet.vue';
import {
  assignGearStatFilter,
  emptyGearPageFilter,
  GearPageFilter,
  GearStatFilter,
  SortingColumn
} from '@/models/gear-page';
import { SortingOrder } from '@/models/common';

@Component({
  name: 'gear-filter-input-sheet',
  components: {
    TitleSheet,
    GearStatIcon,
    GearStatInput,
    GearSetIcon,
    GearSetSelect,
    GearTypeIcon,
    GearTypeSelect
  }
})
export default class GearFilterInputSheet extends Vue {
  @Model() readonly form!: GearPageFilter;
  @Prop() readonly gears!: Gear.Gear[];
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

  get otherFigures() {
    const equipped = this.gears.filter(x => x.equippedHero != '').length;
    const lv85 = this.gears.filter(x => x.level == 85).length;
    const lv90 = this.gears.filter(x => x.level == 90).length;
    const enhance15 = this.gears.filter(x => x.enhance == 15).length;
    return {
      equipped: equipped,
      unequipped: this.gears.length - equipped,
      lv85: lv85,
      lv90: lv90,
      lvOthers: this.gears.length - lv85 - lv90,
      enhance15: enhance15,
      enhanceOthers: this.gears.length - enhance15
    };
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
    // this.form.applyToMain = false;
    // Object.keys(this.form.minStat).forEach(key => Vue.set(this.form.minStat, key, undefined));
    // this.form.sortingColumn = 'level';
    // this.form.sortingOrder = SortingOrder.DESCENDING;
  }

  resetStat() {
    // assignGearStatFilter(this.form.minStat, emptyGearPageFilter().minStat);
    this.form.applyToMain = false;
    Object.keys(this.form.minStat).forEach(key => Vue.set(this.form.minStat, key, undefined));
    // this.form.sortingColumn = 'level';
    // this.form.sortingOrder = SortingOrder.DESCENDING;
  }
}
</script>
