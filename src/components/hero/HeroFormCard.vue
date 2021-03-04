<template>
  <v-card>
    <v-card-title>
      <v-row dense>
        <v-col>
          <v-avatar class="mr-2" left size="40">
            <v-img :src="hero.icon"></v-img>
          </v-avatar>
        </v-col>
        <v-col cols="5">
          <v-text-field
            v-model.number="form.tier"
            dense
            hide-details
            label="Tier (1 - Highest)"
            min="0"
            outlined
            type="number"
          />
        </v-col>
      </v-row>
    </v-card-title>
    <v-card-text>
      <v-row dense>
        <v-col cols="12" md="4">
          <v-row dense>
            <v-col class="d-flex justify-center align-center">
              <div class="mr-2">Basic Hero Ability</div>
              <v-divider />
              <v-btn icon x-small @click="lockBasic = !lockBasic">
                <v-icon small>{{ lockBasic ? 'lock' : 'lock_open' }}</v-icon>
              </v-btn>
            </v-col>
          </v-row>
          <v-row dense>
            <v-col v-for="(item, key) in $const.HERO_STATS" :key="key" cols="3">
              <v-text-field
                v-model.number="form.basic[item.value]"
                dense
                hide-details
                :label="item.label"
                outlined
                :readonly="lockBasic"
                type="number"
              />
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" md="4">
          <v-row dense>
            <v-col class="d-flex justify-center align-center">
              <div class="mr-2">Bonus Ability (e.g. Artifact)</div>
              <v-divider />
            </v-col>
          </v-row>
          <v-row dense>
            <v-col v-for="(item, key) in $const.GearStat.PRIMITIVE" :key="key" cols="3">
              <v-text-field
                v-model.number="form.bonus[item.value]"
                dense
                hide-details
                :label="item.label"
                outlined
                type="number"
              />
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" md="4">
          <v-row dense>
            <v-col class="d-flex justify-center align-center">
              <div class="mr-2">Suit Rating (for the Suit Optimizer)</div>
              <v-divider />
            </v-col>
          </v-row>
          <v-row dense>
            <v-col v-for="(item, key) in $const.HERO_STATS" :key="key" cols="3">
              <v-text-field
                v-model.number="form.rating[item.value]"
                dense
                hide-details
                :label="item.label"
                max="3"
                min="-1"
                outlined
                type="number"
              />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card-text>
    <v-divider />
    <v-card-actions>
      <v-btn class="font-weight-bold" color="primary" text @click="save">Save</v-btn>
      <v-btn text @click="resetForm">Reset</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit, Model, Watch } from 'vue-property-decorator';
import { mapActions, mapGetters } from 'vuex';
import { Hero, HeroAbility } from '@/models';
import { GearAbility } from '@/models/common';
import { ConstantService, ObjectUtils } from '@/services';

type HeroForm = {
  tier: number;
  basic: HeroAbility;
  bonus: GearAbility;
  rating: HeroAbility;
};

@Component({
  name: 'hero-form-card',
  computed: { ...mapGetters(['getHero']) },
  methods: { ...mapActions(['saveHeros']) }
})
export default class HeroFormCard extends Vue {
  @Prop() readonly heroId!: string;
  getHero!: (heroId: string) => Hero | undefined;
  saveHeros!: (heros: Hero[]) => void;
  form = this.defaultForm();
  lockBasic = true;

  get hero() {
    return this.getHero(this.heroId);
  }

  @Watch('hero', { immediate: true, deep: false })
  onHeroChange(val: Hero) {
    console.log('onHeroChange = ', val);
    if (val) {
      this.resetForm();
    }
  }

  defaultForm(): HeroForm {
    return {
      tier: 0,
      basic: ConstantService.emptyHeroAbility(),
      bonus: ConstantService.emptyGearAbility(),
      rating: ConstantService.emptyHeroAbility()
    };
  }

  resetForm() {
    this.lockBasic = true;
    if (this.hero) {
      this.form.tier = this.hero.tier;
      ObjectUtils.assignHeroAbility(this.form.basic, this.hero);
      ObjectUtils.assignGearAbility(this.form.bonus, this.hero.bonusAbility);
      ObjectUtils.assignHeroAbility(this.form.rating, this.hero.abilityRating);
    } else {
      const defaultFrom = this.defaultForm();
      this.form.tier = defaultFrom.tier;

      ObjectUtils.assignHeroAbility(this.form.basic, defaultFrom.basic);
      ObjectUtils.assignGearAbility(this.form.bonus, defaultFrom.bonus);
      ObjectUtils.assignHeroAbility(this.form.rating, defaultFrom.rating);
    }
  }

  save() {
    console.log(`save, form = ${JSON.stringify(this.form)}`);
    const shadow: Hero = JSON.parse(JSON.stringify(this.hero));
    shadow.tier = this.form.tier;
    ObjectUtils.assignHeroAbility(shadow, this.form.basic);
    ObjectUtils.assignGearAbility(shadow.bonusAbility, this.form.bonus);
    ObjectUtils.assignHeroAbility(shadow.abilityRating, this.form.rating);
    this.saveHeros([shadow]);
  }
}
</script>
