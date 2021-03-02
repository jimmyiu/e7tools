<template>
  <v-card>
    <v-card-title>
      <v-row no-gutters>
        <v-col>
          <v-avatar class="mr-2" left size="40">
            <v-img :src="hero.icon"></v-img>
          </v-avatar>
        </v-col>
        <v-col cols="auto">
          <v-text-field
            v-model.number="form.tier"
            dense
            hide-details
            label="Tier"
            min="0"
            outlined
            style="width: 150px"
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
              <v-btn icon small @click="lockBasic = !lockBasic">
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
import { ConstantService } from '@/services';

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
      this.assignHeroAbility(this.form.basic, this.hero);
      this.assignGearAbility(this.form.bonus, this.hero.bonusAbility);
      this.assignHeroAbility(this.form.rating, this.hero.abilityRating);
    } else {
      const defaultFrom = this.defaultForm();
      this.form.tier = defaultFrom.tier;
      this.assignHeroAbility(this.form.basic, defaultFrom.basic);
      this.assignGearAbility(this.form.bonus, defaultFrom.bonus);
      this.assignHeroAbility(this.form.rating, defaultFrom.rating);
    }
  }

  save() {
    console.log(`save, form = ${JSON.stringify(this.form)}`);
    const shadow: Hero = JSON.parse(JSON.stringify(this.hero));
    shadow.tier = this.form.tier;
    this.assignHeroAbility(shadow, this.form.basic);
    this.assignGearAbility(shadow.bonusAbility, this.form.bonus);
    this.assignHeroAbility(shadow.abilityRating, this.form.rating);
    this.saveHeros([shadow]);
  }

  assignHeroAbility(to: HeroAbility, from: HeroAbility) {
    to.hp = from.hp;
    to.def = from.def;
    to.atk = from.atk;
    to.cri = from.cri;
    to.cdmg = from.cdmg;
    to.spd = from.spd;
    to.eff = from.eff;
    to.res = from.res;
  }

  assignGearAbility(to: GearAbility, from: GearAbility) {
    (this.$const.GearStat.PRIMITIVE.map(x => x.value) as (keyof GearAbility)[]).forEach(x => {
      to[x] = from[x];
    });
  }
}
</script>
