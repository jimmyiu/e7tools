<template>
  <v-sheet v-if="equippedHero" :class="{ size: $vuetify.breakpoint.smAndUp }" elevation="0" outlined rounded>
    <v-row class="pa-1" no-gutters>
      <v-col cols="auto">
        <div>
          <v-img :src="equippedHero.hero.icon" width="48"></v-img>
        </div>
        <div class="d-flex flex-wrap" style="width: 52px">
          <gear-set-icon v-for="(set, key) in equippedHero.suit.sets" :key="key" :set="set" />
        </div>
        <!-- <div class="d-flex align-center justify-space-between">
          <gear-stat-icon stat="score" />
          <div>{{ totalScore }}</div>
        </div>
        <div class="d-flex align-center justify-space-between"><gear-stat-icon stat="rating" /> {{ ratingScore }}</div> -->
      </v-col>
      <v-divider class="mx-1" vertical />
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
              <span v-else-if="key < 8">(+{{ equippedHero[item.value] - equippedHero.hero[item.value] }})</span>
            </v-col>
          </template>
          <v-col class="d-flex align-center pl-1" cols="1">
            <gear-stat-icon stat="score" />
          </v-col>
          <v-col class="text-right" cols="3">
            {{ totalScore }}
          </v-col>
          <v-col cols="2"></v-col>
          <v-col class="d-flex align-center pl-1" cols="1">
            <gear-stat-icon stat="rating" />
          </v-col>
          <v-col class="text-right" cols="3">
            {{ ratingScore }}
          </v-col>
          <v-col cols="2"></v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-sheet>
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
    return [...this.$const.GearStat.HERO_PRIMITIVE, Gear.Stat.DAMAGE, Gear.Stat.EHP];
  }
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
      return Math.round(
        (this.equippedHero.suit.weapon?.score ?? 0) +
          (this.equippedHero.suit.helmet?.score ?? 0) +
          (this.equippedHero.suit.armor?.score ?? 0) +
          (this.equippedHero.suit.necklace?.score ?? 0) +
          (this.equippedHero.suit.ring?.score ?? 0) +
          (this.equippedHero.suit.boot?.score ?? 0)
      );
    }
    return 0;
  }
  get ratingScore() {
    if (this.equippedHero) {
      return Math.round(gearService.calculateSuitRating(this.equippedHero));
    }
    return 0;
  }
}
</script>
