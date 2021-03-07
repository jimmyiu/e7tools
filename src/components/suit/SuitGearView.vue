<template>
  <div v-if="suit" :class="{ size: $vuetify.breakpoint.mdAndDown }">
    <v-row dense>
      <v-col v-if="hero" cols="12" lg="auto">
        <hero-detail-card :hero="hero" :suit="suit" />
      </v-col>
      <v-col class="d-flex justify-space-between" cols="12" lg="auto">
        <gear-small-card
          v-for="index in [0, 1, 2]"
          :key="index"
          :class="{ 'mx-2': index == 1 }"
          :gear="suitGears[index]"
          :selectable="selectable"
          :selected="isSelectedGear(suitGears[index])"
          @click="click"
        />
      </v-col>
      <v-col class="d-flex justify-space-between" cols="12" lg="auto">
        <!-- <div class="d-flex justify-space-between"> -->
        <gear-small-card
          v-for="index in [3, 4, 5]"
          :key="index"
          :class="{ 'mx-2': index == 4 }"
          :gear="suitGears[index]"
          :selectable="selectable"
          :selected="isSelectedGear(suitGears[index])"
          @click="click"
        />
        <!-- </div> -->
      </v-col>
      <!-- </v-col>
    <v-col cols="12">
    </v-col>
<v-col cols="12">
    <v-col v-for="(item, key) in suitGears" :key="key" cols="4" sm="auto">
      <gear-small-card
        class="mx-auto"
        :gear="item"
        :selectable="selectable"
        :selected="isSelectedGear(item)"
        @click="click"
      />
    </v-col>
    -->
    </v-row>
  </div>
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
  name: 'suit-gear-view',
  components: { GearCard, GearSmallCard, HeroDetailCard }
})
export default class SuitGearView extends Vue {
  @Prop({ type: Boolean, default: false }) readonly selectable!: boolean;
  @Prop({ default: undefined, required: false }) readonly hero!: Hero | undefined;
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
