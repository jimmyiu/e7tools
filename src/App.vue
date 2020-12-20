<template>
  <v-app>
    <top-nav @toggle-menu="menu = !menu" />
    <v-main>
      <v-container>
        <v-alert class="hidden-sm-and-up" dense outlined type="error">
          This tool is intended to design for desktop users.
        </v-alert>
        <router-view />
      </v-container>
    </v-main>
    <!-- <v-navigation-drawer v-model="menu" absolute temporary>
      <v-list>
        <v-list-item link to="gear">
          <v-list-item-content>
            Gear
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer> -->
  </v-app>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { mapActions, mapState } from 'vuex';
import { Hero } from '@/models';
import { TopNav } from '@/components';

@Component({
  name: 'app',
  components: { TopNav }
})
export default class App extends Vue {
  menu = false;
  // items: Array<Hero> = new Array();
  // hero: Hero = new Hero();
  // async created() {
  //   await axios.get('https://api.epicsevendb.com/api/hero').then(response => (this.items = response.data.results));
  // }
  // async load() {
  //   return await axios
  //     .get('https://api.epicsevendb.com/api/hero')
  //     .then(response => (this.items = response.data.results));
  // }
}
</script>
