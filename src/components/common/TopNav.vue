<template>
  <v-app-bar app dark dense flat>
    <!-- <v-btn icon @click="goHomepage"><v-icon>mdi-home</v-icon></v-btn> -->
    <v-btn icon @click="toggleMenu"><v-icon>mdi-menu</v-icon></v-btn>
    <!-- <v-icon>mdi-home</v-icon> -->
    <!-- <site-icon /> -->
    <!-- <v-btn class="ml-1" depressed to="gear">
      Gear
      <v-icon right>mdi-chevron-down</v-icon>
    </v-btn> -->
    <!-- <v-menu bottom offset-y open-on-hover>
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-bind="attrs" class="ml-1" depressed v-on="on">
          Gear
          <v-icon right>mdi-chevron-down</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item link :to="{ name: 'gear' }">
          <v-list-item-title>Gear</v-list-item-title>
        </v-list-item>
        <v-list-item link :to="{ name: 'import' }">
          <v-list-item-title>Import</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu> -->
    <v-btn class="ml-1" depressed :to="{ name: 'gear' }">
      Gear
    </v-btn>
    <v-btn class="ml-1" depressed :to="{ name: 'hero' }">
      Hero
    </v-btn>
    <v-btn class="ml-1" depressed :to="{ name: 'optimizer' }">
      Optimizer
    </v-btn>
    <!-- <v-menu bottom offset-y open-on-hover>
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-bind="attrs" class="ml-1" depressed v-on="on">
          Others
          <v-icon right>mdi-chevron-down</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item link :to="{ name: 'hero' }">
          <v-list-item-title>Hero</v-list-item-title>
        </v-list-item>
        <v-list-item link :to="{ name: 'import' }">
          <v-list-item-title>Import</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu> -->
    <!-- <v-btn class="ml-1" depressed to="dev">
      Dev
    </v-btn> -->
    <v-spacer />
    <v-btn icon @click="toggleSetting"><v-icon>mdi-cog</v-icon></v-btn>
    <!-- <v-switch hide-details @change="toggleDarkMode"></v-switch> -->
  </v-app-bar>
</template>
<style lang="sass" scoped>
::v-deep .v-btn.menu
  margin-left: -12px
  width: 42px
  height: 42px
  min-width: 42px
::v-deep .v-btn
  padding: 0 8px !important
</style>
<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';
import { mapActions } from 'vuex';
import SiteIcon from './SiteIcon.vue';
import SiteMenu from './SiteMenu.vue';

@Component({
  name: 'top-nav',
  components: { SiteIcon, SiteMenu }
})
export default class TopNav extends Vue {
  toggleDarkMode() {
    this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
  }

  @Emit()
  toggleMenu() {}

  @Emit()
  toggleSetting() {}

  goHomepage() {
    this.$router.push({ name: 'home' }).catch(err => {
      // ignore duplicate
    });
  }
}
</script>
