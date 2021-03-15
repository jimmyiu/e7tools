<template>
  <v-app>
    <top-nav @toggle-menu="menu = !menu" @toggle-setting="setting = !setting" />
    <v-main>
      <top-nav @toggle-setting="setting = !setting" />
      <v-container>
        <!-- <v-alert class="hidden-sm-and-up" dense dismissible outlined type="error">
          This tool is intended to design for desktop users.
        </v-alert> -->
        <router-view />
      </v-container>
      <site-setting v-model="setting" />
      <v-overlay v-if="loading" :value="loading">
        <v-progress-circular indeterminate />
      </v-overlay>
    </v-main>
    <site-menu v-model="menu" />
    <site-setting v-model="setting" />
    <v-overlay v-if="loading" :value="loading">
      <v-progress-circular indeterminate />
    </v-overlay>
  </v-app>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { mapActions, mapState } from 'vuex';
import TopNav from '@/components/common/TopNav.vue';
import SiteSetting from '@/components/common/SiteSetting.vue';
import SiteMenu from '@/components/common/SiteMenu.vue';
import { persistenceService } from '@/services/presistence';
import { VuexData } from './models';

@Component({
  name: 'app',
  components: { TopNav, SiteSetting, SiteMenu },
  computed: { ...mapState(['loading']) },
  methods: { ...mapActions(['initVuex']) }
})
export default class App extends Vue {
  // vuex
  initVuex!: (data: VuexData) => void;
  loading!: boolean;
  //
  setting = false;
  menu = false;

  created() {
    const data = persistenceService.getVuexData();
    this.initVuex(data);
  }
}
</script>
