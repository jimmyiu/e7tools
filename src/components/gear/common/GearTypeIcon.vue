<template>
  <v-row dense no-gutters>
    <v-col align="center">
      <v-img :max-height="getWidth()" :max-width="getWidth()" :src="`assets/img/gear/${type.toLowerCase()}.png`" />
    </v-col>
  </v-row>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Gear } from '@/models';

@Component
export default class GearTypeIcon extends Vue {
  name: string = 'gear-type-icon';
  @Prop() readonly type!: Gear.Type;
  @Prop({ type: Boolean, default: false }) readonly small!: Boolean;

  getWidth(): number {
    return this.small ? 22 : 44;
  }
}
</script>
