<template>
  <!-- <v-sheet class="pa-2 mt-2" :class="{ 'card-size': $vuetify.breakpoint.smAndUp }" rounded>
    <v-row no-gutters>
      <v-col class="d-flex align-center" cols="12">
        <v-btn icon small @click="visible = !visible">
          <v-icon>{{ visible ? 'mdi-chevron-down' : 'mdi-chevron-up' }}</v-icon>
        </v-btn>
        <div class="ml-1 mr-3">Display</div>
        <v-divider />
        <v-btn icon small @click="reset"><v-icon size="21">mdi-delete-outline</v-icon></v-btn>
      </v-col>
    </v-row>
    <v-row dense>
      <v-col class="d-flex">
        <div>Speed</div>
        <v-btn-toggle>
          <v-btn depressed min-height="38" min-width="28" small>
            <v-icon>mdi-chevron-up</v-icon>
          </v-btn>
          <v-btn depressed min-height="38" min-width="38" small>
            <v-icon>mdi-chevron-down</v-icon>
          </v-btn>
        </v-btn-toggle>
        <div>
          Max: 10, 25%: 7
        </div>
        <v-text-field dense hide-details outlined type="number" />
      </v-col>
    </v-row>
  </v-sheet> -->
  <div :class="{ 'card-size': $vuetify.breakpoint.smAndUp }" title="Sorting &amp; Filtering" @reset="reset">
    <v-row class="mt-1 pl-1" dense>
      <template v-for="(stat, key) in stats">
        <v-col :key="`${key}-1`" align-self="center" cols="1">
          <gear-stat-icon :stat="stat" />
        </v-col>
        <v-col :key="`${key}-2`" class="d-flex align-center" cols="5">
          <v-text-field class="mr-1" dense hide-details label="Min" min="0" outlined type="number" />
          <v-btn icon @click="sort"><v-icon color="grey">mdi-sort-numeric-descending</v-icon></v-btn>
        </v-col>
      </template>
    </v-row>
    <!-- <v-row dense>
      <v-col cols="auto">
        HP (1024/738/10)
      </v-col>
      <v-col cols="3">
        <v-text-field dense hide-details outlined type="number" />
      </v-col>
      <v-col cols="1">
        <v-btn icon @click="sort"><v-icon color="grey">mdi-sort-alphabetical-ascending</v-icon></v-btn>
      </v-col>
    </v-row> -->
  </div>
</template>
<style lang="sass" scoped>
.card-size
  max-width: 328px
  min-width: 328px
</style>
<script lang="ts">
import { Constants, Gear } from '@/models';
import { Vue, Component, Prop, Emit, Model } from 'vue-property-decorator';
import TitleSheet from '../common/TitleSheet.vue';
import { GearStatIcon } from './common';

@Component({
  name: 'gear-list-view-display-config-sheet',
  components: { TitleSheet, GearStatIcon }
})
export default class GearListViewDisplayConfigSheet extends Vue {
  visible: boolean = true;
  readonly stats = Constants.HERO_STATS;

  sort() {
    console.log('sort::clicked');
  }

  reset() {
    console.log('reset');
    // this.form.type = undefined;
    // this.form.sets.splice(0);
    // this.form.main = false;
    // this.form.levelMode = Gear.LevelFilterMode.ALL;
    // this.form.enhanceMode = Gear.EnhanceModeFilter.ALL;
  }
}
</script>
