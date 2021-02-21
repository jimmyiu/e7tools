<template>
  <v-img
    :max-height="size"
    :max-width="size"
    :src="require(`@/assets/img/gear/set/${set.toLowerCase()}.png`)"
    style="margin-top: 3px"
  />
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Gear } from '@/models';

@Component({
  name: 'gear-set-icon'
})
export default class GearSetIcon extends Vue {
  @Prop() readonly set!: Gear.Set;

  get size(): number {
    return 26;
  }
}
</script>
