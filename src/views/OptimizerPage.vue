<template>
  <div>
    <v-virtual-scroll height="400" :item-height="152" :items="gears">
      <template v-slot:default="{ item }">
        <v-row dense no-gutters>
          <v-col cols="auto"><gear-detail :gear-id="item.id"/></v-col>
        </v-row>
      </template>
    </v-virtual-scroll>
    <!-- {{ getGearMap.get('fedaj7jj44') }} -->
    <v-row class="mt-9">
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
  </div>
</template>

<script lang="ts">
import { GearDetail } from '@/components';
import { Hero, Gear } from '@/models';
import { Vue, Component } from 'vue-property-decorator';
import { mapState } from 'vuex';
import axios from 'axios';

@Component({
  name: 'optimizer-page',
  components: { GearDetail },
  computed: { ...mapState(['gears']) }
})
export default class OptimizerPage extends Vue {
  items: Array<Hero> = new Array();
  hero?: Hero = {} as Hero;
  confirmCache: boolean = false;

  created() {
    ((JSON.parse(localStorage.getItem('api.hero.details')!!) as Array<any>) || []).forEach(x => {
      this.items.push(x as Hero);
    });
  }

  async refresh() {
    // localStorage.clear();
    localStorage.removeItem('api.hero');
    localStorage.removeItem('api.hero.details');
    this.items.splice(0);
    await axios.get('https://api.epicsevendb.com/hero').then(response => {
      let results = response.data.results.filter((x: any) => !['raqueas', 'straze', 'rande'].includes(x._id));
      localStorage.setItem('api.hero', JSON.stringify(results));
      // results.forEach((element: any) => {
      //   this.retrieveStat(element);
      // });
      // localStorage.setItem(`api.hero.details`, JSON.stringify(results.map((x: any) => await this.retrieveHero(x))));
      Promise.all(results.map((x: any) => this.retrieveHero(x))).then(data => {
        console.log(data);
        this.items.push(...(data as Array<any>));
        localStorage.setItem(`api.hero.details`, JSON.stringify(data));
      });
    });
    this.confirmCache = false;
  }

  async retrieveHero(hero: any) {
    return axios.get(`https://api.epicsevendb.com/hero/${hero._id}`).then(response => {
      // localStorage.setItem(`api.hero.${hero._id}`, JSON.stringify());
      return Promise.resolve(this.createHero(hero, response.data.results[0]));
    });
  }

  createHero(hero: any, detail: any): Hero {
    return new Hero(
      hero._id,
      hero.name,
      hero.assets.icon,
      detail.calculatedStatus.lv60SixStarFullyAwakened.hp,
      detail.calculatedStatus.lv60SixStarFullyAwakened.def,
      detail.calculatedStatus.lv60SixStarFullyAwakened.atk,
      Math.round(detail.calculatedStatus.lv60SixStarFullyAwakened.chc * 100),
      Math.round(detail.calculatedStatus.lv60SixStarFullyAwakened.chd * 100),
      detail.calculatedStatus.lv60SixStarFullyAwakened.spd,
      Math.round(detail.calculatedStatus.lv60SixStarFullyAwakened.eff * 100),
      Math.round(detail.calculatedStatus.lv60SixStarFullyAwakened.efr * 100)
    );
  }
}
</script>
