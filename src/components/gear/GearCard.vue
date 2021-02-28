<template>
  <v-sheet class="py-1" elevation="6" min-width="351" outlined rounded>
    <div v-if="gear && gear.id">
      <v-row class="px-2" no-gutters>
        <v-col class="d-flex align-center" cols="4">
          <gear-type-icon style="padding-bottom: 1px" :type="gear.type" />
          <gear-set-icon :set="gear.set" />
          <div :style="'color: ' + gear.grade.color">{{ gear.level }}</div>
          <div class="caption">+{{ gear.enhance }}</div>
        </v-col>
        <v-col class="d-flex align-center" cols="4">
          <gear-stat-icon class="mr-1" :stat="gear.main" />
          <div class="px-1 d-flex align-center" :class="{ 'highlight-1': isHighlight1(gear.main.value) }">
            {{ gear[gear.main.value] }}
            <span v-if="gear.main.percent">%</span>
            <span v-else-if="showPercent(gear.main) && refHero" class="caption ml-1">
              ({{ Math.round((100 * gear[gear.main.value]) / refHero[gear.main.value]) }}%)
            </span>
          </div>
        </v-col>
        <v-col class="d-flex align-center" cols="3">
          <v-icon size="18">mdi-alpha-s-box</v-icon>
          <div class="px-1" :class="{ 'highlight-1': isHighlight1('score') }">
            {{ scores.score }}
          </div>
        </v-col>
        <v-col class="d-flex align-center justify-end" cols="1">
          <v-img v-if="equippedHero" :alt="equippedHero.id" max-width="28" :src="equippedHero.icon" />
        </v-col>
      </v-row>
      <v-divider class="my-1" />
      <v-row class="px-2" no-gutters>
        <template v-for="(item, i) in gear.getSubs()">
          <v-col :key="`${i}_1`" class="d-flex align-center" cols="4">
            <gear-stat-icon :stat="item[0]" />
            <div class="px-1 d-flex align-center" :class="{ 'highlight-1': isHighlight1(item[0].value) }">
              {{ item[1] }}<span v-if="item[0].percent">%</span>
              <span v-if="showPercent(item[0]) && refHero" class="caption ml-1"
                >({{ Math.round((100 * gear[item[0].value]) / refHero[item[0].value]) }}%)</span
              >
            </div>
          </v-col>
        </template>
        <v-col class="d-flex align-center" cols="4">
          <v-icon size="18">mdi-alpha-a-box</v-icon>
          <div class="px-1" :class="{ 'highlight-1': isHighlight1('offScore') }">
            {{ scores.offScore }}
          </div>
        </v-col>
        <v-col class="d-flex align-center" cols="4">
          <v-icon size="18">mdi-alpha-d-box</v-icon>
          <div class="px-1" :class="{ 'highlight-1': isHighlight1('defScore') }">
            {{ scores.defScore }}
          </div>
        </v-col>
      </v-row>
      <!-- <v-divider />
      <v-row dense>
        <v-col>
          <div class="pa-1 text-center">{{ scores.score }} / {{ scores.offScore }} / {{ scores.defScore }}</div>
        </v-col>
        <v-col class="text-right" cols="2">
            <v-icon size="20">mdi-checkbox-blank-circle-outline</v-icon>
          </v-col>
      </v-row> -->
    </div>
    <div v-else>TODO: EMPTY</div>
  </v-sheet>
</template>
<style lang="sass" scoped>
.highlight-1
  background-color: green
  border-radius: 4px
</style>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { GearSetIcon, GearStatIcon, GearTypeIcon } from './common';
import { Gear, Hero } from '@/models';
import { mapGetters } from 'vuex';
import { gearService } from '@/services';

@Component({
  name: 'gear-card',
  components: { GearSetIcon, GearTypeIcon, GearStatIcon },
  computed: mapGetters(['getHero'])
})
export default class GearCard extends Vue {
  // vuex
  getHero!: (heroId: string) => Hero | undefined;
  //
  @Prop() readonly gear!: Gear.Gear;
  @Prop() readonly refHeroId!: string;
  @Prop() readonly highlight1!: string | undefined;
  // getter
  get refHero(): Hero | undefined {
    if (this.refHeroId) {
      return this.getHero(this.refHeroId);
    } else if (this.gear.equippedHero) {
      return this.getHero(this.gear.equippedHero);
    }
    return undefined;
  }
  get equippedHero(): Hero | undefined {
    if (this.gear.equippedHero) {
      return this.getHero(this.gear.equippedHero);
    }
    return undefined;
  }
  get stats() {
    return Object.values(Gear.Stat);
  }

  // get subs() {
  //   return this.gear.getSubs();
  // }
  // get width() {
  //   return '170';
  // }

  get scores(): Gear.GearScore {
    if (this.refHero && this.gear) {
      return gearService.calculateScores(this.refHero, this.gear);
    } else if (this.equippedHero && this.gear) {
      return gearService.calculateScores(this.equippedHero, this.gear);
    }
    return this.gear;
  }

  showPercent(stat: Gear.Stat) {
    return stat.value == Gear.Stat.HP.value || stat.value == Gear.Stat.DEF.value || stat.value == Gear.Stat.ATK.value;
  }

  isHighlight1(value: string) {
    return this.highlight1 == value;
  }
}
</script>
