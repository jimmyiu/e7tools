<template>
  <div v-resize="onResize" class="mx-auto">
    <v-row dense justify="center">
      <v-col cols="12" md="auto">
        <gear-action-card
          id="testing123"
          ref="gearActionCard"
          :selected-gear-id="selectedGearId"
          @change-gears="changeGears"
          @change-sorting="changeSorting"
          @resize="onResize"
        />
      </v-col>
      <!-- <v-col cols="12" sm="auto">
        <gear-statistics-sheet :gears="filteredGears" />
      </v-col> -->
      <v-col cols="12" md="auto">
        <gear-list-view
          ref="listView"
          v-model="selectedGearId"
          class="mx-auto"
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
import { Vue, Component, Watch, Ref } from 'vue-property-decorator';
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
  @Ref('listView') readonly listView!: Vue;

  changeGears(gears: Gear.Gear[]) {
    this.filteredGears.splice(0, this.filteredGears.length, ...gears);
  }

  changeSorting(sortingCol: string) {
    this.sortingColumn = sortingCol;
  }

  // goToTop() {
  //   console.log('called');
  // window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  // this.$vuetify.goTo(0, { container: '#app' });
  // this.$vuetify.goTo('#app', { offset: -100 });
  //   (document.getElementById('app') as any).scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  // }

  onResize() {
    // console.log('window.innerHeight =', window.innerHeight);
    // setTimeout(() => {
    // console.log(this.$refs.listView.$el.offsetTop);
    // console.log(this.$refs.gearActionCard.$el.clientHeight);
    // this.listViewHeight = window.innerHeight - (60 + 12 + 12 + this.$refs.gearActionCard.$el.clientHeight + 8);
    // if (this.$vuetify.breakpoint.mdAndUp) {
    //   this
    // }
    // console.log(this.$vuetify.breakpoint.mdAndUp);
    // console.log(this.listView);
    this.listViewHeight = window.innerHeight - (this.listView.$el as HTMLElement).offsetTop - 60;
    // }, 500);
  }
}
</script>
