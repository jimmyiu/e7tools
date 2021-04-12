<template>
  <div>
    <div class="d-flex align-center mb-2">
      <hero-select v-model="heroId" class="flex-grow-1" />
      <v-btn color="primary" icon @click="addHero">
        <v-icon>mdi-plus-circle-outline</v-icon>
      </v-btn>
    </div>
    <draggable v-model="orderedHeros" class="row row--dense" handle=".drag">
      <v-col v-for="(item, index) in orderedHeros" :key="index" cols="12" lg="4" md="6">
        <hero-overview-card :hero-id="item.id" />
      </v-col>
    </draggable>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { HeroFormCard, HeroOverviewCard, HeroSelect, GearCard } from '@/components';
import { mapGetters, mapActions } from 'vuex';
import { EquippedHero, Gear, Hero, SiteState, Suit } from '@/models';
import { HeroSuit } from '@/models/suit';
import draggable from 'vuedraggable';
import { nextTick } from 'vue/types/umd';

@Component({
  name: 'hero-page',
  components: {
    HeroOverviewCard,
    HeroFormCard,
    HeroSelect,
    GearCard,
    draggable
  },
  computed: { ...mapGetters(['gears', 'heros', 'siteState', 'getHero']) },
  methods: mapActions(['updateState', 'saveHeros'])
})
export default class HeroPage extends Vue {
  // replaceSuits!: (suits: HeroSuit[]) => void;
  // getEquippedHero!: (heroId: string) => EquippedHero | undefined;
  // getSavedSuit!: (heroId: string) => Suit | undefined;
  saveHeros!: (heros: Hero[]) => void;
  getHero!: (heroId: string) => Hero;
  // updateState!: (siteState: Partial<SiteState>) => void;
  heros!: Hero[];
  gears!: Gear.Gear[];
  // readonly siteState!: SiteState;
  //
  heroId: string = '';
  // editHero: boolean = false;

  get orderedHeros() {
    return [...this.heros]
      .filter(x => x.order > 0)
      .sort((a, b) => {
        return a.order - b.order;
      });
  }

  set orderedHeros(value: Hero[]) {
    console.log('orderedHeros::', value);
    for (let i = 0; i < value.length; i++) {
      value[i].order = i + 1;
      console.log(`id = ${value[i].id}, order = ${value[i].order}`);
    }
    this.saveHeros(value);
  }

  addHero() {
    if (this.heroId) {
      const hero = this.getHero(this.heroId);
      if (hero.order == 0) {
        hero.order = this.heros.reduce((max, current) => (current.order > max.order ? current : max)).order + 1;
        console.log(`${hero.id} new order = ${hero.order}`);
        this.saveHeros([hero]);
        this.$nextTick(() => {
          (document.getElementById('app') as any).scrollTo({
            top: document.getElementById('app')?.scrollHeight,
            behavior: 'smooth'
          });
        });
      }
    }
  }

  // get currentEquipped() {
  //   return this.getEquippedHero(this.heroId);
  // }

  // get savedSuit() {
  //   return this.getSavedSuit(this.heroId);
  // }

  // created() {
  //   this.heroId = this.siteState.lastSelectedHeroId;
  // }

  // changeHero(heroId: string) {
  //   this.heroId = heroId;
  //   this.updateState({ lastSelectedHeroId: heroId });
  // }
}
</script>
