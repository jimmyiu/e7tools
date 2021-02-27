<template>
  <v-sheet class="py-1" elevation="6" min-width="160px" outlined rounded width="170px">
    <div v-if="gear && gear.id">
      <v-row class="px-2" no-gutters>
        <v-col class="d-flex align-center" cols="6">
          <gear-type-icon style="padding-bottom: 1px" :type="gear.type" />
          <gear-set-icon :set="gear.set" />
          <div :style="'color: ' + gear.grade.color">{{ gear.level }}</div>
          <div class="caption">+{{ gear.enhance }}</div>
        </v-col>
        <v-col class="d-flex align-center justify-end" cols="6">
          <v-img v-if="equippedHero" :alt="equippedHero.id" max-width="28" :src="equippedHero.icon" />
        </v-col>
      </v-row>
      <v-divider class="my-1" />
      <v-row class="pl-8 pr-1" no-gutters>
        <v-col align-self="center" cols="2"><gear-stat-icon class="ml-0" :stat="gear.main"/></v-col>
        <v-col class="text-right pr-1" cols="7">{{ gear[gear.main.value] }}</v-col>
        <v-col class="d-flex align-center caption" cols="3">
          <div v-if="showPercent(gear.main) && refHero">
            ({{ Math.round((100 * gear[gear.main.value]) / refHero[gear.main.value]) }}%)
          </div>
        </v-col>
      </v-row>
      <v-divider class="my-1" />
      <!-- <v-row dense>
        <v-col cols="2">
          <gear-stat-icon class="ml-0" :stat="gear.main" style="margin-top: 2px" />
        </v-col>
        <v-col class="d-flex justify-end align-center pr-0 body-2" cols="4">
          {{ gear[gear.main.value] }}
          <span v-if="showPercent(gear.main) && refHero" class="caption">
            ({{ Math.round((100 * gear[gear.main.value]) / refHero[gear.main.value]) }}%)
          </span>
        </v-col>
        <v-col class="d-flex justify-center align-center" cols="2">
          <v-icon size="20">mdi-alpha-s-circle-outline</v-icon>
        </v-col>
        <v-col class="d-flex justify-end align-center pr-2 body-2" cols="4">
          {{ scores.score }}
        </v-col>
      </v-row>
      <v-divider /> -->
      <v-row class="pl-8 pr-2" no-gutters>
        <template v-for="(item, i) in gear.getSubs()">
          <v-col :key="`${i}_1`" align-self="center" cols="2">
            <gear-stat-icon :stat="item[0]" />
          </v-col>
          <v-col :key="`${i}_2`" class="text-right pr-1" cols="7">
            {{ item[1] }}<span v-if="item[0].percent">%</span>
          </v-col>
          <v-col :key="i" class="d-flex justify-space-between align-center" cols="3">
            <div>
              <span v-if="showPercent(item[0]) && refHero" class="caption">
                ({{ Math.round((100 * gear[item[0].value]) / refHero[item[0].value]) }}%)
              </span>
            </div>
          </v-col>
        </template>
      </v-row>
      <v-divider />
      <v-row dense>
        <v-col>
          <div class="pa-1 text-center">{{ scores.score }} / {{ scores.offScore }} / {{ scores.defScore }}</div>
        </v-col>
        <!-- <v-col class="text-right" cols="2">
            <v-icon size="20">mdi-checkbox-blank-circle-outline</v-icon>
          </v-col> -->
      </v-row>
    </div>
    <div v-else>TODO: EMPTY</div>
  </v-sheet>
</template>
<style lang="sass" scoped>
.set
  margin-top: -2px
</style>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { GearSetIcon, GearStatIcon, GearTypeIcon } from './common';
import { Gear, Hero } from '@/models';
import { mapGetters } from 'vuex';
import { gearService } from '@/services';

@Component({
  name: 'gear-card2',
  components: { GearSetIcon, GearTypeIcon, GearStatIcon },
  computed: mapGetters(['getHero'])
})
export default class GearCard2 extends Vue {
  // vuex
  getHero!: (heroId: string) => Hero | undefined;
  //
  @Prop() readonly gear!: Gear.Gear;
  @Prop() readonly refHeroId!: string;
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
}
</script>
