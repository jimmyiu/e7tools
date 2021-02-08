<template>
  <v-list-item>
    <v-list-item-content>
      Data &amp; Settings
      <div class="d-flex mt-1">
        <v-spacer />
        <import-setting-btn />
        <v-dialog v-model="dialog.export">
          <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" class="mr-2" color="primary" dark small v-on="on">
              Export
            </v-btn>
          </template>
          <v-card>
            <v-card-title class="primary">
              Export
            </v-card-title>
            <v-card-text>
              <br />
              <v-textarea ref="export-data" outlined readonly :value="exportData()" />
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-btn class="font-weight-bold" color="primary" text @click="copy">
                COPY
              </v-btn>
              <v-btn text @click="dialog.export = false">
                CLOSE
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="clearDialog" width="300">
          <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" color="error" dark small v-on="on">
              Delete
            </v-btn>
          </template>
          <v-card>
            <v-card-title class="error">
              Caution
            </v-card-title>
            <v-card-text>
              <br />
              Delete all data &amp; settings?<br />
              The page will be reloaded.
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-btn class="font-weight-bold" color="primary" text @click="performClear">
                DELETE
              </v-btn>
              <v-btn text @click="clearDialog = false">
                CANCEL
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </v-list-item-content>
    <v-snackbar v-model="dialog.exportComplete" app color="success" rounded="pill" timeout="1500">
      <div class="text-center">Copied to clipboard</div>
    </v-snackbar>
  </v-list-item>
</template>
<script lang="ts">
import { Constants } from '@/models';
import ImportSettingBtn from './ImportSettingBtn.vue';
import { Vue, Component, Prop, Model, Emit } from 'vue-property-decorator';

@Component({
  name: 'data-setting-item',
  components: { ImportSettingBtn }
})
export default class DataSettingItem extends Vue {
  clearDialog = false;
  dialog = {
    clear: false,
    export: false,
    exportComplete: false
  };

  exportData() {
    return localStorage.getItem(Constants.KEY_VUEXDATA);
  }

  performClear() {
    // localStorage.clear();
    localStorage.removeItem(Constants.KEY_VUEXDATA);
    this.clearDialog = false;
    this.$router.go(0);
  }

  copy() {
    (this.$refs['export-data'] as any).$el.querySelector('textarea').select();
    document.execCommand('copy');
    this.dialog.export = false;
    this.dialog.exportComplete = true;
  }
}
</script>
