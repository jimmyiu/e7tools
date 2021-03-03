<template>
  <v-row dense>
    <v-col cols="12" lg="3">
      <v-sheet v-for="(item, key) in tieredHeros" :key="key" class="mb-2 pa-2" rounded>
        <div class="d-flex">
          <v-avatar class="mt-1 mr-2" color="black" size="32"> T{{ item[0] }} </v-avatar>
          <v-row dense>
            <v-col v-for="(hero, index) in item[1]" :key="index" cols="auto">
              <v-btn icon>
                <v-avatar size="32" @click="heroId = hero.id">
                  <v-img :src="hero.icon"></v-img>
                </v-avatar>
              </v-btn>
            </v-col>
          </v-row>
        </div>
      </v-sheet>
    </v-col>
    <!-- <v-alert dense dismissible outlined type="info">Organize heros</v-alert> -->
    <v-col>
      <hero-select v-model="heroId" class="mb-2" @change="changeHero" />
      <hero-form-card v-if="heroId" :hero-id="heroId" />
    </v-col>
  </v-row>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { HeroFormCard, HeroSelect } from '@/components';
import { mapGetters, mapActions } from 'vuex';
import { Hero, SiteState } from '@/models';

@Component({
  name: 'tier-page',
  components: { HeroFormCard, HeroSelect },
  computed: { ...mapGetters(['heros', 'siteState']) },
  methods: mapActions(['updateState'])
})
export default class TierPage extends Vue {
  updateState!: (siteState: Partial<SiteState>) => void;
  heros!: Hero[];
  readonly siteState!: SiteState;
  //
  heroId: string = '';

  get tieredHeros() {
    const result = new Map<number, Hero[]>();
    [...this.heros]
      .filter(x => x.tier > 0)
      .sort((a, b) => {
        if (b.tier == 0 && a.tier != 0) {
          return -1;
        } else if (a.tier == 0 && b.tier != 0) {
          return 1;
        }
        return a.tier - b.tier;
      })
      .forEach(x => {
        if (!result.get(x.tier)) {
          result.set(x.tier, []);
        }
        result.get(x.tier)?.push(x);
      });
    return result;
  }

  created() {
    this.heroId = this.siteState.lastSelectedHeroId;
  }

  changeHero(heroId: string) {
    this.updateState({ lastSelectedHeroId: heroId });
  }
}
</script>
