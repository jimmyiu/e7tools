<template>
  <div style="max-width: 252px">
    <!-- <v-icon right>help_outlined</v-icon> -->
    <gear-set-select v-model="value.sets" multiple />
    <!-- <v-autocomplete
      v-model="value.sets"
      class="mb-2"
      clear-icon="mdi-close-circle-outline"
      clearable
      dense
      hide-details
      :items="sets"
      label="Only Include Sets"
      multiple
      outlined
      return-object
    /> -->
    <v-select
      v-model="value.necklaces"
      class="mb-2"
      clear-icon="mdi-close-circle-outline"
      clearable
      dense
      hide-details
      item-text="label"
      :items="stats.necklaces"
      label="Necklace Main Stat"
      multiple
      outlined
      return-object
    />
    <v-select
      v-model="value.rings"
      class="mb-2"
      clear-icon="mdi-close-circle-outline"
      clearable
      dense
      hide-details
      item-text="label"
      :items="stats.rings"
      label="Ring Main Stat"
      multiple
      outlined
      return-object
    />
    <v-select
      v-model="value.boots"
      class="mb-2"
      clear-icon="mdi-close-circle-outline"
      clearable
      dense
      hide-details
      item-text="label"
      :items="stats.boots"
      label="Boot Main Stat"
      multiple
      outlined
      return-object
    />
    <!-- <v-text-field dense hide-details label="Gear Score (Min)" outlined /> -->
    <v-checkbox
      v-model="value.enhanceMode"
      class="mr-3 my-0"
      dense
      hide-details
      label="+15 Only"
      :value="2"
    ></v-checkbox>
    <!-- <v-checkbox v-model="value.locked" class="mr-3 my-0" dense hide-details label="Include Locked"></v-checkbox> -->
    <v-checkbox v-model="value.equipped" class="mr-3 my-0" dense hide-details label="Include Equipped"></v-checkbox>
    <!-- class="justify-center" -->
    <!-- <v-checkbox
      v-model="value.allowBrokenSet"
      class="mr-3 mb-3 mt-0"
      dense
      disabled
      hide-details
      label="Broken Set"
    ></v-checkbox> -->
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit, Model } from 'vue-property-decorator';
import { Constants, Gear } from '@/models';
import { GearSetIcon, GearSetSelect, GearTypeIcon, GearTypeSelect } from '../common';

@Component({
  name: 'optimization-filter',
  components: {
    GearSetIcon,
    GearSetSelect,
    GearTypeIcon,
    GearTypeSelect
  }
})
export default class OptimizationFilter extends Vue {
  @Model() readonly value!: Gear.GearFilter;
  get stats() {
    return {
      necklaces: Constants.NECKLACE_STATS,
      rings: Constants.RING_STATS,
      boots: Constants.BOOT_STATS
    };
  }

  get sets() {
    return Object.values(Gear.Set);
  }
}
</script>
