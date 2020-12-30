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
      </v-list-item-content>
      <v-list-item-action>
        <v-dialog v-model="clearDialog" width="300">
          <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" color="primary" dark small v-on="on">
              Clear
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              Confirmation
            </v-card-title>
            <v-card-text>
              Clear all data &amp; settings?<br />
              The page will be reloaded.
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" text @click="performClear">
                OK
              </v-btn>
              <v-btn color="secondary" text @click="clearDialog = false">
                CANCEL
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-list-item-action>
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
import { mapActions } from 'vuex';

@Component({
  name: 'site-setting'
})
export default class SiteSetting extends Vue {
  clearDialog = false;
  @Model('input') readonly visible!: boolean;

  toggleDarkMode() {
    this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
  }

  performClear() {
    localStorage.clear();
    this.clearDialog = false;
    this.$router.go(0);
  }

  @Emit()
  input(value: boolean) {
    return value;
  }
}
</script>
