<template>
  <div>
    <!-- <v-alert dense dismissible outlined type="info">Organize heros</v-alert> -->
    <v-autocomplete
      v-model="heroId"
      class="mb-2"
      hide-details
      item-text="name"
      item-value="id"
      :items="heroSelectItems"
      label="Select Hero"
      outlined
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
        {{ data.item.name }}
      </template>
    </v-autocomplete>
    <hero-form-card v-if="heroId" :hero-id="heroId" />
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { HeroFormCard } from '@/components';
import { mapGetters } from 'vuex';
import { Hero, SiteState } from '@/models';

@Component({
  name: 'tier-page',
  components: { HeroFormCard },
  computed: { ...mapGetters(['heros', 'siteState']) }
})
export default class TierPage extends Vue {
  heros!: Hero[];
  readonly siteState!: SiteState;
  //
  heroId: string = '';

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

  created() {
    this.heroId = this.siteState.lastSelectedHeroId;
  }
}
</script>
