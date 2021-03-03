<template>
  <v-app>
    <top-nav @toggle-setting="setting = !setting" />
    <v-main>
      <v-container>
        <!-- <v-alert class="hidden-sm-and-up" dense dismissible outlined type="error">
          This tool is intended to design for desktop users.
        </v-alert> -->
        <router-view />
      </v-container>
    </v-main>
    <site-setting v-model="setting" />
    <v-overlay v-if="loading" :value="loading">
      <v-progress-circular indeterminate />
    </v-overlay>
  </v-app>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { mapActions, mapState } from 'vuex';
import { TopNav, SiteSetting } from '@/components';
import { persistenceService } from '@/services/presistence';
import { VuexData } from './models';

@Component({
  name: 'app',
  components: { TopNav, SiteSetting },
  computed: { ...mapState(['loading']) },
  methods: { ...mapActions(['initVuex']) }
})
export default class App extends Vue {
  // vuex
  initVuex!: (data: VuexData) => void;
  loading!: boolean;
  //
  setting = false;

  created() {
    const data = persistenceService.getVuexData();
    this.initVuex(data);
  }
}
</script>
