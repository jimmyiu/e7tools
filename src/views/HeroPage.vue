<template>
  <v-row dense>
    <v-col cols="12" lg="3">
      <hero-select v-model="heroId" class="mb-2" @change="changeHero" />
      <v-sheet v-for="(item, key) in tieredHeros" :key="key" class="mb-2 pa-2" rounded>
        <div class="d-flex">
          <v-avatar class="mt-1 mr-2" color="black" size="32"> T{{ item[0] }} </v-avatar>
          <v-row dense>
            <v-col v-for="(hero, index) in item[1]" :key="index" cols="auto">
              <v-btn icon>
                <v-avatar size="32" @click="changeHero(hero.id)">
                  <v-img :src="hero.icon"></v-img>
                </v-avatar>
              </v-btn>
            </v-col>
          </v-row>
        </div>
      </v-sheet>
      <v-sheet class="mb-2 pa-1 d-flex">
        <v-btn class="font-weight-bold" color="primary" :disabled="lockActions" text @click="saveAll">
          Save Suits
        </v-btn>
        <v-spacer />
        <v-btn icon @click="lockActions = !lockActions">
          <v-icon>{{ lockActions ? 'lock' : 'lock_open' }}</v-icon>
        </v-btn>
      </v-sheet>
    </v-col>
    <!-- <v-alert dense dismissible outlined type="info">Organize heros</v-alert> -->
    <v-col>
      <hero-form-card v-if="heroId" class="mb-2" :hero-id="heroId" />
      <suit-mgt-card class="mb-2" :hero-id="heroId" />
      <v-card>
        <v-card-title class="py-3">
          Saved Suit
        </v-card-title>
        <v-card-text class="pa-2">
          <suit-gear-view :suit="savedSuit" />
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { HeroFormCard, HeroSelect, GearCard, SuitGearView, SuitMgtCard } from '@/components';
import { mapGetters, mapActions } from 'vuex';
import { EquippedHero, Gear, Hero, SiteState, Suit } from '@/models';
import { HeroSuit } from '@/models/suit';

@Component({
  name: 'hero-page',
  components: { HeroFormCard, HeroSelect, GearCard, SuitGearView, SuitMgtCard },
  computed: { ...mapGetters(['gears', 'heros', 'siteState', 'getEquippedHero', 'getSavedSuit']) },
  methods: mapActions(['updateState', 'replaceSuits'])
})
export default class HeroPage extends Vue {
  replaceSuits!: (suits: HeroSuit[]) => void;
  getEquippedHero!: (heroId: string) => EquippedHero | undefined;
  getSavedSuit!: (heroId: string) => Suit | undefined;
  updateState!: (siteState: Partial<SiteState>) => void;
  heros!: Hero[];
  gears!: Gear.Gear[];
  readonly siteState!: SiteState;
  //
  heroId: string = '';
  lockActions: boolean = true;

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

  get currentEquipped() {
    return this.getEquippedHero(this.heroId);
  }

  get savedSuit() {
    return this.getSavedSuit(this.heroId);
  }

  created() {
    this.heroId = this.siteState.lastSelectedHeroId;
  }

  changeHero(heroId: string) {
    this.heroId = heroId;
    this.updateState({ lastSelectedHeroId: heroId });
  }

  saveAll() {
    if (
      window.confirm(
        `[CAUTION!!!] You will OVERWRITE ALL saved suits by the currently equipped suits. Are you sure to do this?`
      )
    ) {
      const result: HeroSuit[] = [];
      const heroGears = new Map<string, Array<Gear.Gear>>();
      this.gears.forEach(x => {
        if (x.equippedHero) {
          if (!heroGears.get(x.equippedHero)) {
            heroGears.set(x.equippedHero, []);
          }
          heroGears.get(x.equippedHero)!.push(x);
        }
      });
      heroGears.forEach((gears, heroId) => {
        result.push({
          heroSuitId: heroId,
          weaponId: gears.find(x => x.type == 'Weapon')?.id,
          armorId: gears.find(x => x.type == 'Armor')?.id,
          helmetId: gears.find(x => x.type == 'Helmet')?.id,
          necklaceId: gears.find(x => x.type == 'Necklace')?.id,
          ringId: gears.find(x => x.type == 'Ring')?.id,
          bootId: gears.find(x => x.type == 'Boot')?.id
        });
      });
      this.replaceSuits(result);
    }
  }
}
</script>
