<template>
  <v-row no-gutters>
    <v-col cols="12" sm="auto">
      <optimization-hero-sheet
        v-model="value.hero"
        :class="{ 'hero-sheet-size': $vuetify.breakpoint.smAndUp }"
        @change-hero="changeHero"
      />
    </v-col>
    <v-col cols="12" sm="auto">
      <optimization-stat-criteria-sheet
        v-model="value.stat"
        :class="{ 'stat-sheet-size': $vuetify.breakpoint.smAndUp }"
      />
    </v-col>
    <v-col cols="12" sm="auto">
      <optimization-filter-sheet v-model="value.filter" :class="{ 'filter-sheet-size': $vuetify.breakpoint.smAndUp }" />
    </v-col>
    <v-col cols="12" sm="auto">
      <optimization-evaluation-criteria-sheet
        v-model="value.evaluation"
        :class="{ 'eval-sheet-size': $vuetify.breakpoint.smAndUp }"
      />
    </v-col>
  </v-row>
</template>
<style lang="sass" scoped>
.hero-sheet-size
  max-width: 280px
.stat-sheet-size
  max-width: 340px
.filter-sheet-size
  max-width: 520px
.eval-sheet-size
  max-width: 200px
</style>
<script lang="ts">
import { Gear, OptimizationProfile } from '@/models';
import { mapGetters } from 'vuex';
import { Vue, Component, Model } from 'vue-property-decorator';
import OptimizationEvaluationCriteriaSheet from './OptimizationEvaluationCriteriaSheet.vue';
import OptimizationFilterSheet from './OptimizationFilterSheet.vue';
import OptimizationHeroSheet from './OptimizationHeroSheet.vue';
import OptimizationStatCriteriaSheet from './OptimizationStatCriteriaSheet.vue';

@Component({
  name: 'optimization-profiler',
  components: {
    OptimizationEvaluationCriteriaSheet,
    OptimizationFilterSheet,
    OptimizationHeroSheet,
    OptimizationStatCriteriaSheet
  },
  computed: { ...mapGetters(['heros']) }
})
export default class OptimizationProfiler extends Vue {
  @Model() readonly value!: OptimizationProfile;

  get sets() {
    return Object.values(Gear.Set);
  }

  changeHero() {
    if (this.value.hero.id) {
      this.$emit('change-hero', this.value.hero.id);
    }
  }
}
</script>
