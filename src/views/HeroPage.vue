<template>
  <div>
    <draggable v-model="orderedHeros" handle=".drag">
      <hero-overview-card v-for="(item, index) in orderedHeros" :key="index" class="mb-2" :hero-id="item.id" />
    </draggable>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { HeroFormCard, HeroOverviewCard, HeroSelect, GearCard, SuitGearView, SuitMgtCard } from '@/components';
import { mapGetters, mapActions } from 'vuex';
import { EquippedHero, Gear, Hero, SiteState, Suit } from '@/models';
import { HeroSuit } from '@/models/suit';
import draggable from 'vuedraggable';

@Component({
  name: 'hero-page',
  components: {
    HeroOverviewCard,
    HeroFormCard,
    HeroSelect,
    GearCard,
    SuitGearView,
    SuitMgtCard,
    draggable
  },
  computed: { ...mapGetters(['gears', 'heros', 'siteState', 'getEquippedHero', 'getSavedSuit']) },
  methods: mapActions(['updateState', 'saveHeros'])
})
export default class HeroPage extends Vue {
  replaceSuits!: (suits: HeroSuit[]) => void;
  getEquippedHero!: (heroId: string) => EquippedHero | undefined;
  getSavedSuit!: (heroId: string) => Suit | undefined;
  saveHeros!: (heros: Hero[]) => void;
  // updateState!: (siteState: Partial<SiteState>) => void;
  heros!: Hero[];
  gears!: Gear.Gear[];
  // readonly siteState!: SiteState;
  //
  heroId: string = '';
  // editHero: boolean = false;

  get orderedHeros() {
    // const result = new Map<number, Hero[]>();
    return [...this.heros]
      .filter(x => x.order > 0)
      .sort((a, b) => {
        // if (b.tier == 0 && a.tier != 0) {
        //   return -1;
        // } else if (a.tier == 0 && b.tier != 0) {
        //   return 1;
        // }
        return a.order - b.order;
      });
    // .forEach(x => {
    //   if (!result.get(x.tier)) {
    //     result.set(x.tier, []);
    //   }
    //   result.get(x.tier)?.push(x);
    // });
    // return result;
  }

  set orderedHeros(value: Hero[]) {
    console.log('orderedHeros::', value);
    for (let i = 0; i < value.length; i++) {
      value[i].order = i + 1;
      console.log(`id = ${value[i].id}, order = ${value[i].order}`);
    }
    this.saveHeros(value);
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
