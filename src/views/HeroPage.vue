<template>
  <div>
    <v-row dense>
      <v-col class="mb-1" cols="12">
        <v-sheet class="px-2 pb-2">
          <div class="d-flex align-center">
            Special Actions
            <v-spacer />
            <v-btn icon @click="lockActions = !lockActions">
              <v-icon>{{ lockActions ? 'lock' : 'lock_open' }}</v-icon>
            </v-btn>
          </div>
          <div>
            <v-btn class="font-weight-bold" color="primary" depressed :disabled="lockActions" @click="saveAll">
              Save All Suits
            </v-btn>
          </div>
        </v-sheet>
      </v-col>
      <v-col cols="12">
        <v-sheet class="pa-2 mb-1" rounded>
          <div class="d-flex align-center">
            <hero-select v-model="heroId" class="flex-grow-1" @change="changeHero" />
            <v-btn class="hidden-lg-and-up ml-1" :color="editHero ? '' : 'primary'" icon @click="editHero = !editHero">
              <v-icon>{{ editHero ? 'mdi-chevron-up-circle-outline' : 'edit' }}</v-icon>
            </v-btn>
          </div>
          <v-expand-transition>
            <div v-if="$vuetify.breakpoint.lgAndUp || editHero">
              <!-- <v-divider class="my-3" /> -->
              <hero-form-card class="mt-3" :hero-id="heroId" />
            </div>
          </v-expand-transition>
        </v-sheet>
      </v-col>
    </v-row>
    <v-row dense>
      <v-col class="flex-grow-1" cols="12" lg="12" sm="auto">
        <suit-mgt-card :hero-id="heroId" />
      </v-col>
      <v-col class="flex-grow-1" cols="12" lg="12" sm="auto">
        <v-card>
          <v-card-title class="py-3">
            Saved Suit
          </v-card-title>
          <v-card-text class="pa-2">
            <suit-gear-view class="mx-auto" :hero="currentEquipped.hero" :suit="savedSuit" />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
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
  editHero: boolean = false;

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
