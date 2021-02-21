<template>
  <v-img :max-height="size" :max-width="size" :src="require(`@/assets/img/gear/gear${type.toLowerCase()}.png`)" />
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Gear } from '@/models';

@Component({
  name: 'gear-type-icon'
})
export default class GearTypeIcon extends Vue {
  @Prop() readonly type!: Gear.Type;

  get size(): number {
    return 22;
  }
}
</script>
