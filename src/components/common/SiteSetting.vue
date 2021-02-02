<template>
  <v-navigation-drawer fixed right temporary :value="visible" @input="input">
    <v-list-item>
      <v-list-item-title class="font-weight-bold">
        Settings
      </v-list-item-title>
    </v-list-item>
    <v-divider />
    <v-list-item>
      <v-list-item-content>
        Data &amp; Settings
        <div class="d-flex mt-1">
          <v-spacer />
          <setting-import />
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
                <v-textarea ref="export-data" outlined readonly :value="exportData" />
              </v-card-text>
              <v-divider></v-divider>
              <v-card-actions>
                <v-btn color="primary" @click="copy">
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
                Clear
              </v-btn>
            </template>
            <v-card>
              <v-card-title class="error">
                Confirmation
              </v-card-title>
              <v-card-text>
                <br />
                Clear all data &amp; settings?<br />
                The page will be reloaded.
              </v-card-text>
              <v-divider></v-divider>
              <v-card-actions>
                <v-btn color="primary" @click="performClear">
                  OK
                </v-btn>
                <v-btn text @click="clearDialog = false">
                  CANCEL
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
      </v-list-item-content>
    </v-list-item>
    <v-divider />
    <v-list-item>
      <v-list-item-content>
        Theme
      </v-list-item-content>
      <v-list-item-action>
        <v-switch hide-details @change="toggleDarkMode"></v-switch>
      </v-list-item-action>
    </v-list-item>
  </v-navigation-drawer>
</template>
<script lang="ts">
import { Vue, Component, Prop, Model, Emit } from 'vue-property-decorator';
import SettingImport from './SettingImport.vue';
import { Constants } from '@/models';

@Component({
  name: 'site-setting',
  components: { SettingImport }
})
export default class SiteSetting extends Vue {
  clearDialog = false;
  dialog = {
    clear: false,
    export: false
  };
  @Model('input') readonly visible!: boolean;

  get exportData() {
    return localStorage.getItem(Constants.KEY_VUEXDATA);
  }

  toggleDarkMode() {
    this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
  }

  performClear() {
    localStorage.clear();
    this.clearDialog = false;
    this.$router.go(0);
  }

  copy() {
    (this.$refs['export-data'] as any).$el.querySelector('textarea').select();
    document.execCommand('copy');
  }

  @Emit()
  input(value: boolean) {
    return value;
  }
}
</script>
