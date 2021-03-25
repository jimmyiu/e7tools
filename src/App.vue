<template>
  <v-app>
    <top-nav />
    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>
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

  created() {
    const data = persistenceService.getVuexData();
    this.initVuex(data);
  }
}
</script>
