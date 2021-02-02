<template>
  <div>
    <gear-set-select v-model="value.sets" multiple />
    <v-checkbox
      v-model="value.enhanceMode"
      class="mr-3 mb-3 mt-0"
      dense
      hide-details
      label="+15 Only"
      :value="2"
    ></v-checkbox>
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
import { Gear } from '@/models';
import { GearSetIcon, GearSetSelect, GearTypeIcon, GearTypeSelect } from '../common';

@Component({
  name: 'gear-optimizer-filter',
  components: {
    GearSetIcon,
    GearSetSelect,
    GearTypeIcon,
    GearTypeSelect
  }
})
export default class GearOptimizerFilter extends Vue {
  @Model() readonly value!: Gear.GearFilter;
}
</script>
