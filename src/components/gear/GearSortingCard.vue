<template>
  <v-card class="pa-0" :class="{ 'card-size': $vuetify.breakpoint.smAndUp }" elevation="0" flat>
    <v-row no-gutters>
      <v-col cols="auto">
        <v-btn icon @click="toggleSort()">
          <v-icon>mdi-sort-numeric-{{ isDescending ? 'descending' : 'ascending' }} </v-icon>
        </v-btn>
      </v-col>
      <!-- <div style="height: 96px">
      <gear-card v-if="gearId" :gear="gear" />
      <div v-else class="pa-2" style="border: 1px dashed grey; border-radius: 4px; height: 100%">
        Click to select gear
      </div>
    </div> -->
      <v-col>
        <v-btn v-for="(item, key) in $const.GearStat.PRIMITIVE" :key="key" icon @click="toggleSort(item.value)">
          <gear-stat-icon :stat="item" />
        </v-btn>
        <v-btn v-for="(item, key) in $const.GearStat.SCORES" :key="`s${key}`" icon @click="toggleSort(item.value)">
          <gear-stat-icon :stat="item" />
        </v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>
<style lang="sass" scoped>
.card-size
  max-width: 320px
  min-width: 320px
</style>
<script lang="ts">
import { Gear } from '@/models';
import { mapGetters, mapActions } from 'vuex';
import { Vue, Component, Prop, Model } from 'vue-property-decorator';
import { GearStatIcon } from './common';
import { GearPageFilter, SortingColumn } from '@/models/gear-page';
import { SortingOrder } from '@/models/common';

@Component({
  name: 'gear-sorting-card',
  components: { GearStatIcon },
  computed: { ...mapGetters(['getGear']) },
  methods: mapActions(['removeGears'])
})
export default class GearSortingCard extends Vue {
  @Model() readonly form!: GearPageFilter;

  get isDescending() {
    return this.form.sortingOrder == SortingOrder.DESCENDING;
  }

  toggleSort(column?: SortingColumn) {
    if (this.form.sortingColumn == column || column == undefined) {
      this.form.sortingOrder =
        this.form.sortingOrder == SortingOrder.ASCENDING ? SortingOrder.DESCENDING : SortingOrder.ASCENDING;
    } else {
      this.form.sortingColumn = column;
      this.form.sortingOrder = SortingOrder.DESCENDING;
    }
  }
}
</script>
