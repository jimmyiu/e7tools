<template>
  <div>
    <v-img :max-height="width" :max-width="width" :src="require(`@/assets/img/gear/gear${type.toLowerCase()}.png`)" />
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Gear } from '@/models';

@Component({
  name: 'gear-type-icon'
})
export default class GearTypeIcon extends Vue {
  @Prop() readonly type!: Gear.Type;
  @Prop({ type: Boolean, default: false }) readonly small!: Boolean;

  get width(): number {
    return this.small ? 22 : 44;
  }
}
</script>
