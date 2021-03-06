<template>
  <title-sheet :class="{ 'card-size': $vuetify.breakpoint.smAndUp }" :reset="false" title="Statistic">
    <!-- Count: {{ gears.length }} ({{ basic.equippedCount }} / {{ gears.length - basic.equippedCount }})<br /> -->
    -- Equipped % --
    <v-row dense>
      <v-col v-for="(item, key) in basic.equippedPercent" :key="key" class="d-flex align-center body-2" cols="3">
        <gear-set-icon :set="item.set" />
        ({{ item.figure }}%)
      </v-col>
    </v-row>
    -- Max / Top 25% --
    <v-row dense>
      <v-col v-for="(item, key) in $const.GearStat.PRIMITIVE" :key="key" class="d-flex align-center body-2" cols="3">
        <gear-stat-icon :stat="item" />
        <div :class="{ 'hightlight-speed': item.value == 'spd' }">
          {{ statistics[item.value].max }}/{{ statistics[item.value].third }}
        </div>
      </v-col>
      <v-col
        v-for="(item, key) in $const.GearStat.SCORES"
        :key="`${key}-2`"
        class="d-flex align-center body-2"
        cols="3"
      >
        <gear-stat-icon :stat="item" />
        <div>{{ statistics[item.value].max }}/{{ statistics[item.value].third }}</div>
      </v-col>
    </v-row>
    -- Speed --
    <v-row dense>
      <v-col cols="12">Count: {{ speed.count }} ({{ speed.equippedCount }} / {{ speed.unequippedCount }})</v-col>
      <template v-for="(item, key) in speedLabel">
        <v-col :key="`${key}-1`" cols="3">{{ item.label }}:</v-col>
        <v-col :key="`${key}-2`" cols="2">{{ speed.distribution[item.key].count }}</v-col>
        <v-col :key="`${key}-3`" cols="4">
          ({{ speed.distribution[item.key].equippedCount }} + {{ speed.distribution[item.key].unequippedCount }})
        </v-col>
        <v-col :key="`${key}-4`" cols="3">
          {{ Math.round((100 * speed.distribution[item.key].equippedCount) / speed.distribution[item.key].count) }}%
        </v-col>
      </template>
    </v-row>
    <!-- <div v-for="(item, key) in Object.keys(statistics)" :key="key">
      {{ item }}: {{ statistics[item].max }} / {{ statistics[item].third }}
    </div> -->
    <!-- TODO (max speed suit) -->
  </title-sheet>
</template>
<style lang="sass" scoped>
.card-size
  max-width: 320px
  min-width: 240px
.hightlight-speed
  background-color: green
  border-radius: 4px
  padding: 0 2px
  margin-left: -2px
</style>
<script lang="ts">
import { Vue, Component, Prop, Emit, Model } from 'vue-property-decorator';
import { Gear } from '@/models';
import { GearStatIcon, GearSetIcon } from './common';
import TitleSheet from '../common/TitleSheet.vue';
import { gearService } from '@/services';
import { set } from 'vue/types/umd';

export type SetFigure = {
  set: Gear.Set;
  figure: number;
};

export type CountFigure = {
  count: number;
  equippedCount: number;
  unequippedCount: number;
};

export type BasicStatistics = {
  equippedCount: number;
  equippedPercent: Array<SetFigure>;
};

export type SpeedStatistics = CountFigure & {
  distribution: {
    first: CountFigure;
    second: CountFigure;
    third: CountFigure;
    last: CountFigure;
  };
};

@Component({
  name: 'gear-statistics-sheet',
  components: { TitleSheet, GearStatIcon, GearSetIcon }
})
export default class GearStatisticsFilter extends Vue {
  @Prop() gears!: Gear.Gear[];

  get basic(): BasicStatistics {
    const basic: BasicStatistics = {
      equippedCount: this.gears.filter(x => x.equippedHero != '').length,
      equippedPercent: []
    };
    Object.values(Gear.Set).forEach(x => {
      const foo = this.gears.filter(g => g.set == x);
      const equipped = foo.filter(g => g.equippedHero != '');
      if (foo.length > 0 && equipped.length > 0) {
        basic.equippedPercent.push({
          set: x,
          figure: Math.round((100 * equipped.length) / foo.length)
        });
        basic.equippedPercent.sort((a, b) => b.figure - a.figure);
      }
    });
    return basic;
  }

  toCountFigure(gears: Gear.Gear[]): CountFigure {
    const equippedCount = gears.filter(x => x.equippedHero != '').length;
    return {
      count: gears.length,
      equippedCount: equippedCount,
      unequippedCount: gears.length - equippedCount
    };
  }

  get speed(): SpeedStatistics {
    const speeds = this.gears.filter(g => g.main != Gear.Stat.SPD && g.spd != undefined && g.spd > 0);
    const first = speeds.filter(g => g.spd! >= 1 && g.spd! <= 9);
    const second = speeds.filter(g => g.spd! >= 10 && g.spd! <= 13);
    const third = speeds.filter(g => g.spd! >= 14 && g.spd! <= 16);
    const last = speeds.filter(g => g.spd! >= 17);
    return {
      ...this.toCountFigure(speeds),
      distribution: {
        first: this.toCountFigure(first),
        second: this.toCountFigure(second),
        third: this.toCountFigure(third),
        last: this.toCountFigure(last)
      }
    };
  }

  readonly speedLabel = [
    {
      key: 'last',
      label: '17+'
    },
    {
      key: 'third',
      label: '14-16'
    },
    {
      key: 'second',
      label: '10-13'
    },
    {
      key: 'first',
      label: '1-9'
    }
  ];

  get statistics() {
    return gearService.calculateStatistics(this.gears);
  }
}
</script>
