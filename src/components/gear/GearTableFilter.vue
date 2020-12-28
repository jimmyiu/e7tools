<template>
  <div>
    <v-card class="mb-3">
      <v-card-text class="px-3 pt-3 pb-0">
        <div class="d-flex flex-wrap">
          <v-btn-toggle v-model="form.type" class="gear-filter mr-3 mb-3" dense>
            <v-btn v-for="(item, index) in types" :key="index" :value="item">
              <gear-type-icon small :type="item" />
            </v-btn>
          </v-btn-toggle>
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
          <div class="d-flex flex-wrap">
            <span v-for="(set, i) in sets" :key="i" :class="{ 'mr-2': i == sets.length - 1, 'mb-3': true }">
              <v-btn-toggle v-model="form.sets" class="gear-filter" dense multiple>
                <v-btn v-for="(item, index) in set" :key="index" :value="item">
                  <gear-set-icon :set="item" small />
                </v-btn>
              </v-btn-toggle>
            </span>
          </div>
          <div class="flex-grow-1">
            <v-btn class="mb-3 float-right" outlined text @click="reset()">
              Reset
            </v-btn>
          </div>
        </div>
      </v-card-text>
    </v-card>
    <!-- <v-row class="mb-1" dense no-gutters>
      <v-col sm="9">
        <v-btn-toggle v-model="form.type" class="gear-filter" dense>
          <v-btn v-for="(item, index) in types" :key="index" :value="item">
            <gear-type-icon small :type="item" />
          </v-btn>
        </v-btn-toggle>
      </v-col>
      <v-col sm="1">
        <v-btn-toggle v-model="form.level" class="ml-2" dense rounded>
          <v-btn depressed min-width="42" :value="85">85</v-btn>
          <v-btn depressed min-width="42" :value="90">90</v-btn>
        </v-btn-toggle>
      </v-col>
      <v-col sm="1">
        <v-btn-toggle v-model="form.enhanceMode" class="ml-2" dense rounded>
          <v-btn depressed min-width="42" :value="1">15-</v-btn>
          <v-btn depressed min-width="42" :value="2">15</v-btn>
        </v-btn-toggle>
      </v-col>
      <v-col sm="2">
        
      </v-col>
    </v-row> -->
    <!-- <v-row dense no-gutters>
      <v-col>
        <span v-for="(set, i) in sets" :key="i" class="mr-0">
          <v-btn-toggle v-model="form.sets" class="gear-filter" dense multiple>
            <v-btn v-for="(item, index) in set" :key="index" :value="item">
              <gear-set-icon :set="item" small />
            </v-btn>
          </v-btn-toggle>
        </span>
      </v-col>
      <v-col cols="1">
      </v-col>
    </v-row> -->
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit, Model } from 'vue-property-decorator';
import { Gear } from '@/models';
import GearSetIcon from './GearSetIcon.vue';
import GearTypeIcon from './GearTypeIcon.vue';

@Component({
  name: 'gear-table-filter',
  components: {
    GearSetIcon,
    GearTypeIcon
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
