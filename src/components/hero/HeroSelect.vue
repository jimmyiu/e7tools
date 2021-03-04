<template>
  <v-autocomplete
    hide-details
    item-text="name"
    item-value="id"
    :items="heroSelectItems"
    label="Select Hero"
    outlined
    :value="value"
    @change="change"
    @input="input"
  >
    <template v-slot:item="data">
      <v-avatar class="mr-2" left size="32">
        <v-img :src="data.item.icon"></v-img>
      </v-avatar>
      {{ data.item.name }}
    </template>
    <template v-slot:selection="data">
      <v-avatar class="mr-2" left size="32">
        <v-img :src="data.item.icon"></v-img>
      </v-avatar>
      {{ data.item.name }} <span v-if="data.item.tier" class="ml-2">(T{{ data.item.tier }})</span>
    </template>
  </v-autocomplete>
</template>
<script lang="ts">
import { Vue, Component, Prop, Model } from 'vue-property-decorator';
import { Constants, EquippedHero, Hero, HeroAbility, Suit } from '@/models';
import { GearSetIcon, GearStatIcon } from '..';
import { mapGetters } from 'vuex';
import { gearService, HeroService } from '@/services';

@Component({
  name: 'hero-select',
  computed: { ...mapGetters(['heros']) }
})
export default class HeroSelect extends Vue {
  readonly heros!: Hero[];
  @Model('input') value!: string;

  get heroSelectItems() {
    const sortedHeros = [...this.heros].sort((a, b) => {
      if (b.tier == 0 && a.tier != 0) {
        return -1;
      } else if (a.tier == 0 && b.tier != 0) {
        return 1;
      }
      return a.tier - b.tier;
    });
    const result: any[] = [];
    let i = 0;
    let tier = 0;
    while (sortedHeros[i].tier > 0) {
      if (tier != sortedHeros[i].tier) {
        tier = sortedHeros[i].tier;
        result.push({ header: `Tier ${tier}` });
      }
      result.push(sortedHeros[i++]);
    }
    result.push({ header: 'No Tier' });
    result.push(...sortedHeros.slice(i, sortedHeros.length));
    return result;
  }

  input(heroId: string) {
    if (heroId) {
      this.$emit('input', heroId);
    }
  }

  change(heroId: string) {
    this.$emit('change', heroId);
  }
}
</script>
