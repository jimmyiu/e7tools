<template>
  <div>
    <v-img v-if="isImage" :max-height="18" :max-width="18" :src="require(`@/assets/img/stat/${imageName}.png`)" />
    <v-icon v-else-if="isIcon" size="18">{{ imageName }}</v-icon>
    <!-- <div v-else-if="isPercentImage">
      % -->
    <!-- <v-img :max-height="18" :max-width="18" :src="require(`@/assets/img/stat/${imageName}.png`)" /> -->
    <!-- <div class="font-weight-bold" style="font-size: 10px; margin-left: -4px; z-index: 100">%</div> -->
    <!-- <div class="d-flex align-end" style="margin-left: -30px">
        <v-icon color="red" size="10">mdi-percent-outline</v-icon>
      </div>-->
    <!-- </div> -->
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Gear } from '@/models';

const map = new Map<Gear.Stat, string>();
map.set(Gear.Stat.HPP, 'hp');
map.set(Gear.Stat.HP, 'hp');
map.set(Gear.Stat.DEFP, 'def');
map.set(Gear.Stat.DEF, 'def');
map.set(Gear.Stat.ATKP, 'atk');
map.set(Gear.Stat.ATK, 'atk');
map.set(Gear.Stat.CRI, 'cri');
map.set(Gear.Stat.CDMG, 'cdmg');
map.set(Gear.Stat.SPD, 'spd');
map.set(Gear.Stat.EFF, 'eff');
map.set(Gear.Stat.RES, 'res');

map.set(Gear.Stat.SCORE, 'mdi-alpha-s-box');
map.set(Gear.Stat.DEF_SCORE, 'mdi-alpha-d-box');
map.set(Gear.Stat.OFF_SCORE, 'mdi-alpha-a-box');
map.set(Gear.Stat.RATING, 'star-outline');

map.set(Gear.Stat.EHP, 'mdi-alpha-e-circle-outline');
map.set(Gear.Stat.DAMAGE, 'mdi-alpha-d-circle-outline');

@Component
export default class GearStatIcon extends Vue {
  name: string = 'gear-stat-icon';
  @Prop() readonly stat!: Gear.Stat;

  get isImage() {
    if (this.stat) {
      return this.$const.GearStat.PRIMITIVE.findIndex(x => x == this.stat) >= 0;
    }
    return false;
  }

  get isIcon() {
    if (this.stat) {
      return (
        [
          Gear.Stat.SCORE,
          Gear.Stat.OFF_SCORE,
          Gear.Stat.DEF_SCORE,
          Gear.Stat.RATING,
          Gear.Stat.EHP,
          Gear.Stat.DAMAGE
        ].findIndex(x => x == this.stat) >= 0
      );
    }
    return false;
  }

  get isPercentImage() {
    if (this.stat) {
      return [Gear.Stat.HPP, Gear.Stat.DEFP, Gear.Stat.ATKP].findIndex(x => x == this.stat) >= 0;
    }
    return false;
  }

  get imageName() {
    let result: string | undefined = undefined;
    if (this.stat) {
      result = map.get(this.stat);
    }
    return result ?? 'unknown';
  }
}
</script>
