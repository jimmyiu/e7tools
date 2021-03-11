<template>
  <div v-resize="onResize" class="mx-auto">
    <v-row dense justify="center">
      <v-col cols="12" md="auto">
        <gear-action-card
          :selected-gear-id="selectedGearId"
          @change-gears="changeGears"
          @change-sorting="changeSorting"
          @click="actionClick"
          @resize="onResize"
        />
      </v-col>
      <!-- v-if="$vuetify.breakpoint.smAndDown" -->
      <v-col ref="container" cols="12" md="auto">
        <v-row dense justify="center">
          <v-col v-if="$vuetify.breakpoint.lgAndUp || mode == 'list'" cols="auto">
            <gear-list-view
              v-model="selectedGearId"
              class="mx-auto"
              :gears="filteredGears"
              :height="listViewHeight"
              :sort-col="sortingColumn"
            />
          </v-col>
          <v-col v-if="$vuetify.breakpoint.lgAndUp || mode == 'statistics'" cols="auto">
            <gear-statistics-sheet :gears="filteredGears" />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-btn bottom class="hidden-lg-and-up" elevation="12" fab fixed right small @click="toggleMode">
      <v-icon v-if="mode == 'list'">mdi-chart-box-outline</v-icon>
      <v-icon v-else>mdi-view-list-outline</v-icon>
    </v-btn>
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
  mode: 'statistics' | 'list' = 'list';
  // @Ref('listView') readonly listView!: Vue;
  @Ref('container') readonly container!: HTMLElement;

  changeGears(gears: Gear.Gear[]) {
    this.filteredGears.splice(0, this.filteredGears.length, ...gears);
  }

  changeSorting(sortingCol: string) {
    this.sortingColumn = sortingCol;
  }

  toggleMode() {
    this.mode = this.mode == 'list' ? 'statistics' : 'list';
  }

  actionClick(action: string, visible: boolean) {
    console.log(action, visible);
  }
  // goToTop() {
  //   console.log('called');
  // window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  // this.$vuetify.goTo(0, { container: '#app' });
  // this.$vuetify.goTo('#app', { offset: -100 });
  //   (document.getElementById('app') as any).scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  // }

  onResize() {
    // const
    // console.log('container top = ' + this.container.offsetTop);
    // if (this.listView && this.listView.$el) {
    // const offsetTop = (this.listView.$el as HTMLElement).offsetTop;

    // console.log(offsetTop);
    // console.log(this.$refs.gearActionCard.$el.clientHeight);
    // this.listViewHeight = window.innerHeight - (60 + 12 + 12 + this.$refs.gearActionCard.$el.clientHeight + 8);
    // if (this.$vuetify.breakpoint.mdAndUp) {
    //   this
    // }
    setTimeout(() => {
      const offsetTop = this.container.offsetTop;
      this.listViewHeight = window.innerHeight - offsetTop - 64;
    }, 400);
    // }
  }
}
</script>
