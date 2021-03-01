<template>
  <v-row no-gutters>
    <v-col cols="12">
      <v-virtual-scroll height="606" item-height="102" :items="gears">
        <template v-slot:default="{ item }">
          <!-- <div class="d-flex align-center">
            <v-checkbox /> -->
          <gear-card :gear="item" :highlight1="sortCol" :selectable="true" @select="selectGear" />
          <!-- </div> -->
        </template>
      </v-virtual-scroll>
    </v-col>
    <!-- <v-col cols="12"> -->
    <!-- Showing {{ gears.length }} gears: 1-15 of 363, page size = {{ pageSize }} -->
    <!-- <div>
        <v-text-field v-model.number="pageSize" dense hide-details label="Page Size" outlined type="number" />
      </div> -->
    <!-- <v-pagination v-model="currentPage" :length="numOfPages" :total-visible="6"></v-pagination> -->
    <!-- </v-col> -->
  </v-row>
</template>
<style lang="sass" scoped>
::v-deep td
  padding: 0 8px!important
</style>
<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';
import { Gear } from '@/models';
import { GearCard } from '..';
import { mapActions, mapGetters } from 'vuex';

@Component({
  name: 'gear-table',
  components: { GearCard },
  computed: { ...mapGetters(['getGear']) }
})
export default class GearListView extends Vue {
  getGear!: (gearId: string) => Gear.Gear;
  @Prop() readonly gears!: Gear.Gear[];
  @Prop() readonly sortCol!: string | undefined;
  selectedGearId: string = '';

  selectGear(gear: Gear.Gear) {
    this.$emit('select', gear);
  }

  // pageSize = 10;
  // currentPage = 1;

  // get filteredGears() {
  //   return this.gears.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize);
  // }
  // get numOfPages() {
  //   return Math.ceil(this.gears.length / this.pageSize);
  // }

  // get statistics() {
  //   return gearService.calculateStatistics(this.filteredGears);
  // }

  // headers = [
  //   this.getHeader({ text: 'GEAR', value: 'type', sortable: false }),
  //   // this.getHeader({ text: 'SET', value: 'set', width: '40px' }),
  //   // this.getHeader({ text: 'GRADE', value: 'grade', width: '60px' }),
  //   // this.getHeader({ text: 'LV', value: 'level' }),
  //   // this.getHeader({ text: 'ENH', value: 'enhance' }),
  //   // this.getHeader({ text: 'TITLE', value: 'title', width: '200px' }),
  //   this.getHeader({ text: 'Main', value: 'main', width: '70px', sortable: false }),
  //   this.getHeader({ text: 'HP %', value: 'hpp', width: '60px' }),
  //   this.getHeader({ text: 'HP', value: 'hp' }),
  //   this.getHeader({ text: 'DEF %', value: 'defp', width: '60px' }),
  //   this.getHeader({ text: 'DEF', value: 'def' }),
  //   this.getHeader({ text: 'ATK %', value: 'atkp', width: '60px' }),
  //   this.getHeader({ text: 'ATK', value: 'atk' }),
  //   this.getHeader({ text: 'CRI', value: 'cri' }),
  //   this.getHeader({ text: 'C.DMG', value: 'cdmg', width: '60px' }),
  //   this.getHeader({ text: 'SPD', value: 'spd' }),
  //   this.getHeader({ text: 'EFF', value: 'eff' }),
  //   this.getHeader({ text: 'RES', value: 'res' }),
  //   this.getHeader({ text: 'SCORE', value: 'score' }),
  //   this.getHeader({ text: 'OFF', value: 'offScore' }),
  //   this.getHeader({ text: 'DEF', value: 'defScore' }),
  //   this.getHeader({ text: 'EQ', value: 'equippedHero' }),
  //   this.getHeader({ text: '', value: 'action', width: '100px' })
  // ];

  // getHeader(obj: any): any {
  //   return {
  //     ...{ width: '50px', class: 'px-1 py-1', divider: true, align: 'center', style: 'border: 3px' },
  //     ...obj
  //   };
  // }

  // lockGear(gear: Gear.Gear) {
  //   let lockGear = this.getGear(gear.id);
  //   if (lockGear) {
  //     lockGear.locked = !lockGear.locked;
  //     this.saveGears([lockGear]);
  //   }
  // }

  // confirmDelete(gear: Gear.Gear) {
  //   if (window.confirm(`Are you sure to delete the gear with type = ${gear.type} and set = ${gear.set}?`)) {
  //     this.removeGears([gear]);
  //   }
  // }
}
</script>
