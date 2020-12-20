<template>
  <v-card flat>
    <v-btn
      v-for="(item, i) in config.btns"
      :key="i"
      :class="{ 'mx-1 mb-2': true, 'disable-events': disabled(item) }"
      :color="color(item)"
      outlined
      rounded
      small
      width="55"
      @click="click($event, item)"
      >{{ item.stat.label }}</v-btn
    >
  </v-card>
</template>
<script lang="ts">
import { Gear } from '@/models';
import Stat = Gear.Stat;
import { Vue, Component, Prop, Emit, Model, Watch } from 'vue-property-decorator';

class StatBtnConfig {
  constructor(public readonly stat: Stat, public readonly main: boolean, public readonly sub: boolean) {}
}

@Component
export default class GearFormStatSelect extends Vue {
  name: string = 'gear-form-stat-select';
  @Prop() readonly enhance!: number;
  @Prop() readonly grade!: Gear.Grade;
  @Prop() readonly type!: Gear.Type;
  result = new Array<Stat | undefined>(5);
  size = 0;
  config = {
    maxSize: 0,
    singleMain: false,
    btns: Array<StatBtnConfig>()
  };

  readonly ALL_STATS = Object.values(Gear.Stat);
  readonly SELECTION_CONFIG = {
    // in the sequence of Object.values(Gear.Stat)
    // i.e. HPP, HP, DEFP, DEF, ATKP, ATK, CRI, CDMG, SPD, EFF, RES
    // 0 - none, 1 - sub only, 2 - main only, 3 - main + sub
    Weapon: [1, 1, 0, 0, 1, 2, 1, 1, 1, 1, 1],
    Helmet: [1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    Armor: [1, 1, 1, 2, 0, 0, 1, 1, 1, 1, 1],
    Necklace: [3, 3, 3, 3, 3, 3, 3, 3, 1, 1, 1],
    Ring: [3, 3, 3, 3, 3, 3, 1, 1, 1, 3, 3],
    Boot: [3, 3, 3, 3, 3, 3, 1, 1, 3, 1, 1]
  };

  @Watch('type', { immediate: true, deep: true })
  onTypeChanged(val: Gear.Type) {
    let foo = this.SELECTION_CONFIG[val];
    this.config.btns = [];
    let mains: StatBtnConfig[] = [];
    for (let i = 0; i < this.ALL_STATS.length; i++) {
      let config = {
        stat: this.ALL_STATS[i],
        main: (foo[i] & 2) > 0,
        sub: (foo[i] & 1) > 0
      };
      this.config.btns.push(config);
      if (config.main) {
        mains.push(config);
      }
    }
    this.config.singleMain = mains.length == 1;
    this.updateResult(0, this.config.singleMain ? mains[0].stat : null);
  }
  @Watch('grade', { immediate: true, deep: true })
  OnGradeChanged(val: Gear.Grade) {
    switch (val) {
      case Gear.Grade.EPIC:
        this.config.maxSize = 5;
        break;
      case Gear.Grade.HERO:
        this.config.maxSize = 4;
        break;
      case Gear.Grade.RARE:
        this.config.maxSize = 3;
        break;
      default:
        this.config.maxSize = 0;
    }
    for (let i = this.config.maxSize; i < 5; i++) {
      this.updateResult(i, null);
    }
  }

  disabled(config: StatBtnConfig) {
    // not a main / sub stat
    if (!config.main && !config.sub) {
      return true;
    } else if (this.config.singleMain && this.result[0] == config.stat) {
      return true;
    } else if (this.size == this.config.maxSize && this.result.indexOf(config.stat) < 0) {
      return true;
    }
    return false;
  }

  color(config: StatBtnConfig): string {
    if (this.result[0] == config.stat) {
      return 'primary';
    } else if (this.result.indexOf(config.stat) > 0) {
      return 'success';
    } else if (this.disabled(config)) {
      return 'secondary';
    }
    return '';
  }

  click($event: any, selected: StatBtnConfig) {
    var index = this.result.indexOf(selected.stat);
    if (index < 0) {
      for (let i = selected.main ? 0 : 1; i < this.config.maxSize; i++) {
        if (this.result[i] == null) {
          this.updateResult(i, selected.stat);
          break;
        }
      }
    } else {
      this.updateResult(index, null);
    }
  }

  updateResult(index: number, stat: Stat | null) {
    if (stat == null && this.result[index] != null) {
      this.size--;
    } else if (stat != null && this.result[index] == null) {
      this.size++;
    }
    Vue.set(this.result, index, stat);
    this.$emit('input', this.result);
  }
}
</script>
