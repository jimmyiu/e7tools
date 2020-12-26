<template>
  <v-container>
    <v-row>
      <v-btn icon @click="refresh">
        <v-icon>mdi-cached</v-icon>
      </v-btn>
    </v-row>
    <v-row>
      <v-col>
        <v-autocomplete
          v-model="hero"
          color="blue-grey lighten-2"
          item-text="name"
          :items="items"
          label="Select Hero"
          return-object
        >
          <template v-slot:item="data">
            <v-list-item-avatar>
              <img :src="data.item.icon" />
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>{{ data.item.name }}</v-list-item-title>
            </v-list-item-content>
          </template>
        </v-autocomplete>
        <v-card v-if="hero.id">
          <v-card-title>
            <img :src="hero.icon" width="40" />
            <v-spacer />
            {{ hero.name }}
          </v-card-title>
          <v-list-item v-for="item in ['hp', 'def', 'atk', 'cri', 'cdmg', 'spd', 'eff', 'res']" :key="item" dense>
            <v-list-item-title>{{ item.toUpperCase() }}</v-list-item-title>
            <v-list-item-subtitle class="text-right">
              {{ hero[item] }}
            </v-list-item-subtitle>
          </v-list-item>
        </v-card>
      </v-col>
    </v-row>
    <!-- <v-row> here: {{ hero }} </v-row> -->
    <!-- <v-row v-for="(item, i) in items" :key="i">
      <img :src="item.icon" />
    </v-row> -->
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import axios from 'axios';
import { Hero } from '@/models';

@Component({
  name: 'hero-page'
})
export default class HeroPage extends Vue {
  items: Array<Hero> = new Array();
  hero?: Hero = {} as Hero;

  created() {
    (JSON.parse(localStorage.getItem('api-hero')!!) as Array<any>).forEach(x => {
      // console.log(x.assets.icon);
      let detail = JSON.parse(localStorage.getItem(`api-hero-${x._id}`)!!);
      console.log(detail);
      const a = new Hero(
        x._id,
        x.name,
        x.assets.icon,
        detail.calculatedStatus.lv60SixStarFullyAwakened.hp,
        detail.calculatedStatus.lv60SixStarFullyAwakened.def,
        detail.calculatedStatus.lv60SixStarFullyAwakened.atk,
        Math.round(detail.calculatedStatus.lv60SixStarFullyAwakened.chc * 100),
        Math.round(detail.calculatedStatus.lv60SixStarFullyAwakened.chd * 100),
        detail.calculatedStatus.lv60SixStarFullyAwakened.spd,
        Math.round(detail.calculatedStatus.lv60SixStarFullyAwakened.eff * 100),
        Math.round(detail.calculatedStatus.lv60SixStarFullyAwakened.efr * 100)
      );
      // console.log(a);
      this.items.push(a);
    });
  }

  async refresh() {
    await axios.get('https://api.epicsevendb.com/hero').then(response => {
      let results = response.data.results.filter((x: any) => !['raqueas', 'straze', 'rande'].includes(x._id));
      localStorage.setItem('api-hero', JSON.stringify(results));
      results.forEach((element: any) => {
        this.retrieveStat(element);
      });
    });
  }

  async retrieveStat(hero: any) {
    await axios.get(`https://api.epicsevendb.com/hero/${hero._id}`).then(response => {
      localStorage.setItem(`api-hero-${hero._id}`, JSON.stringify(response.data.results[0]));
    });
  }
}
</script>
