<template>
  <div>{{ heroId }}</div>
</template>
<style lang="sass" scoped>
.size
  max-width: 336px
  min-width: 336px
</style>
<script lang="ts">
import { Gear, Hero, Suit } from '@/models';
import { Vue, Component, Prop, Emit, Model } from 'vue-property-decorator';
import { GearCard, GearSmallCard, HeroDetailCard } from '@/components';

/**
 * TODO: add slider
 */
@Component({
  name: 'suit-compare-view',
  components: { GearCard, GearSmallCard, HeroDetailCard }
})
export default class SuitCompareView extends Vue {
  @Prop() readonly heroId!: string;
  @Prop() readonly from!: Suit;
  @Prop() readonly to!: Suit;
  // @Prop({ type: Boolean, default: false }) readonly selectable!: boolean;
  // @Prop({ default: undefined, required: false }) readonly hero!: Hero | undefined;
  // @Prop() readonly suit!: Suit;
  // @Model('input', {
  //   default: () => {
  //     return [];
  //   }
  // })
  // value!: string[];

  // get suitGears() {
  //   if (this.suit) {
  //     return [this.suit.weapon, this.suit.helmet, this.suit.armor, this.suit.necklace, this.suit.ring, this.suit.boot];
  //   }
  //   return [];
  // }

  // isSelectedGear(gear: Gear.Gear | undefined) {
  //   if (!gear) {
  //     return false;
  //   }
  //   return this.value.findIndex(x => x == gear.id) >= 0;
  // }

  // // @Emit('input')
  // click(gear: Gear.Gear | undefined) {
  //   if (!gear) {
  //     return;
  //   }
  //   const index = this.value.findIndex(x => x == gear.id);
  //   if (index < 0) {
  //     this.$emit('input', [...this.value, gear.id]);
  //   } else {
  //     this.$emit('input', [...this.value.slice(0, index), ...this.value.slice(index + 1, undefined)]);
  //   }
  // }
}
</script>
