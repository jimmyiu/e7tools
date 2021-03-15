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
    </v-row>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

import { mapGetters, mapActions } from 'vuex';
import { Gear } from '@/models';
import { HeroSuit } from '@/models/suit';

@Component({
  name: 'other-page',
  computed: { ...mapGetters(['gears']) },
  methods: mapActions(['replaceSuits'])
})
export default class OtherPage extends Vue {
  replaceSuits!: (suits: HeroSuit[]) => void;
  gears!: Gear.Gear[];
  //
  lockActions: boolean = true;

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
