<template>
  <v-card class="pa-0" elevation="0" outlined>
    <v-card-actions class="pa-1 mt-0 d-flex justify-space-between">
      <div>
        <v-btn class="hidden-md-and-up" icon @click="visible.overlay = true">
          <v-badge bordered color="primary" dot overlap :value="isFiltered">
            <v-icon>mdi-filter-variant</v-icon>
          </v-badge>
        </v-btn>
        <v-btn class="hidden-md-and-up" icon @click="toggleSorting"><v-icon>mdi-sort</v-icon></v-btn>
        <v-btn :disabled="!clearable" icon @click="clear"><v-icon>mdi-close-circle-outline</v-icon></v-btn>
        <!-- <v-btn icon><v-icon>mdi-chart-box-outline</v-icon></v-btn> -->
      </div>
      <div>
        <v-btn icon @click="createGear"><v-icon color="primary">mdi-plus-circle</v-icon></v-btn>
        <v-btn :disabled="!gear" icon @click="copyGear"><v-icon>mdi-content-copy</v-icon></v-btn>
        <v-btn :disabled="!gear" icon @click="editGear"><v-icon>edit</v-icon></v-btn>
        <v-btn :disabled="!gear" icon @click="deleteGear"><v-icon>delete</v-icon></v-btn>
      </div>
    </v-card-actions>
    <div v-if="visible.sorting" class="hidden-md-and-up">
      <v-divider />
      <gear-sorting-card v-model="filter" class="ma-1" />
    </div>
    <div class="hidden-sm-and-down">
      <v-divider />
      <gear-sorting-card v-model="filter" class="ma-1" />
      <v-divider />
      <gear-filter-input-sheet v-model="filter" :gears="filteredGears" />
    </div>
    <gear-form-bottom-sheet
      v-model="form.visible"
      :gear="gear"
      :mode="form.mode"
      @success="visible.completeMsg = true"
    />
    <v-overlay class="pa-2 hidden-md-and-up" color="section" :opacity="0.85" :value="visible.overlay">
      <gear-filter-input-sheet v-model="filter" :gears="filteredGears" />
      <v-btn class="mt-2 font-weight-bold" color="primary" width="100%" @click="visible.overlay = false">
        Close ({{ filteredGears.length }} Items)
      </v-btn>
    </v-overlay>
    <v-snackbar v-model="visible.completeMsg" bottom color="success" outlined timeout="1500">
      <div v-if="form.mode == 'edit'" class="text-center">A gear was updated</div>
      <div v-else class="text-center">A gear was created</div>
    </v-snackbar>
  </v-card>
</template>
<script lang="ts">
import { FilterMode, Gear } from '@/models';
import GearCard from './GearCard.vue';
import GearFormBottomSheet from './GearFormBottomSheet.vue';
import GearFilterInputSheet from './GearFilterInputSheet.vue';
import GearSortingCard from './GearSortingCard.vue';
import { mapGetters, mapActions } from 'vuex';
import { Vue, Component, Prop, Model, Watch } from 'vue-property-decorator';
import { GearFormMode } from '@/models/gear/gear-form';
import { assignGearPageFilter, emptyGearPageFilter, GearPageFilter, GearStatFilter } from '@/models/gear-page';
import { SortingOrder } from '@/models/common';

@Component({
  name: 'gear-action-card',
  components: { GearCard, GearFormBottomSheet, GearFilterInputSheet, GearSortingCard },
  computed: { ...mapGetters(['getGear', 'gears']) },
  methods: mapActions(['removeGears'])
})
export default class GearActionCard extends Vue {
  gears!: Gear.Gear[];
  getGear!: (gearId: string) => Gear.Gear | undefined;
  removeGears!: (gears: Gear.Gear[]) => void;

  @Prop() selectedGearId!: string | undefined;
  // @Model('change') filteredGears!: Gear.Gear[];

  filter: GearPageFilter = emptyGearPageFilter();
  visible = {
    overlay: false,
    sorting: false,
    completeMsg: false
  };

  // @Model('clear') gearId?: string;
  form = {
    visible: false,
    mode: 'new',
    gear: undefined
  } as {
    visible: boolean;
    mode: GearFormMode;
    gear?: Gear.Gear;
  };

  @Watch('filteredGears', { immediate: true, deep: false })
  onFilteredGearsChange(val: Gear.Gear[]) {
    this.$emit('change-gears', val);
  }

  @Watch('filter.sortingColumn', { immediate: true, deep: false })
  onSortingColumnChange(val: string) {
    this.$emit('change-sorting', val);
  }

  get isFiltered() {
    return this.gears.length != this.filteredGears.length;
  }

  get clearable() {
    return this.isFiltered || this.filter.sortingColumn != 'level';
  }

  get gear() {
    if (this.selectedGearId) {
      return this.getGear(this.selectedGearId);
    }
    return undefined;
  }

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
  toggleSorting() {
    this.visible.sorting = !this.visible.sorting;
    Vue.nextTick().then(() => this.$emit('resize'));
    // this.$emit('resize');
  }

  clear() {
    assignGearPageFilter(this.filter, emptyGearPageFilter());
  }

  createGear() {
    this.form.gear = undefined;
    this.form.mode = 'new';
    this.form.visible = true;
  }

  editGear() {
    console.log('editGear::gear.id = ' + this.gear!.id);
    this.form.gear = this.gear;
    this.form.mode = 'edit';
    this.form.visible = true;
  }

  copyGear() {
    this.form.gear = this.gear;
    this.form.mode = 'copy';
    this.form.visible = true;
  }

  deleteGear() {
    if (
      this.gear &&
      window.confirm(`Are you sure to delete the gear with type = ${this.gear.type} and set = ${this.gear.set}?`)
    ) {
      this.removeGears([this.gear]);
      // this.clear();
    }
  }
}
</script>
