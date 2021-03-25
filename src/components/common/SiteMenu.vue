<template>
  <v-navigation-drawer app left temporary :value="visible" @input="input">
    <v-list-item>
      <v-list-item-title class="font-weight-bold">
        Menu
      </v-list-item-title>
    </v-list-item>
    <!-- <v-divider />
    <data-setting-list-item />
    <v-divider />
    <e7db-cache-setting-item /> -->
    <v-divider />
    <v-list dense nav>
      <v-list-item link @click.stop="goHomepage">
        <v-list-item-icon>
          <v-icon>mdi-home</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          Home
        </v-list-item-content>
      </v-list-item>
      <v-list-item link :to="{ name: 'import' }">
        <v-list-item-icon>
          <v-icon>mdi-import</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          Import
        </v-list-item-content>
      </v-list-item>
      <v-list-item link :to="{ name: 'other' }">
        <v-list-item-icon>
          <v-icon>mdi-dots-horizontal-circle-outline</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          Others
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
<script lang="ts">
import { Vue, Component, Prop, Model, Emit } from 'vue-property-decorator';
import { E7dbCacheSettingItem, DataSettingListItem } from './setting';

@Component({
  name: 'site-menu',
  components: { E7dbCacheSettingItem, DataSettingListItem }
})
export default class SiteMenu extends Vue {
  @Model('input') readonly visible!: boolean;

  @Emit()
  input(value: boolean) {
    return value;
  }

  goHomepage() {
    this.$router.push({ name: 'home' }).catch(err => {
      // ignore duplicate
    });
  }
}
</script>
