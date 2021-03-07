<template>
  <v-sheet v-if="equippedHero" :class="{ size: $vuetify.breakpoint.smAndUp }" elevation="0" outlined rounded>
    <v-row class="pa-1" no-gutters>
      <v-col cols="auto">
        <div>
          <v-img :src="equippedHero.hero.icon" width="48"></v-img>
        </div>
        <div class="d-flex flex-wrap" style="width: 54px">
          <gear-set-icon v-for="(set, key) in equippedHero.suit.sets" :key="key" :set="set" />
        </div>
      </v-col>
      <v-col>
        <v-row no-gutters>
          <template v-for="(item, key) in stats">
            <v-col :key="`${key}-1`" class="d-flex align-center pl-1" cols="1">
              <gear-stat-icon :stat="item" />
            </v-col>
            <v-col :key="`${key}-2`" class="text-right" cols="3">
              {{ equippedHero[item.value] }}
            </v-col>
            <v-col :key="`${key}-3`" class="text-right caption d-flex align-center justify-end" cols="2">
              <span v-if="key < 3">
                (+{{ Math.round(100 * (equippedHero[item.value] / equippedHero.hero[item.value] - 1)) }}%)
              </span>
              <span v-else>(+{{ equippedHero[item.value] - equippedHero.hero[item.value] }})</span>
            </v-col>
          </template>
          <v-col class="pl-1" cols="6">Damage: {{ equippedHero.damage }}</v-col>
          <v-col class="pl-1" cols="6">EHP: {{ equippedHero.ehp }}</v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-divider />
    <v-row class="pa-1" no-gutters>
      <v-col class="text-center">Score: {{ totalScore }} / Rating: {{ ratingScore }}</v-col>
    </v-row>
  </v-sheet>
</template>
<style lang="sass" scoped>
.size
  max-width: 340px
</style>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Constants, EquippedHero, Hero, HeroAbility, Suit } from '@/models';
import { GearSetIcon, GearStatIcon } from '..';
import { mapGetters } from 'vuex';
import { gearService, HeroService } from '@/services';

@Component({
  name: 'hero-detail-card',
  components: { GearSetIcon, GearStatIcon },
  computed: mapGetters(['getHero', 'getEquippedHero'])
})
export default class HeroDetailCard extends Vue {
  // vuex
  getEquippedHero!: (heroId: string) => EquippedHero | undefined;
  // prop
  @Prop({ required: false, default: undefined }) readonly heroId!: string | undefined;
  @Prop() readonly suit!: Suit;
  @Prop() readonly hero!: Hero;
  // @Prop({ required: false }) readonly equippedHero!: EquippedHero | undefined;
  // getter
  get stats() {
    return Constants.HERO_STATS;
  }
  // get hero(): Hero | undefined {
  //   if (this.heroId) {
  //     return this.getHero(this.heroId);
  //   }
  //   return undefined;
  // }
  get equippedHero(): EquippedHero | undefined {
    if (this.suit && this.hero) {
      return HeroService.equip(this.hero, this.suit);
    } else if (this.heroId) {
      return this.getEquippedHero(this.heroId);
    }
    return undefined;
  }
  get totalScore() {
    if (this.equippedHero) {
      return (
        Math.round(
          10 *
            ((this.equippedHero.suit.weapon?.score ?? 0) +
              (this.equippedHero.suit.helmet?.score ?? 0) +
              (this.equippedHero.suit.armor?.score ?? 0) +
              (this.equippedHero.suit.necklace?.score ?? 0) +
              (this.equippedHero.suit.ring?.score ?? 0) +
              (this.equippedHero.suit.boot?.score ?? 0))
        ) / 10
      );
    }
    return 0;
  }
  get ratingScore() {
    if (this.equippedHero) {
      return gearService.calculateSuitRating(this.equippedHero);
    }
    return 0;
  }
}
</script>
