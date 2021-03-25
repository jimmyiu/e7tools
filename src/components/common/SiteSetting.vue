<template>
  <v-navigation-drawer app right temporary :value="visible" @input="input">
    <v-list-item>
      <v-list-item-title class="font-weight-bold">
        Settings
      </v-list-item-title>
    </v-list-item>
    <v-divider />
    <data-setting-list-item />
    <v-divider />
    <e7db-cache-setting-item />
    <v-divider />
    <v-list-item>
      <v-list-item-content>
        Theme
      </v-list-item-content>
      <v-list-item-action>
        <v-switch hide-details @change="toggleDarkMode"></v-switch>
      </v-list-item-action>
    </v-list-item>
    <v-divider />
    <v-list-item>
      <v-list-item-content>
        Version
      </v-list-item-content>
      <v-list-item-action>
        {{ version }}
      </v-list-item-action>
    </v-list-item>
  </v-navigation-drawer>
</template>
<script lang="ts">
import { Vue, Component, Prop, Model, Emit } from 'vue-property-decorator';
import { E7dbCacheSettingItem, DataSettingListItem } from './setting';
import { Constants } from '@/models';

@Component({
  name: 'site-setting',
  components: { E7dbCacheSettingItem, DataSettingListItem }
})
export default class SiteSetting extends Vue {
  @Model('input') readonly visible!: boolean;

  get version() {
    return Constants.CURRENT_PERSISTENT_DATA_VERSION;
  }

  toggleDarkMode() {
    this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
  }

  @Emit()
  input(value: boolean) {
    return value;
  }
}
</script>
