<template>
  <div class="d-flex flex-wrap">
    <!-- 'mr-2': i == sets.length - 1,  -->
    <div v-for="(set, i) in sets" :key="i" :class="{ 'mb-2': true }">
      <v-btn-toggle class="gear-filter" dense :multiple="multiple" :value="value" @change="change">
        <v-btn v-for="(item, index) in set" :key="index" :value="item">
          <gear-set-icon :set="item" small />
        </v-btn>
      </v-btn-toggle>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Model, Emit } from 'vue-property-decorator';
import { GearSetIcon } from './index';
import { Gear } from '@/models';

@Component({
  name: 'gear-set-select',
  components: {
    GearSetIcon
  }
})
export default class GearSetSelect extends Vue {
  sets = Gear.SETS;
  @Model('change') readonly value!: Gear.Set[] | Gear.Set;
  @Prop({ type: Boolean, default: false }) readonly multiple!: boolean;
  @Emit()
  change(value: Gear.Set[] | Gear.Set) {
    console.log(value);
    return value;
  }
}
</script>
