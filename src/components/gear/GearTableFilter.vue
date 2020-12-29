<template>
  <div>
    <v-card class="mb-3">
      <v-card-text class="px-3 pt-3 pb-0">
        <div class="d-flex flex-wrap">
          <gear-type-select v-model="form.type" class="mr-3 mb-3" />
          <v-btn-toggle v-model="form.level" class="mr-3 mb-3" dense rounded>
            <v-btn depressed min-width="42" :value="85">85</v-btn>
            <v-btn depressed min-width="42" :value="90">90</v-btn>
          </v-btn-toggle>
          <v-btn-toggle v-model="form.enhanceMode" class="mr-3 mb-3" dense rounded>
            <v-btn depressed min-width="42" :value="1">15-</v-btn>
            <v-btn depressed min-width="42" :value="2">15</v-btn>
          </v-btn-toggle>
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <span v-on="on">
                <v-checkbox
                  v-model="form.main"
                  v-bind="attrs"
                  class="mr-3 mb-3 mt-0"
                  dense
                  hide-details
                  label="Main"
                ></v-checkbox>
              </span>
            </template>
            <span>Display main stat value in the table</span>
          </v-tooltip>
        </div>
        <div class="d-flex flex-wrap justify-space-between">
          <gear-set-select v-model="form.sets" multiple />
          <div class="flex-grow-1">
            <v-btn class="mb-3 float-right" outlined text @click="reset()">
              Reset
            </v-btn>
          </div>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit, Model } from 'vue-property-decorator';
import { Gear } from '@/models';
import { GearSetIcon, GearSetSelect, GearTypeIcon, GearTypeSelect } from './common';

@Component({
  name: 'gear-table-filter',
  components: {
    GearSetIcon,
    GearSetSelect,
    GearTypeIcon,
    GearTypeSelect
  }
})
export default class GearTableFilter extends Vue {
  types = Object.values(Gear.Type);
  sets = Gear.SETS;
  @Model() readonly form!: Gear.TableFilter;

  reset() {
    this.form.type = undefined;
    this.form.sets.splice(0);
    this.form.mode = 0;
    this.form.level = 0;
    this.form.main = true;
    this.form.enhanceMode = 0;
  }
}
</script>
