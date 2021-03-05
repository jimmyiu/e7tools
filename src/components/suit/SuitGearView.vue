<template>
  <v-row v-if="suit" dense>
    <v-col v-for="(item, key) in suitGears" :key="key" cols="12" md="4" sm="6">
      <gear-card
        class="mx-auto"
        :gear="item"
        :selectable="selectable"
        :selected="isSelectedGear(item)"
        @click="click"
      />
    </v-col>
  </v-row>
</template>
<script lang="ts">
import { Gear, Suit } from '@/models';
import { Vue, Component, Prop, Emit, Model } from 'vue-property-decorator';
import { GearCard } from '@/components';

/**
 * TODO: add slider
 */
@Component({
  name: 'suit-gear-view',
  components: { GearCard }
})
export default class SuitGearView extends Vue {
  @Prop({ type: Boolean, default: false }) readonly selectable!: boolean;
  @Prop() readonly suit!: Suit;
  @Model('input', {
    default: () => {
      return [];
    }
  })
  value!: string[];

  get suitGears() {
    if (this.suit) {
      return [this.suit.weapon, this.suit.helmet, this.suit.armor, this.suit.necklace, this.suit.ring, this.suit.boot];
    }
    return [];
  }

  isSelectedGear(gear: Gear.Gear | undefined) {
    if (!gear) {
      return false;
    }
    return this.value.findIndex(x => x == gear.id) >= 0;
  }

  // @Emit('input')
  click(gear: Gear.Gear | undefined) {
    if (!gear) {
      return;
    }
    const index = this.value.findIndex(x => x == gear.id);
    if (index < 0) {
      this.$emit('input', [...this.value, gear.id]);
    } else {
      this.$emit('input', [...this.value.slice(0, index), ...this.value.slice(index + 1, undefined)]);
    }
  }
}
</script>
