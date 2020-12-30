<template>
  <v-app>
    <top-nav @toggle-setting="setting = !setting" />
    <v-main>
      <v-container>
        <v-alert class="hidden-sm-and-up" dense outlined type="error">
          This tool is intended to design for desktop users.
        </v-alert>
        <router-view />
      </v-container>
    </v-main>
    <site-setting v-model="setting" />
  </v-app>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { mapActions, mapState } from 'vuex';
import { TopNav, SiteSetting } from '@/components';

@Component({
  name: 'app',
  components: { TopNav, SiteSetting },
  methods: { ...mapActions(['initVuex']) }
})
export default class App extends Vue {
  setting = false;

  initVuex!: () => void;

  created() {
    this.initVuex();
  }
}
</script>
