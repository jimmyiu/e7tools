<template>
  <v-sheet class="pa-1 d-flex align-center" outlined rounded>
    <v-icon class="drag mr-1">mdi-drag-vertical</v-icon>
    <v-img class="mr-2" max-width="36" min-width="36" :src="equippedHero.hero.icon"></v-img>
    <v-row no-gutters style="max-width: 180px">
      <v-col class="d-flex align-center" cols="6">
        <gear-stat-icon class="mr-2" stat="ehp" /> {{ equippedHero.ehp }}
      </v-col>
      <v-col class="d-flex align-center" cols="6">
        <gear-stat-icon class="mr-2" stat="damage" /> {{ equippedHero.damage }}
      </v-col>
      <v-col class="d-flex align-center" cols="6"><gear-stat-icon class="mr-2" stat="score" /> {{ score }}</v-col>
      <v-col class="d-flex align-center" cols="6"></v-col>
    </v-row>
    <div class="d-flex flex-grow-1 justify-end">
      <v-btn icon @click="editHero"><v-icon>mdi-account-details-outline</v-icon></v-btn>
      <v-btn icon @click="optimizeHero"><v-icon>mdi-cog-outline</v-icon></v-btn>
    </div>
  </v-sheet>
</template>
<style lang="sass" scoped>
.size
  max-width: 340px
</style>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Constants, EquippedHero, Gear, Hero, HeroAbility, SiteState, Suit } from '@/models';
import { GearSetIcon, GearStatIcon } from '..';
import { mapActions, mapGetters } from 'vuex';
import { gearService, HeroService } from '@/services';
import { Dictionary } from 'vue-router/types/router';

@Component({
  name: 'hero-overview-card',
  components: { GearSetIcon, GearStatIcon },
  computed: mapGetters(['getHero', 'getEquippedHero']),
  methods: mapActions(['updateState'])
})
export default class HeroSmallCard extends Vue {
  // vuex
  getEquippedHero!: (heroId: string) => EquippedHero | undefined;
  updateState!: (siteState: Partial<SiteState>) => void;
  // prop
  @Prop({ required: false, default: undefined }) readonly heroId!: string | undefined;
  // @Prop() readonly suit!: Suit;
  // @Prop() readonly hero!: Hero;
  // @Prop({ required: false }) readonly equippedHero!: EquippedHero | undefined;
  // getter
  // get stats() {
  //   return [...this.$const.GearStat.HERO_PRIMITIVE, Gear.Stat.DAMAGE, Gear.Stat.EHP];
  // }
  get equippedHero(): EquippedHero | undefined {
    // if (this.suit && this.hero) {
    //   return HeroService.equip(this.hero, this.suit);
    if (this.heroId) {
      return this.getEquippedHero(this.heroId);
    }
    return undefined;
  }
  get score() {
    return gearService.calculateSubsScore(this.equippedHero);
  }
  // get ratingScore() {
  //   if (this.equippedHero) {
  //     return Math.round(gearService.calculateSuitRating(this.equippedHero));
  //   }
  //   return 0;
  // }

  editHero() {
    console.log(this.heroId);
    if (this.heroId) {
      this.$router.push({ name: 'hero-detail', params: { heroId: this.heroId } });
    }
  }

  optimizeHero() {
    // console.log(this.heroId);
    this.updateState({ lastSelectedHeroId: this.heroId });
    this.$router.push({ name: 'optimizer' });
  }
}
</script>
