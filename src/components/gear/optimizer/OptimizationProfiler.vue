<template>
  <v-card>
    <v-row no-gutters>
      <v-col cols="12" sm="auto">
        <optimization-hero-sheet
          v-model="form.hero"
          :class="{ 'hero-sheet-size': $vuetify.breakpoint.smAndUp }"
          @change-hero="changeHero"
        />
      </v-col>
      <v-col cols="12" sm="auto">
        <optimization-stat-criteria-sheet
          v-model="form.profile.stat"
          :class="{ 'stat-sheet-size': $vuetify.breakpoint.smAndUp }"
        />
      </v-col>
      <v-col cols="12" sm="auto">
        <optimization-filter-sheet
          v-model="form.profile.filter"
          :class="{ 'filter-sheet-size': $vuetify.breakpoint.smAndUp }"
        />
      </v-col>
      <v-col cols="12" sm="auto">
        <optimization-evaluation-criteria-sheet
          v-model="form.profile.evaluation"
          :class="{ 'eval-sheet-size': $vuetify.breakpoint.smAndUp }"
        />
      </v-col>
    </v-row>
    <v-divider />
    <v-card-actions>
      <v-btn class="font-weight-bold" color="primary" text @click="optimize">Optimize</v-btn>
      <v-btn text @click="clear">Clear</v-btn>
      <v-divider class="mx-2" vertical />
      <v-btn class="font-weight-bold" color="success" text @click="saveProfile">Save</v-btn>
      <v-btn text @click="resetForm(form.hero.id)">Load</v-btn>
      <!-- <v-divider class="mx-2" vertical /> -->
    </v-card-actions>
    <v-snackbar v-if="popupMsg" v-model="popupMsg" bottom color="success" outlined timeout="1500">
      <div v-if="popupMsg == 1" class="text-center">Profile saved</div>
    </v-snackbar>
  </v-card>
</template>
<style lang="sass" scoped>
.hero-sheet-size
  max-width: 300px
.stat-sheet-size
  max-width: 340px
.filter-sheet-size
  max-width: 240px
.eval-sheet-size
  max-width: 240px
</style>
<script lang="ts">
import { mapActions, mapGetters } from 'vuex';
import { Vue, Component, Model, Prop } from 'vue-property-decorator';
import OptimizationEvaluationCriteriaSheet from './OptimizationEvaluationCriteriaSheet.vue';
import OptimizationFilterSheet from './OptimizationFilterSheet.vue';
import OptimizationHeroSheet from './OptimizationHeroSheet.vue';
import OptimizationStatCriteriaSheet from './OptimizationStatCriteriaSheet.vue';
import { OptimizationForm, OptimizationProfile } from '@/models/optimizer';
import { Hero, SiteState } from '@/models';
import { ConstantService, ObjectUtils } from '@/services';

@Component({
  name: 'optimization-profiler',
  components: {
    OptimizationEvaluationCriteriaSheet,
    OptimizationFilterSheet,
    OptimizationHeroSheet,
    OptimizationStatCriteriaSheet
  },
  computed: {
    ...mapGetters(['siteState', 'getProfile', 'getHero'])
  },
  methods: mapActions(['saveHeros', 'updateProfiles', 'updateState'])
})
export default class OptimizationProfiler extends Vue {
  readonly siteState!: SiteState;
  getHero!: (heroId: string) => Hero | undefined;
  getProfile!: (heroId: string) => OptimizationProfile | undefined;
  saveHeros!: (heros: Hero[]) => void;
  updateProfiles!: (profiles: OptimizationProfile[]) => void;
  updateState!: (siteState: Partial<SiteState>) => void;
  //
  @Model() readonly form!: OptimizationForm;
  // @Prop() readonly loading!: boolean;
  popupMsg = 0;

  created() {
    this.resetForm(this.siteState.lastSelectedHeroId);
  }

  clear() {
    ObjectUtils.assignHeroAbility(this.form.hero.abilityRating, ConstantService.emptyHeroAbility());
    ObjectUtils.assignOptimizationFilter(this.form.profile.filter, ConstantService.emptyOptimizationFilter());
    ObjectUtils.assignOptimizationStatCriteria(this.form.profile.stat, ConstantService.emptyOptimizationStatCriteria());
    ObjectUtils.assignOptimizationEvaluationCriteria(
      this.form.profile.evaluation,
      ConstantService.emptyOptimizationEvaluationCriteria()
    );
  }

  optimize() {
    this.$emit('optimize');
  }

  saveProfile() {
    console.log(
      `saveProfile::profile.id = ${this.form.profile.hero.id}, profile = ${JSON.stringify(
        this.form.profile
      )}, hero = ${JSON.stringify(this.form.hero)}`
    );
    this.updateProfiles([this.form.profile]);
    this.saveHeros([this.form.hero]);
    this.popupMsg = 1;
  }

  resetForm(heroId: string) {
    this.resetHero(heroId);
    this.resetProfile(heroId);
  }

  resetHero(heroId: string) {
    const hero = this.getHero(heroId);
    if (hero) {
      ObjectUtils.assignHero(this.form.hero, hero);
    }
  }

  resetProfile(heroId: string) {
    console.log('resetProfile::heroId = ' + heroId);
    let profile = this.getProfile(heroId);
    console.log(`resetProfile::profile = ${JSON.stringify(profile)}`);
    if (!profile) {
      profile = ConstantService.emptyOptimizationProfile();
      profile.id = heroId;
      profile.hero.id = heroId;
    }
    ObjectUtils.assignOptimizationProfile(this.form.profile, profile);
  }

  changeHero() {
    console.log(`changeHero::hero.id = ${this.form.hero.id}`);
    this.updateState({ lastSelectedHeroId: this.form.hero.id });
    if (this.form.hero.id) {
      this.resetForm(this.form.hero.id);
    }
  }
}
</script>
