<template>
  <div class="d-flex">
    <v-btn-toggle class="gear-filter" dense :value="value" @change="change">
      <v-btn v-for="(item, index) in types" :key="index" :value="item">
        <gear-type-icon small :type="item" />
      </v-btn>
    </v-btn-toggle>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Model, Emit } from 'vue-property-decorator';
import { GearTypeIcon } from './index';
import { Gear } from '@/models';

@Component({
  name: 'gear-type-select',
  components: {
    GearTypeIcon
  }
})
export default class GearTypeSelect extends Vue {
  types = Object.values(Gear.Type);
  @Model('change') readonly value!: Gear.Type;

  @Emit()
  change(value: Gear.Type) {
    return value;
  }
}
</script>
