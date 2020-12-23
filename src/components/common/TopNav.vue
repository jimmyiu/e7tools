<template>
  <v-app-bar app dark dense flat>
    <!-- <v-avatar color="secondary" size="36"><v-icon>mdi-menu</v-icon></v-avatar> -->
    <!-- <v-btn class="menu" elevation="0" rounded @click="toggleMenu"><v-icon>mdi-menu</v-icon></v-btn> -->
    <site-icon />
    <v-btn class="ml-2" depressed to="gear">
      Gear
      <!-- <v-icon right>mdi-chevron-down</v-icon> -->
    </v-btn>
    <v-btn class="ml-2" depressed to="import">
      Import
    </v-btn>
    <v-spacer />
    <v-switch hide-details @change="toggleDarkMode"></v-switch>
    <!-- <v-avatar class="hidden-sm-and-down" color="grey darken-1 shrink" size="32"> </v-avatar> -->
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

@Component({
  components: { SiteIcon }
})
export default class TopNav extends Vue {
  name: string = 'top-nav';
  links = [
    // { name: 'Home', link: '/' },
    { name: 'Gear', link: '/gear' }
  ];

  toggleDarkMode() {
    this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
  }

  @Emit()
  toggleMenu() {}
}
</script>
