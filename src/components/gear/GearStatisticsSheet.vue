<template>
  <title-sheet :class="{ 'card-size': $vuetify.breakpoint.smAndUp }" title="Statistic" @reset="reset">
    Total: {{ gears.length }}<br />
    TODO (max speed suit)
    <div v-for="(item, key) in Object.keys(statistics)" :key="key">
      <!-- <gear-stat-icon :stat="item" /> -->
      {{ item }}: {{ statistics[item].max }} / {{ statistics[item].third }}
    </div>
  </title-sheet>
</template>
<style lang="sass" scoped>
.card-size
  max-width: 328px
  min-width: 328px
</style>
<script lang="ts">
import { Vue, Component, Prop, Emit, Model } from 'vue-property-decorator';
import { Gear } from '@/models';
import { GearStatIcon } from './common';
import TitleSheet from '../common/TitleSheet.vue';
import { gearService } from '@/services';

@Component({
  name: 'gear-statistics-sheet',
  components: { TitleSheet, GearStatIcon }
})
export default class GearStatisticsFilter extends Vue {
  @Prop() gears!: Gear.Gear[];

  get statistics() {
    return gearService.calculateStatistics(this.gears);
  }

  reset() {
    console.log('reset');
  }
}
</script>
