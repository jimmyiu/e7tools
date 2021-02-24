<template>
  <v-card elevation="6" min-width="160px" outlined width="180px">
    <div v-if="gear && gear.id">
      <v-card-text class="pa-0">
        <v-row dense>
          <v-col class="d-flex pl-2 align-center">
            <gear-type-icon style="padding-bottom: 1px" :type="gear.type" />
            <gear-set-icon :set="gear.set" />
            <div>
              <span :style="'color: ' + gear.grade.color">{{ gear.level }}</span>
              <span class="caption">+{{ gear.enhance }}</span>
            </div>
          </v-col>
          <v-col class="pa-2" cols="auto" style="height: 44px">
            <v-img v-if="equippedHero" :alt="equippedHero.id" :src="equippedHero.icon" width="28" />
          </v-col>
        </v-row>
        <v-divider />
        <v-row>
          <v-col>
            <div class="pa-1 text-center">
              <span>{{ gear.main.label }}: {{ gear[gear.main.value] }}</span>
              <span v-if="showPercent(gear.main) && refHero" class="caption">
                ({{ Math.round((100 * gear[gear.main.value]) / refHero[gear.main.value]) }}%)
              </span>
            </div>
          </v-col>
        </v-row>
        <v-divider class="mb-1" />
        <v-row class="pl-1" no-gutters>
          <template v-for="(item, i) in gear.getSubs()">
            <v-col :key="2 * i" class="d-flex align-center mb-1" cols="3">
              <gear-stat-icon :stat="item[0]" />
            </v-col>
            <v-col :key="2 * i + 1" class="pr-2 d-flex align-center justify-end mb-1" cols="3">
              {{ item[1] }}
              <span v-if="item[0].percent">%</span>
              <span v-else-if="showPercent(item[0]) && refHero" class="caption">
                ({{ Math.round((100 * gear[item[0].value]) / refHero[item[0].value]) }}%)
              </span>
            </v-col>
          </template>
        </v-row>
        <v-divider />
        <v-row dense>
          <v-col>
            <div class="pa-1 text-center">{{ scores.score }} / {{ scores.offScore }} / {{ scores.defScore }}</div>
          </v-col>
        </v-row>
      </v-card-text>
    </div>
    <div v-else>TODO: EMPTY</div>
  </v-card>
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
  name: 'gear-detail-card',
  components: { GearSetIcon, GearTypeIcon, GearStatIcon },
  computed: mapGetters(['getHero'])
})
export default class GearDetailCard extends Vue {
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
      this.getHero(this.gear.equippedHero);
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
