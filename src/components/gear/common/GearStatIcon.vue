<template>
  <div>
    <v-img :max-height="18" :max-width="18" :src="require(`@/assets/img/stat/${imageName}.png`)" />
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

@Component
export default class GearStatIcon extends Vue {
  name: string = 'gear-stat-icon';
  @Prop() readonly stat!: Gear.Stat;

  // @Prop({ type: Boolean, default: false }) readonly small!: Boolean;

  // get width(): number {
  //   return this.small ? 26 : 44;
  // }

  get imageName() {
    let result: string | undefined = undefined;
    if (this.stat) {
      result = map.get(this.stat);
    }
    return result ?? 'unknown';
  }
}
</script>
