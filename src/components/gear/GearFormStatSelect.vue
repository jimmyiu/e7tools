<template>
  <v-card class="text-center" flat>
    <v-btn
      v-for="(item, i) in btns"
      :key="i"
      :class="{ 'mx-1 mt-2': true, 'disable-events': disabled(item) }"
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
  constructor(public readonly stat: Stat, public main: boolean, public sub: boolean) {}
}

@Component({
  name: 'gear-form-stat-select'
})
export default class GearFormStatSelect extends Vue {
  readonly SELECTION_CONFIG = {
    // in the sequence of this.$const.GearStat.PRIMITIVE
    // i.e. HPP, HP, DEFP, DEF, ATKP, ATK, CRI, CDMG, SPD, EFF, RES
    // 0 - none, 1 - sub only, 2 - main only, 3 - main + sub
    Weapon: [1, 1, 0, 0, 1, 2, 1, 1, 1, 1, 1],
    Helmet: [1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    Armor: [1, 1, 1, 2, 0, 0, 1, 1, 1, 1, 1],
    Necklace: [3, 3, 3, 3, 3, 3, 3, 3, 1, 1, 1],
    Ring: [3, 3, 3, 3, 3, 3, 1, 1, 1, 3, 3],
    Boot: [3, 3, 3, 3, 3, 3, 1, 1, 3, 1, 1]
  };
  @Prop() readonly type!: Gear.Type | undefined;
  @Prop() readonly value!: Gear.StatInput[];
  btns = Array<StatBtnConfig>();

  get selectedSize(): number {
    return this.value.filter(x => x.stat != undefined).length;
  }

  get isSingleMain(): boolean {
    return this.btns.filter(x => x.main).length == 1;
  }

  get emptySubStatIndex(): number {
    const index = this.value.slice(1, this.value.length).findIndex(x => x.stat == undefined);
    return index < 0 ? index : index + 1;
  }

  isMain(config: StatBtnConfig): boolean {
    return config.main && this.value[0].stat == config.stat;
  }

  isSub(config: StatBtnConfig): boolean {
    return config.sub && this.value.findIndex(x => x.stat == config.stat) > 0;
  }

  created() {
    console.log('created::value=', this.value);
    for (let i = 0; i < this.$const.GearStat.PRIMITIVE.length; i++) {
      this.btns.push(new StatBtnConfig(this.$const.GearStat.PRIMITIVE[i], true, true));
    }
    this.onTypeChanged(this.type);
  }

  @Watch('type', { immediate: false, deep: true })
  onTypeChanged(type?: Gear.Type) {
    console.log('onTypeChanged::start, type =', type);
    if (type == undefined) {
      for (let i = 0; i < this.$const.GearStat.PRIMITIVE.length; i++) {
        this.btns[i].main = this.btns[i].sub = false;
      }
      return;
    }
    let typeConfig = this.SELECTION_CONFIG[type];
    for (let i = 0; i < this.$const.GearStat.PRIMITIVE.length; i++) {
      this.btns[i].main = (typeConfig[i] & 2) > 0;
      this.btns[i].sub = (typeConfig[i] & 1) > 0;
    }
    console.log('onTypeChanged::isSingleMain=', this.isSingleMain);

    let result = Array<Gear.StatInput>();
    // handle main stat change
    if (this.isSingleMain) {
      const mainStat = this.btns.find(x => x.main)!.stat;
      if (mainStat != this.value[0].stat) {
        result.push({ stat: mainStat, value: 0 });
      } else {
        result.push(this.value[0]);
      }
    } else if (this.value[0].stat != undefined && this.btns.find(x => x.stat == this.value[0].stat)?.main) {
      result.push(this.value[0]);
    } else {
      result.push({ stat: undefined, value: 0 });
    }
    // handle sub stat change
    for (let i = 1; i < this.value.length; i++) {
      if (this.value[i].stat != undefined && this.btns.find(x => x.stat == this.value[i].stat)?.sub) {
        result.push(this.value[i]);
      }
    }
    while (result.length < this.value.length) {
      result.push({ stat: undefined, value: 0 });
    }
    // emit result
    this.$nextTick(function() {
      console.log('onTypeChanged::emit input event');
      this.$emit('input', result);
    });
  }

  disabled(config: StatBtnConfig) {
    if (!config.main && !config.sub) {
      return true;
    } else if (this.isSingleMain && this.isMain(config)) {
      return true;
    } else if (this.selectedSize == this.value.length && !this.isMain(config) && !this.isSub(config)) {
      return true;
    } else if (this.isMain(config) || this.isSub(config)) {
      return false;
    } else if (config.sub && !config.main && this.emptySubStatIndex == -1) {
      // sub-only stat but all sub selected
      return true;
    }
    return false;
  }

  color(config: StatBtnConfig): string {
    if (this.isMain(config)) {
      return 'primary';
    } else if (this.isSub(config)) {
      return 'success';
    } else if (this.disabled(config)) {
      return 'secondary';
    }
    return '';
  }

  click($event: any, selected: StatBtnConfig) {
    console.log('click::selected=', selected);
    // skip 1st item if not a main stat
    const index = this.value.findIndex(x => x.stat == selected.stat);
    console.log('click::index =', index);
    if (index < 0) {
      let target = this.value.findIndex(x => x.stat == undefined);
      // handle main is not selected, but selected one is sub-only
      if (target == 0 && !selected.main) {
        target = this.emptySubStatIndex;
      }
      console.log('click::target =', target);
      if (target >= 0 && target < this.value.length) {
        this.updateResult(target, selected.stat);
      }
    } else {
      this.updateResult(index, undefined);
    }
  }

  @Emit('input')
  updateResult(index: number, stat: Stat | undefined) {
    console.log('updateResult::index =', index, ', stat =', stat);
    let result = [...this.value];
    result[index].stat = stat;
    console.log('updateResult::result=', result);
    return result;
  }
}
</script>
