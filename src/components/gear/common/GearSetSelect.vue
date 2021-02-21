<template>
  <div class="d-flex flex-wrap">
    <!-- 'mr-2': i == sets.length - 1,  -->
    <div v-for="(set, i) in sets" :key="i" :class="{ 'mb-2': true }">
      <v-btn-toggle class="gear-filter" dense :multiple="multiple" :value="value" @change="change">
        <v-btn v-for="(item, index) in set" :key="index" :class="{ 'with-figure': displayFigures }" :value="item">
          <div class="d-flex flex-column justify-center align-center">
            <gear-set-icon :set="item" />
            <div v-if="displayFigures" class="caption" style="margin-top: -4px">({{ figures[item] }})</div>
          </div>
        </v-btn>
      </v-btn-toggle>
    </div>
  </div>
</template>
<style lang="sass" scoped>
::v-deep .v-btn.v-btn.with-figure
  height: 45px
  min-width: 52px
</style>
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
  @Model('change') readonly value!: Gear.Set[] | Gear.Set;
  @Prop({ type: Boolean, default: false }) readonly multiple!: boolean;
  @Prop({ required: false }) readonly figures?: Gear.SetFigures;

  get sets() {
    return Gear.SETS;
  }

  get displayFigures() {
    return this.figures != undefined;
  }

  @Emit()
  change(value: Gear.Set[] | Gear.Set) {
    return value;
  }
}
</script>
