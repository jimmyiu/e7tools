<template>
  <div class="d-flex flex-wrap">
    <v-text-field
      v-model="value.spd.min"
      class="pb-2 mr-2"
      dense
      hide-details
      label="SPD (min)"
      outlined
      type="number"
    />
    <v-text-field
      v-model="value.spd.max"
      class="pb-2 mr-2"
      dense
      hide-details
      label="SPD (max)"
      outlined
      type="number"
    />
    <v-text-field
      v-model="value.cri.min"
      class="pb-2 mr-2"
      dense
      hide-details
      label="CRI (min)"
      outlined
      type="number"
    />
    <v-text-field
      v-model="value.cri.max"
      class="pb-2 mr-2"
      dense
      hide-details
      label="CRI (max)"
      outlined
      type="number"
    />
    <v-text-field
      v-model="value.cdmg.min"
      class="pb-2 mr-2"
      dense
      hide-details
      label="C.DMG (min)"
      outlined
      type="number"
    />
    <v-text-field
      v-model="value.cdmg.max"
      class="pb-2 mr-2"
      dense
      hide-details
      label="C.DMG (max)"
      outlined
      type="number"
    />
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit, Model } from 'vue-property-decorator';
import { Gear } from '@/models';

@Component({
  name: 'gear-optimizer-criteria'
})
export default class GearOptimizerCriteria extends Vue {
  @Model() readonly value!: Gear.GearOptimizerCriteria;
}
</script>
