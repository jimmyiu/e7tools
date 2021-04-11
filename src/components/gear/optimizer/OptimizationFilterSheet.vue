<template>
  <v-sheet class="mx-auto pa-2">
    <v-row dense>
      <v-col class="d-flex justify-center align-center">
        <div class="mr-2">Gear Filter</div>
        <v-divider />
      </v-col>
    </v-row>
    <v-row dense>
      <v-col cols="12">
        <v-autocomplete
          v-model="value.sets"
          class="mb-2"
          clear-icon="mdi-close-circle-outline"
          clearable
          dense
          hide-details
          :items="$const.GearSet.ALL"
          label="Only Include Sets"
          multiple
          outlined
          return-object
        >
          <template v-slot:selection="{ item, index }">
            <span v-if="index === 0" class="mr-1">{{ item }}</span>
            <span v-if="index === 1" class="grey--text caption"> (+{{ value.sets.length - 1 }} others) </span>
          </template>
        </v-autocomplete>
        <v-select
          v-model="value.necklaces"
          class="mb-2"
          clear-icon="mdi-close-circle-outline"
          clearable
          dense
          hide-details
          item-text="label"
          :items="$const.GearStat.NECKLACE_MAIN_STATS"
          label="Necklace Main Stat"
          multiple
          outlined
          return-object
        >
          <template v-slot:selection="{ item, index }">
            <span v-if="index === 0" class="mr-1">{{ item.label }}</span>
            <span v-if="index === 1" class="grey--text caption"> (+{{ value.necklaces.length - 1 }} others) </span>
          </template>
        </v-select>
        <v-select
          v-model="value.rings"
          class="mb-2"
          clear-icon="mdi-close-circle-outline"
          clearable
          dense
          hide-details
          item-text="label"
          :items="$const.GearStat.RING_MAIN_STATS"
          label="Ring Main Stat"
          multiple
          outlined
          return-object
        >
          <template v-slot:selection="{ item, index }">
            <span v-if="index === 0" class="mr-1">{{ item.label }}</span>
            <span v-if="index === 1" class="grey--text caption"> (+{{ value.rings.length - 1 }} others) </span>
          </template>
        </v-select>
        <v-select
          v-model="value.boots"
          class="mb-2"
          clear-icon="mdi-close-circle-outline"
          clearable
          dense
          hide-details
          item-text="label"
          :items="$const.GearStat.BOOT_MAIN_STATS"
          label="Boot Main Stat"
          multiple
          outlined
          return-object
        >
          <template v-slot:selection="{ item, index }">
            <span v-if="index === 0" class="mr-1">{{ item.label }}</span>
            <span v-if="index === 1" class="grey--text caption"> (+{{ value.boots.length - 1 }} others) </span>
          </template>
        </v-select>
        <v-text-field v-model.number="value.maxSize" dense hide-details label="Max Size" outlined type="number" />
        <!-- </v-col>
      <v-col cols="4"> -->

        <v-select
          v-model.number="value.equippedMode"
          class="mt-2"
          dense
          hide-details
          item-text="label"
          item-value="value"
          :items="equippedModes"
          label="Equipped"
          outlined
        />
        <v-checkbox v-model="value.enhanceMode" class="mr-3 my-0" dense hide-details label="+15 Only" :value="2" />
      </v-col>
    </v-row>
  </v-sheet>
</template>
<style lang="sass" scoped>
::v-deep .rating > .v-input__control > .v-input__slot
  padding: 0 8px!important
</style>
<script lang="ts">
import { Vue, Component, Prop, Emit, Model } from 'vue-property-decorator';
import { Constants, Gear } from '@/models';
import { GearSetIcon, GearSetSelect, GearTypeIcon, GearTypeSelect } from '../common';
import { OptimizationFilter, OptimizationFilterEquippedMode } from '@/models/optimizer';

@Component({
  name: 'optimization-filter-sheet',
  components: {
    GearSetIcon,
    GearSetSelect,
    GearTypeIcon,
    GearTypeSelect
  }
})
export default class OptimizationFilterSheet extends Vue {
  @Model() readonly value!: OptimizationFilter;
  readonly equippedModes = [
    {
      label: 'All',
      value: OptimizationFilterEquippedMode.ALL
    },
    {
      label: 'Lower Order',
      value: OptimizationFilterEquippedMode.LOWER_ORDER
    },
    {
      label: 'None',
      value: OptimizationFilterEquippedMode.NONE
    }
  ];
}
</script>
