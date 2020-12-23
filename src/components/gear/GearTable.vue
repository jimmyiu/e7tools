<template>
  <v-data-table dense :headers="headers" :items="gears" :items-per-page="15" multi-sort>
    <template v-slot:item.type="{ item }">
      <gear-type-icon small :type="item.type" />
    </template>
    <template v-slot:item.set="{ item }">
      <gear-set-icon :set="item.set" small />
    </template>
    <template v-slot:item.grade="{ item }">
      <v-chip :color="item.grade.color" label small text-color="white">{{ item.grade.name.substring(0, 1) }}</v-chip>
    </template>
    <template v-slot:item.title="{ item }">
      <div class="d-flex align-center justify-start">
        <gear-type-icon small :type="item.type" />
        <gear-set-icon :set="item.set" small />
        <v-chip :color="item.grade.color" label small text-color="white">{{ item.grade.name.substring(0, 1) }}</v-chip>
        <div>+{{ item.enhance }}</div>
      </div>
    </template>
    <!-- <template v-slot:item.enhance="{ item }">
      <v-chip color="red" small text-color="white">+{{ item.enhance }}</v-chip>
    </template> -->
  </v-data-table>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';
import { Gear } from '@/models';
import GearSetIcon from './GearSetIcon.vue';
import GearTypeIcon from './GearTypeIcon.vue';

@Component({
  components: {
    GearSetIcon,
    GearTypeIcon
  }
})
export default class GearTable extends Vue {
  name: string = 'gear-table';
  @Prop() readonly item!: any;
  @Prop() readonly gears!: Gear.Gear[];
  headers = [
    this.getHeader({ text: 'TYPE', value: 'type' }),
    this.getHeader({ text: 'SET', value: 'set', width: '40px' }),
    this.getHeader({ text: 'GRADE', value: 'grade', width: '60px' }),
    this.getHeader({ text: 'LV', value: 'level' }),
    this.getHeader({ text: 'ENH', value: 'enhance' }),
    // this.getHeader({ text: 'TITLE', value: 'title', width: '200px' }),
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
    this.getHeader({ text: 'RES', value: 'res' })
  ];

  getHeader(obj: any): any {
    return {
      ...{ width: '50px', class: 'px-1 py-1', divider: true, align: 'center' },
      ...obj
    };
  }
}
</script>
