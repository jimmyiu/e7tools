<template>
  <v-btn-toggle class="gear-filter" dense :value="value" @change="change">
    <v-btn v-for="(item, index) in types" :key="index" :class="{ 'with-figure': displayFigures }" :value="item">
      <div class="d-flex flex-column justify-center align-center">
        <gear-type-icon :type="item" />
        <div v-if="displayFigures" class="caption" style="margin-top: -3px">({{ figures[item] }})</div>
      </div>
    </v-btn>
  </v-btn-toggle>
</template>
<style lang="sass" scoped>
// ::v-deep .v-btn.v-btn.with-figure
//   height: 45px
//   min-width: 52px
</style>
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
  @Prop({ required: false }) readonly figures?: Gear.TypeFigures;

  get displayFigures() {
    return this.figures != undefined;
  }

  @Emit()
  change(value: Gear.Type) {
    return value;
  }
}
</script>
