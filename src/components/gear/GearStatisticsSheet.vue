<template>
  <title-sheet :class="{ 'card-size': $vuetify.breakpoint.smAndUp }" title="Statistic" @reset="reset">
    Total: {{ gears.length }}<br />
    TODO (max speed suit)
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
import TitleSheet from '../common/TitleSheet.vue';

@Component({
  name: 'gear-statistics-sheet',
  components: { TitleSheet }
})
export default class GearStatisticsFilter extends Vue {
  @Prop() gears!: Gear.Gear[];
  reset() {
    console.log('reset');
  }
}
</script>
