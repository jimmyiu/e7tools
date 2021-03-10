<template>
  <div v-resize="onResize" class="mx-auto">
    <gear-action-card
      class="mb-2"
      :selected-gear-id="selectedGearId"
      @change-gears="changeGears"
      @change-sorting="changeSorting"
    />
    <v-row dense justify="center">
      <!-- <v-col cols="12" sm="auto">
        <gear-filter-input-sheet v-model="filter" class="mb-2" :gears="filteredGears" />
      </v-col> -->
      <!-- <v-col cols="12" sm="auto">
        <gear-statistics-sheet :gears="filteredGears" />
      </v-col> -->
      <v-col cols="12">
        <gear-list-view
          v-model="selectedGearId"
          :gears="filteredGears"
          :height="listViewHeight"
          :sort-col="sortingColumn"
        />
        <!-- <gear-table :gears="filteredGears" @edit-gear="editGear" /> -->
        <!-- <v-btn bottom class="hidden-sm-and-up" fab fixed right small @click="goToTop">
          <v-icon>mdi-chevron-up</v-icon>
        </v-btn> -->
      </v-col>
    </v-row>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { mapActions, mapGetters } from 'vuex';
import {
  GearActionCard,
  GearSortingCard,
  GearTable,
  GearFilterInputSheet,
  GearCard,
  GearStatisticsSheet,
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
    GearCard,
    GearStatisticsSheet,
    GearListView
  }
  // computed: { ...mapGetters(['gears', 'getGear']) }
})
export default class GearPage extends Vue {
  // getGear!: (gearId: string) => Gear.Gear;
  // gears!: Gear.Gear[];
  selectedGearId: string = '';
  sortingColumn: string = '';
  filteredGears: Gear.Gear[] = [];
  listViewHeight = 500;

  changeGears(gears: Gear.Gear[]) {
    this.filteredGears.splice(0, this.filteredGears.length, ...gears);
  }

  changeSorting(sortingCol: string) {
    this.sortingColumn = sortingCol;
  }

  goToTop() {
    console.log('called');
    // window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    // this.$vuetify.goTo(0, { container: '#app' });
    // this.$vuetify.goTo('#app', { offset: -100 });
    (document.getElementById('app') as any).scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }

  onResize() {
    console.log('window.innerHeight =', window.innerHeight);
    this.listViewHeight = window.innerHeight - (60 + 12 + 12 + 46 + 8);
  }
}
</script>
