<template>
  <!-- <v-sheet class="pa-2 d-flex align-center" outlined rounded> -->
  <v-img class="mr-2" max-width="32" :src="hero.icon"></v-img>
  <!-- <v-btn icon><v-icon small>edit</v-icon></v-btn>
    <v-btn icon small><v-icon small>mdi-cog-outline</v-icon></v-btn> -->
  <!-- {{ hero }} -->
  <!-- </v-sheet> -->
</template>
<style lang="sass" scoped>
.size
  max-width: 340px
</style>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Constants, EquippedHero, Gear, Hero, HeroAbility, Suit } from '@/models';
import { GearSetIcon, GearStatIcon } from '..';
import { mapGetters } from 'vuex';
import { gearService, HeroService } from '@/services';

@Component({
  name: 'hero-small-card',
  components: { GearSetIcon, GearStatIcon },
  computed: mapGetters(['getHero', 'getEquippedHero'])
})
export default class HeroSmallCard extends Vue {
  // vuex
  getEquippedHero!: (heroId: string) => EquippedHero | undefined;
  // prop
  @Prop({ required: false, default: undefined }) readonly heroId!: string | undefined;
  @Prop() readonly suit!: Suit;
  @Prop() readonly hero!: Hero;
  // @Prop({ required: false }) readonly equippedHero!: EquippedHero | undefined;
  // getter
  // get stats() {
  //   return [...this.$const.GearStat.HERO_PRIMITIVE, Gear.Stat.DAMAGE, Gear.Stat.EHP];
  // }
  // get equippedHero(): EquippedHero | undefined {
  //   if (this.suit && this.hero) {
  //     return HeroService.equip(this.hero, this.suit);
  //   } else if (this.heroId) {
  //     return this.getEquippedHero(this.heroId);
  //   }
  //   return undefined;
  // }
  // get totalScore() {
  //   if (this.equippedHero) {
  //     return Math.round(
  //       (this.equippedHero.suit.weapon?.score ?? 0) +
  //         (this.equippedHero.suit.helmet?.score ?? 0) +
  //         (this.equippedHero.suit.armor?.score ?? 0) +
  //         (this.equippedHero.suit.necklace?.score ?? 0) +
  //         (this.equippedHero.suit.ring?.score ?? 0) +
  //         (this.equippedHero.suit.boot?.score ?? 0)
  //     );
  //   }
  //   return 0;
  // }
  // get ratingScore() {
  //   if (this.equippedHero) {
  //     return Math.round(gearService.calculateSuitRating(this.equippedHero));
  //   }
  //   return 0;
  // }
}
</script>
