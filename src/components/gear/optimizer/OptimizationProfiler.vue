<template>
  <v-row>
    <v-col cols="12" md="auto">
      <div style="max-width: 340px">
        <v-autocomplete
          v-model="value.hero"
          class="mb-4"
          hide-details
          item-text="name"
          item-value="id"
          :items="e7db.heros"
          label="Hero"
          outlined
          return-object
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
        <optimization-criteria v-model="value.criteria" />
      </div>
    </v-col>
    <v-col cols="12" md="auto">
      <optimization-filter v-model="value.filter" />
    </v-col>
    <v-col> </v-col>
  </v-row>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Model } from 'vue-property-decorator';
import OptimizationCriteria from './OptimizationCriteria.vue';
import OptimizationFilter from './OptimizationFilter.vue';
import { OptimizationProfile } from '@/models';
import { mapState } from 'vuex';

@Component({
  name: 'optimization-profiler',
  components: { OptimizationCriteria, OptimizationFilter },
  computed: { ...mapState(['gears', 'e7db']) }
})
export default class OptimizationProfiler extends Vue {
  @Model() readonly value!: OptimizationProfile;
}
</script>
