<template>
  <v-text-field autocomplete="false" dense hide-details outlined type="number" :value="value" @input="input">
    <template v-slot:prepend-inner>
      <gear-stat-icon :stat="stat" style="padding-top: 3px;" />
    </template>
    <template v-if="displayPercent" v-slot:append><div class="pt-1">%</div></template>
  </v-text-field>
</template>
<style lang="sass" scoped>
::v-deep .v-input__slot
  padding: 0 8px 0 6px!important

::v-deep .v-application--is-ltr .v-text-field .v-input__prepend-inner
  padding-right: 2px
</style>
<script lang="ts">
import { Gear } from '@/models';
import { Vue, Component, Prop, Model } from 'vue-property-decorator';
import { GearStatIcon } from '.';

@Component({
  name: 'gear-stat-input',
  components: { GearStatIcon }
})
export default class GearStatInput extends Vue {
  @Prop() readonly stat!: Gear.Stat;
  @Model('input') readonly value!: number;

  input(value: number) {
    if (value !== undefined) {
      this.$emit('input', value);
    }
  }

  get displayPercent() {
    if (this.stat) {
      return [Gear.Stat.HPP, Gear.Stat.DEFP, Gear.Stat.ATKP].findIndex(x => x == this.stat) >= 0;
    }
    return false;
  }
}
</script>
