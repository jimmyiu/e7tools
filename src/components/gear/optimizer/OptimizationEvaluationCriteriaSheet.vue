<template>
  <v-sheet class="mx-auto pa-2">
    <v-row dense>
      <v-col class="d-flex justify-center align-center">
        <!-- <v-divider /> -->
        <div class="mr-2">Evaluation Filter</div>
        <v-divider />
      </v-col>
    </v-row>
    <v-row dense>
      <v-col>
        <v-select
          v-model="value.forcedSets"
          class="mb-2"
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
        <v-text-field v-model.number="value.limit" dense hide-details label="Evaluation Limit" outlined type="number" />
        <v-checkbox
          v-model="value.brokenSet"
          class="mr-3 my-0"
          dense
          hide-details
          label="Allow Broken Set"
        ></v-checkbox>
        <v-checkbox v-model="value.lv85" class="mr-3 my-0" dense hide-details label="With Lv85 Gear" />
      </v-col>
    </v-row>
  </v-sheet>
</template>
<style lang="sass" scoped>
.sheet-size
  max-width: 300px
</style>
<script lang="ts">
import { Vue, Component, Prop, Emit, Model } from 'vue-property-decorator';
import { OptimizationEvaluationCriteria, OptimizationHero } from '@/models/optimizer';
import { mapGetters } from 'vuex';
import { Gear } from '@/models';

@Component({
  name: 'optimization-evaluation-criteria-sheet',
  computed: { ...mapGetters(['heros']) }
})
export default class OptimizationEvaluationCriteriaSheet extends Vue {
  @Model() readonly value!: OptimizationEvaluationCriteria;
  get sets() {
    return Object.values(Gear.Set);
  }
}
</script>
