<template>
  <v-row>
    <v-col cols="12" md="auto">
      <div style="max-width: 340px">
        <v-autocomplete
          v-model="value.heroId"
          class="mb-4"
          hide-details
          item-text="name"
          item-value="id"
          :items="heros"
          label="Hero"
          outlined
          @change="changeHero"
        >
          <template v-slot:item="data">
            <v-avatar class="mr-2" left size="32">
              <v-img :src="data.item.icon"></v-img>
            </v-avatar>
            {{ data.item.name }}
          </template>
          <template v-slot:selection="data">
            <v-avatar class="mr-2" left size="32">
              <v-img :src="data.item.icon"></v-img>
            </v-avatar>
            {{ data.item.name }}
          </template>
        </v-autocomplete>
        <optimization-criteria v-model="value.stat" />
      </div>
    </v-col>
    <v-col cols="12" md="auto">
      <optimization-filter v-model="value.filter" />
    </v-col>
    <v-col>
      <v-select
        v-model="value.combination.forcedSets"
        clear-icon="mdi-close-circle-outline"
        clearable
        dense
        hide-details
        :items="sets"
        label="Force Sets"
        multiple
        outlined
        return-object
      />
      <!-- <v-checkbox class="mr-3 my-0" dense hide-details label="Broken Set"></v-checkbox> -->
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Vue, Component, Model } from 'vue-property-decorator';
import OptimizationCriteria from './OptimizationCriteria.vue';
import OptimizationFilter from './OptimizationFilter.vue';
import { Gear, OptimizationProfile } from '@/models';
import { mapGetters } from 'vuex';

@Component({
  name: 'optimization-profiler',
  components: { OptimizationCriteria, OptimizationFilter },
  computed: { ...mapGetters(['heros']) }
})
export default class OptimizationProfiler extends Vue {
  @Model() readonly value!: OptimizationProfile;

  get sets() {
    return Object.values(Gear.Set);
  }

  changeHero() {
    if (this.value.heroId) {
      this.$emit('change-hero', this.value.heroId);
    }
  }
}
</script>
