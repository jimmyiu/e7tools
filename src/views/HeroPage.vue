<template>
  <v-container>
    <v-row>
      <v-dialog v-model="confirmCache" width="300">
        <template v-slot:activator="{ on, attrs }">
          <v-btn v-bind="attrs" dark v-on="on">
            Cache Data
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            Confirmation
          </v-card-title>
          <v-card-text>
            Call EpicSevenDB API to retrieve hero data?
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="refresh">
              OK
            </v-btn>
            <v-btn color="secondary" text @click="confirmCache = false">
              CANCEL
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
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
  confirmCache: boolean = false;

  created() {
    (JSON.parse(localStorage.getItem('api-hero')!!) as Array<any>).forEach(x => {
      // console.log(x.assets.icon);
      let detail = JSON.parse(localStorage.getItem(`api-hero-${x._id}`)!!);
      // console.log(detail);
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
    localStorage.clear();
    await axios.get('https://api.epicsevendb.com/hero').then(response => {
      let results = response.data.results.filter((x: any) => !['raqueas', 'straze', 'rande'].includes(x._id));
      localStorage.setItem('api-hero', JSON.stringify(results));
      results.forEach((element: any) => {
        this.retrieveStat(element);
      });
    });
    this.confirmCache = false;
  }

  async retrieveStat(hero: any) {
    await axios.get(`https://api.epicsevendb.com/hero/${hero._id}`).then(response => {
      localStorage.setItem(`api-hero-${hero._id}`, JSON.stringify(response.data.results[0]));
    });
  }
}
</script>
