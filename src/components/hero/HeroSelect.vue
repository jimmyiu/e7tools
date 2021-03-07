<template>
  <div class="d-flex align-center">
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
        <v-avatar class="mt-1 mr-2" color="black" size="32"> T{{ data.item.tier }} </v-avatar>
        <v-avatar class="mr-2" left size="32">
          <v-img :src="data.item.icon"></v-img>
        </v-avatar>
        <!-- <span v-if="data.item.tier" class="ml-2">(T{{ data.item.tier }})</span> -->
      </template>
    </v-autocomplete>
    <!--  -->
    <v-menu v-model="popup" left max-height="450px" offset-y transition="slide-y-transition">
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-bind="attrs" class="ml-2" icon v-on="on"><v-icon>mdi-dots-vertical-circle-outline</v-icon></v-btn>
      </template>
      <v-sheet class="pa-2" color="section" rounded>
        <v-row dense>
          <v-col v-for="(item, key) in tieredHeros" :key="key" cols="12" md="4" sm="6">
            <v-sheet class="pa-2" height="100%" rounded>
              <div class="d-flex">
                <v-avatar class="mt-1 mr-2" color="black" size="32"> T{{ item[0] }} </v-avatar>
                <v-row dense>
                  <v-col v-for="(hero, index) in item[1]" :key="index" cols="auto">
                    <v-btn icon>
                      <v-avatar size="32" @click="input(hero.id) || change(hero.id)">
                        <v-img :src="hero.icon"></v-img>
                      </v-avatar>
                    </v-btn>
                  </v-col>
                </v-row>
              </div>
            </v-sheet>
          </v-col>
        </v-row>
      </v-sheet>
    </v-menu>
  </div>
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
  popup = false;

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

  input(heroId: string) {
    if (heroId) {
      this.$emit('input', heroId);
    }
  }

  change(heroId: string) {
    if (heroId != undefined && this.value != heroId) {
      this.$emit('change', heroId);
    }
  }
}
</script>
