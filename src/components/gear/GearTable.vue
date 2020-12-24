<template>
  <v-data-table
    dense
    :footer-props="{ showFirstLastPage: true }"
    :headers="headers"
    :items="gears"
    :items-per-page="20"
    multi-sort
  >
    <template v-slot:item.type="{ item }">
      <div class="d-flex align-center" style="white-space:nowrap; max-width: 80px">
        <gear-type-icon small :type="item.type" />
        <gear-set-icon :set="item.set" small />
        <div>
          <span :style="'color: ' + item.grade.color">{{ item.level }}</span> +{{ item.enhance }}
        </div>
      </div>
    </template>
    <template v-slot:item.set="{ item }">
      <gear-set-icon :set="item.set" small />
    </template>
    <template v-slot:item.grade="{ item }">
      <v-chip :color="item.grade.color" label small text-color="white">{{ item.grade.name.substring(0, 1) }}</v-chip>
    </template>
    <!-- <template v-slot:item.score="{ item }">
      {{ item.atkp + item.hpp }}
    </template> -->
    <template v-slot:item.main="{ item }">
      {{ item.main.label }}
    </template>
    <!-- <template v-slot:item.enhance="{ item }">
      <v-chip color="red" small text-color="white">+{{ item.enhance }}</v-chip>
    </template> -->
  </v-data-table>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';
import { Gear } from '@/models';
import GearService from '@/services/gear-service';
import GearSetIcon from './GearSetIcon.vue';
import GearTypeIcon from './GearTypeIcon.vue';

@Component({
  name: 'gear-table',
  components: { GearSetIcon, GearTypeIcon }
})
export default class GearTable extends Vue {
  @Prop() readonly item!: any;
  @Prop() readonly gears!: Gear.Gear[];
  headers = [
    this.getHeader({ text: 'GEAR', value: 'type', sortable: false }),
    // this.getHeader({ text: 'SET', value: 'set', width: '40px' }),
    // this.getHeader({ text: 'GRADE', value: 'grade', width: '60px' }),
    // this.getHeader({ text: 'LV', value: 'level' }),
    // this.getHeader({ text: 'ENH', value: 'enhance' }),
    // this.getHeader({ text: 'TITLE', value: 'title', width: '200px' }),
    this.getHeader({ text: 'Main', value: 'main', width: '60px' }),
    this.getHeader({ text: 'HP %', value: 'hpp', width: '60px' }),
    this.getHeader({ text: 'HP', value: 'hp' }),
    this.getHeader({ text: 'DEF %', value: 'defp', width: '60px' }),
    this.getHeader({ text: 'DEF', value: 'def' }),
    this.getHeader({ text: 'ATK %', value: 'atkp', width: '60px' }),
    this.getHeader({ text: 'ATK', value: 'atk' }),
    this.getHeader({ text: 'CRI', value: 'cri' }),
    this.getHeader({ text: 'C.DMG', value: 'cdmg', width: '60px' }),
    this.getHeader({ text: 'SPD', value: 'spd' }),
    this.getHeader({ text: 'EFF', value: 'eff' }),
    this.getHeader({ text: 'RES', value: 'res' }),
    this.getHeader({ text: 'STD_S', value: 'score' }),
    this.getHeader({ text: 'DEF_S', value: 'defScore' }),
    this.getHeader({ text: 'OFF_S', value: 'offScore' })
  ];

  getHeader(obj: any): any {
    return {
      ...{ width: '50px', class: 'px-1 py-1', divider: true, align: 'center', style: 'border: 3px' },
      ...obj
    };
  }
}
</script>
