<template>
  <v-row dense no-gutters>
    <v-col align="center">
      <v-img
        :max-height="getWidth()"
        :max-width="getWidth()"
        :src="require(`@/assets/img/gear/set/${set.toLowerCase()}.png`)"
      />
    </v-col>
  </v-row>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Gear } from '@/models';

@Component
export default class GearSetIcon extends Vue {
  name: string = 'gear-set-icon';
  @Prop() readonly set!: Gear.Set;
  @Prop({ type: Boolean, default: false }) readonly small!: Boolean;

  getWidth(): number {
    return this.small ? 26 : 44;
  }
}
</script>
