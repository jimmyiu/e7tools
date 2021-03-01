<template>
  <div class="mx-auto" style="max-width: 1000px">
    <v-row dense>
      <v-col cols="12" sm="auto">
        <gear-filter-input-sheet v-model="filter" :gears="filteredGears" />
        <!-- <gear-list-view-display-config-sheet /> -->
      </v-col>
      <v-col cols="12" sm="auto">
        <gear-statistics-sheet :gears="filteredGears" />
      </v-col>
      <v-col>
        <gear-action-card v-model="selectedGearId" />
        <gear-list-view class="mt-2" :gears="filteredGears" :sort-col="filter.sortingColumn" @select="selectGear" />
        <!-- <gear-table :gears="filteredGears" @edit-gear="editGear" /> -->
        <v-btn bottom class="hidden-sm-and-up" fab fixed right small @click="goToTop">
          <v-icon>mdi-chevron-up</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-snackbar v-model="visible.completeMsg" bottom color="success" outlined timeout="1500">
      <div class="text-center">A gear is updated</div>
    </v-snackbar>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { mapActions, mapGetters } from 'vuex';
import {
  GearActionCard,
  GearTable,
  GearFilterInputSheet,
  GearCard,
  GearStatisticsSheet,
  GearDetailCard,
  GearListViewDisplayConfigSheet,
  GearListView
} from '@/components';
import { FilterMode, Gear } from '@/models';
import { GearPageFilter, GearStatFilter } from '@/models/gear-page';
import { SortingOrder } from '@/models/common';

@Component({
  name: 'gear-page',
  components: {
    GearActionCard,
    GearTable,
    GearFilterInputSheet,
    GearCard,
    GearDetailCard,
    GearStatisticsSheet,
    GearListView,
    GearListViewDisplayConfigSheet
  },
  computed: { ...mapGetters(['gears', 'getGear']) }
})
export default class GearPage extends Vue {
  getGear!: (gearId: string) => Gear.Gear;

  gears!: Gear.Gear[];
  selectedGearId: string = '';
  visible = {
    overlay: false,
    completeMsg: false
  };
  filter: GearPageFilter = {
    type: undefined,
    sets: [],
    levelMode: Gear.LevelFilterMode.ALL,
    enhanceMode: Gear.EnhanceModeFilter.ALL,
    equippedMode: FilterMode.ALL,
    applyToMain: false,
    minStat: {},
    sortingColumn: 'level',
    sortingOrder: SortingOrder.DESCENDING
  };

  get filteredGears() {
    let result = this.gears.filter(it => {
      let type = this.filter.type == undefined || this.filter.type == it.type!!;
      let set = this.filter.sets.length == 0 || this.filter.sets.indexOf(it.set!!) >= 0;
      // let level = !this.filter.level || this.filter.level == it.level!!;
      let level =
        !this.filter.levelMode ||
        (this.filter.levelMode == Gear.LevelFilterMode.LV85 && it.level == 85) ||
        (this.filter.levelMode == Gear.LevelFilterMode.LV90 && it.level == 90) ||
        (this.filter.levelMode == Gear.LevelFilterMode.OTHERS && it.level != 85 && it.level != 90);
      let enhance =
        !this.filter.enhanceMode ||
        (this.filter.enhanceMode == Gear.EnhanceModeFilter.LESS_THAN_15 && it.enhance!! < 15) ||
        (this.filter.enhanceMode == Gear.EnhanceModeFilter.ONLY_15 && it.enhance!! == 15);
      let equipped =
        !this.filter.equippedMode ||
        (this.filter.equippedMode == FilterMode.YES && it.equippedHero != '') ||
        (this.filter.equippedMode == FilterMode.NO && it.equippedHero == '');

      const minStatFilter = (stat: keyof GearStatFilter) => {
        if (it.main.value == stat && !this.filter.applyToMain && (this.filter.minStat[stat] ?? 0) > 0) {
          return false;
        }
        return (it[stat] ?? 0) >= (this.filter.minStat[stat] ?? 0);
      };
      let min =
        minStatFilter('hpp') &&
        minStatFilter('hp') &&
        minStatFilter('defp') &&
        minStatFilter('def') &&
        minStatFilter('atkp') &&
        minStatFilter('atk') &&
        minStatFilter('cri') &&
        minStatFilter('cdmg') &&
        minStatFilter('spd') &&
        minStatFilter('eff') &&
        minStatFilter('res') &&
        minStatFilter('score') &&
        minStatFilter('offScore') &&
        minStatFilter('defScore');
      return type && set && level && enhance && equipped && min;
    });
    // if (!this.filter.main) {
    //   result = result.map(x => {
    //     let foo = Gear.Gear.clone(x);
    //     Vue.set(foo, foo.main!!.value, undefined);
    //     return foo;
    //   });
    // }
    if (this.filter.sortingColumn) {
      const defaultSort = (a: Gear.Gear, b: Gear.Gear) => {
        let result = b.level - a.level;
        if (result == 0) {
          // TODO: sort grade
          return b.enhance - a.enhance;
        }
        return result;
      };
      result.sort((a, b) => {
        let aa = undefined;
        let bb = undefined;
        if (this.filter.applyToMain || a.main.value != this.filter.sortingColumn) {
          aa = (a as any)[this.filter.sortingColumn!];
        }
        if (this.filter.applyToMain || b.main.value != this.filter.sortingColumn) {
          bb = (b as any)[this.filter.sortingColumn!];
        }
        // console.log(`sort::aa = ${aa}, bb = ${bb}`);
        if (!aa && !bb) {
          return defaultSort(a, b);
        } else if (!aa) {
          return this.filter.sortingOrder == SortingOrder.DESCENDING ? 1 : -1;
        } else if (!bb) {
          return this.filter.sortingOrder == SortingOrder.DESCENDING ? -1 : 1;
        } else if (aa - bb == 0) {
          return defaultSort(a, b);
        } else if (this.filter.sortingOrder == SortingOrder.DESCENDING) {
          return bb - aa;
        }
        return aa - bb;
      });
    }
    return result;
  }

  selectGear(gear: Gear.Gear) {
    this.selectedGearId = gear.id;
  }

  goToTop() {
    console.log('called');
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }
}
</script>
