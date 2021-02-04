<template>
  <v-list-item>
    <v-list-item-content>
      E7DB Cache
    </v-list-item-content>
    <v-list-item-action>
      <div class="d-flex justify-center align-center" style="height: 36px; width: 36px">
        <v-btn v-if="!loading" icon @click="refresh"><v-icon>refresh</v-icon></v-btn>
        <div><v-progress-circular v-if="loading" color="primary" indeterminate size="24" /></div>
      </div>
      <!-- <v-tooltip left>
        <template v-slot:activator="{ on, attrs }">
          <v-icon v-bind="attrs" v-on="on">
            help_outline
          </v-icon>
        </template>
        <span>Cached data from epicsevendb</span>
      </v-tooltip> -->
    </v-list-item-action>
  </v-list-item>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { mapActions } from 'vuex';

@Component({
  name: 'e7db-cache-setting-item',
  methods: mapActions(['initE7dbData'])
})
export default class E7dbCacheSettingItem extends Vue {
  initE7dbData!: () => Promise<void>;
  loading = false;

  async refresh() {
    this.loading = true;
    await this.initE7dbData();
    this.loading = false;
  }
}
</script>
