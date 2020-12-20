<template>
  <v-container>
    <v-row>
      <v-select v-model="hero" item-text="name" item-value="_id" :items="items" label="Hero" return-object />
    </v-row>
    <v-row> here: {{ hero }} </v-row>

    <!-- <v-card :v-for="(item, index) in items" :key="index">
      {{ item }}
    </v-card> -->
    <!-- <div v-for="(item, index) in items" :key="index">
      {{ item }}
    </div> -->
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import axios from 'axios';
import { Hero } from '@/models';

@Component
export default class HeroPage extends Vue {
  name: string = 'hero-page';
  items: Array<Hero> = new Array();
  hero: Hero = new Hero();

  async created() {
    await axios.get('https://api.epicsevendb.com/api/hero').then(response => (this.items = response.data.results));
  }

  // async load() {
  //   return await axios
  //     .get('https://api.epicsevendb.com/api/hero')
  //     .then(response => (this.items = response.data.results));
  // }
}
</script>
