<template>
  <div>
    <v-img :max-height="width" :max-width="width" :src="require(`@/assets/img/gear/set/${set.toLowerCase()}.png`)" />
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Gear } from '@/models';

@Component
export default class GearSetIcon extends Vue {
  name: string = 'gear-set-icon';
  @Prop() readonly set!: Gear.Set;
  @Prop({ type: Boolean, default: false }) readonly small!: Boolean;

  get width(): number {
    return this.small ? 26 : 44;
  }
}
</script>
