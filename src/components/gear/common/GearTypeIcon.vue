<template>
  <div>
    <v-img :max-height="width" :max-width="width" :src="require(`@/assets/img/gear/${type.toLowerCase()}.png`)" />
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Gear } from '@/models';

@Component
export default class GearTypeIcon extends Vue {
  name: string = 'gear-type-icon';
  @Prop() readonly type!: Gear.Type;
  @Prop({ type: Boolean, default: false }) readonly small!: Boolean;

  get width(): number {
    return this.small ? 22 : 44;
  }
}
</script>
