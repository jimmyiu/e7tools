<template>
  <div style="padding-top: 42px">
    <v-sheet class="toolbar pa-2" outlined>
      <div class="d-flex align-center justify-space-between">
        <div>
          <v-btn :disabled="currentEquipped.hero.order <= 1" icon @click="changeHero(currentEquipped.hero.order - 1)">
            <v-icon>mdi-arrow-left-bold</v-icon>
          </v-btn>
          <v-avatar class="mr-2" color="black" size="36">{{ currentEquipped.hero.order }}</v-avatar>
        </div>
        <div class="d-flex align-center">
          <v-avatar class="mr-2" left size="36">
            <v-img :src="currentEquipped.hero.icon" />
          </v-avatar>
          {{ currentEquipped.hero.name }}
        </div>
        <div>
          <v-btn class="hidden-lg-and-up ml-1" :color="editHero ? '' : 'primary'" icon @click="editHero = !editHero">
            <v-icon>{{ editHero ? 'mdi-chevron-up-circle-outline' : 'edit' }}</v-icon>
          </v-btn>
          <v-btn icon @click="changeHero(currentEquipped.hero.order + 1)">
            <v-icon>mdi-arrow-right-bold</v-icon>
          </v-btn>
        </div>
      </div>
    </v-sheet>
    <div class="mt-3">
      <v-expand-transition>
        <div v-if="$vuetify.breakpoint.lgAndUp || editHero">
          <hero-form-card class="mb-3" :hero-id="heroId" />
        </div>
      </v-expand-transition>
      <v-tabs v-model="tab" color="white">
        <v-tabs-slider color="white"></v-tabs-slider>
        <v-tab>Current</v-tab>
        <v-tab>Past</v-tab>
        <v-tab>Compare</v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab">
        <v-tab-item>
          <suit-mgt-card :hero-id="heroId" />
        </v-tab-item>
        <v-tab-item>
          <v-card>
            <v-card-text class="pa-2">
              <suit-gear-view class="mx-auto" :hero="currentEquipped.hero" :suit="savedSuit" />
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <suit-compare-view :hero-id="heroId" />
        </v-tab-item>
      </v-tabs-items>
    </div>
  </div>
</template>
<style lang="sass" scoped>
.toolbar
  position: absolute
  left: 0
  top: 0
  width: 100%
</style>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { HeroFormCard, HeroSelect, GearCard, SuitGearView, SuitMgtCard, SuitCompareView } from '@/components';
import { mapGetters, mapActions } from 'vuex';
import { EquippedHero, Gear, Hero, SiteState, Suit } from '@/models';
import { HeroSuit } from '@/models/suit';

@Component({
  name: 'view-hero-page',
  components: { HeroFormCard, HeroSelect, GearCard, SuitGearView, SuitMgtCard, SuitCompareView },
  computed: { ...mapGetters(['gears', 'heros', 'siteState', 'getEquippedHero', 'getSavedSuit']) },
  methods: mapActions(['updateState'])
})
export default class ViewHeroPage extends Vue {
  replaceSuits!: (suits: HeroSuit[]) => void;
  getEquippedHero!: (heroId: string) => EquippedHero | undefined;
  getSavedSuit!: (heroId: string) => Suit | undefined;
  updateState!: (siteState: Partial<SiteState>) => void;
  heros!: Hero[];
  gears!: Gear.Gear[];
  readonly siteState!: SiteState;
  //
  @Prop() heroId!: string;
  editHero: boolean = false;
  tab = 0;

  get currentEquipped() {
    return this.getEquippedHero(this.heroId);
  }

  get savedSuit() {
    return this.getSavedSuit(this.heroId);
  }

  created() {
    console.log('created::', this.heroId);
    this.updateState({ lastSelectedHeroId: this.heroId });
    // this.heroId = this.siteState.lastSelectedHeroId;
  }

  changeHero(order: number) {
    const hero = this.heros.find(x => x.order == order);
    if (hero) {
      this.$router.push({ name: 'hero-detail', params: { heroId: hero.id } });
    }
  }
}
</script>
