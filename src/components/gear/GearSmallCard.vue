<template>
  <v-sheet
    class="pt-1"
    :class="{ selectable: selectable, 'blue-grey darken-4': selected }"
    max-width="106"
    min-width="106"
    outlined
    rounded
    style="display: inline-block"
    @click="click"
  >
    <div v-if="gear && gear.id">
      <v-row class="px-2" no-gutters>
        <v-col class="d-flex align-center" cols="12">
          <div class="" :class="gear.grade.color" style="border-radius: 4px">
            <gear-type-icon style="padding-bottom: 1px" :type="gear.type" />
          </div>
          <gear-set-icon :set="gear.set" />
          {{ gear.level }}
          <div class="caption">+{{ gear.enhance }}</div>
        </v-col>
      </v-row>
      <v-divider />
      <v-row class="px-2" no-gutters>
        <v-col class="d-flex align-center" cols="12">
          <gear-stat-icon :stat="gear.main" />
          <div class="px-1 d-flex align-center" :class="{ 'highlight-1': isHighlight1(gear.main.value) }">
            {{ gear[gear.main.value] }}
            <span v-if="gear.main.percent">%</span>
            <span v-else-if="showPercent(gear.main) && refHero" class="caption ml-1">
              ({{ Math.round((100 * gear[gear.main.value]) / refHero[gear.main.value]) }}%)
            </span>
          </div>
        </v-col>
      </v-row>
      <v-divider />
      <v-row class="px-2" no-gutters>
        <template v-for="(item, i) in gear.getSubs()">
          <v-col :key="`${i}_1`" class="d-flex align-center" cols="12">
            <gear-stat-icon :stat="item[0]" />
            <div class="px-1 d-flex align-center" :class="{ 'highlight-1': isHighlight1(item[0].value) }">
              {{ item[1] }}<span v-if="item[0].percent">%</span>
              <span v-if="showPercent(item[0]) && refHero" class="caption ml-1"
                >({{ Math.round((100 * gear[item[0].value]) / refHero[item[0].value]) }}%)</span
              >
            </div>
            <div v-if="gear.getSubs().size == i + 1" class="d-flex justify-end" style="width: 100%">
              <v-img v-if="equippedHero" max-width="26" :src="equippedHero.icon" style="margin-top: -12px" />
            </div>
          </v-col>
        </template>
        <!-- <v-col class="d-flex justify-end" cols="9">
          
        </v-col> -->
        <!-- <v-col class="d-flex align-center justify-end" cols="3">
          <v-img v-if="equippedHero" :alt="equippedHero.id" max-width="24" :src="equippedHero.icon" />
        </v-col> -->
      </v-row>
    </div>
    <div v-else>TODO: EMPTY</div>
  </v-sheet>
</template>
<style lang="sass" scoped>
.selectable
  cursor: pointer
.selected
  background-color: grey
.highlight-1
  background-color: green
  border-radius: 4px
</style>
<script lang="ts">
import { Vue, Component, Prop, Model } from 'vue-property-decorator';
import { GearSetIcon, GearStatIcon, GearTypeIcon } from './common';
import { Gear, Hero } from '@/models';
import { mapGetters } from 'vuex';
import { gearService } from '@/services';

@Component({
  name: 'gear-small-card',
  components: { GearSetIcon, GearTypeIcon, GearStatIcon },
  computed: mapGetters(['getHero'])
})
export default class GearSmallCard extends Vue {
  // vuex
  getHero!: (heroId: string) => Hero | undefined;
  //
  @Prop() readonly gear!: Gear.Gear;
  @Prop() readonly refHeroId!: string;
  @Prop() readonly highlight1!: string | undefined;
  @Prop({ type: Boolean, default: false }) readonly selectable!: boolean;
  @Prop({ type: Boolean, required: false, default: false }) readonly selected!: boolean;

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

  click() {
    if (this.selectable) {
      this.$emit('click', this.gear);
      this.$emit('select', true);
    }
  }
}
</script>
