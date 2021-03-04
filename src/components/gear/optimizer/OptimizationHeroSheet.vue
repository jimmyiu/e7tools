<template>
  <v-sheet class="mx-auto pa-2">
    <v-row dense>
      <v-col class="d-flex justify-center align-center">
        <div class="mr-2">Hero Setup</div>
        <v-divider />
      </v-col>
    </v-row>
    <v-row dense>
      <v-col>
        <hero-select v-model="hero.id" @change="changeHero" />
      </v-col>
    </v-row>
    <v-row dense>
      <v-col v-for="(item, key) in $const.HERO_STATS" :key="key" cols="3">
        <v-text-field
          v-model.number="hero.abilityRating[item.value]"
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
  </v-sheet>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit, Model } from 'vue-property-decorator';
import { HeroSelect } from '@/components';
import { mapGetters } from 'vuex';
import { Gear, Hero } from '@/models';

@Component({
  name: 'optimization-hero-sheet',
  computed: { ...mapGetters(['heros', 'getHero']) },
  components: { HeroSelect }
})
export default class OptimizationHeroCard extends Vue {
  // getHero!: (heroId: string) => Hero | undefined;
  // @Model() readonly value!: OptimizationHero;
  @Model() readonly hero!: Hero;

  // get hero() {
  //   return this.getHero(this.value.id);
  // }

  changeHero() {
    if (this.hero.id) {
      this.$emit('change-hero', this.hero.id);
    }
  }
}
</script>
