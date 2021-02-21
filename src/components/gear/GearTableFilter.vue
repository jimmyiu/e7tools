<template>
  <div>
    <v-card class="mb-2">
      <v-card-text class="px-3 pt-3 pb-0">
        <div class="d-flex flex-wrap">
          <gear-type-select v-model="form.type" class="mr-3 mb-2" :figures="typeFigures" />
          <v-btn-toggle v-model="form.level" class="mr-3 mb-3" dense rounded>
            <v-btn depressed min-width="42" :value="85">85</v-btn>
            <v-btn depressed min-width="42" :value="90">90</v-btn>
          </v-btn-toggle>
          <v-btn-toggle v-model="form.enhanceMode" class="mr-3 mb-2" dense rounded>
            <v-btn depressed min-width="42" :value="1">15-</v-btn>
            <v-btn depressed min-width="42" :value="2">15</v-btn>
          </v-btn-toggle>
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <span v-on="on">
                <v-checkbox
                  v-model="form.main"
                  v-bind="attrs"
                  class="mr-3 mb-2 mt-0"
                  dense
                  hide-details
                  label="Main"
                ></v-checkbox>
              </span>
            </template>
            <span>Display main stat value in the table</span>
          </v-tooltip>
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <span v-on="on">
                <v-checkbox
                  v-model="form.equipped"
                  v-bind="attrs"
                  class="mr-3 mb-2 mt-0"
                  dense
                  hide-details
                  label="Equipped"
                ></v-checkbox>
              </span>
            </template>
            <span>Include equipped gears</span>
          </v-tooltip>
          <gear-set-select v-model="form.sets" :figures="setFigures" multiple />
        </div>
      </v-card-text>
      <v-divider class="mt-1" />
      <v-card-actions>
        <v-btn text @click="reset">Clear</v-btn>
      </v-card-actions>
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
  // types = Object.values(Gear.Type);
  // sets = Gear.SETS;
  @Model() readonly form!: Gear.TableFilter;
  @Prop() readonly gears!: Gear.Gear[];

  get typeFigures(): Gear.TypeFigures {
    const result = {
      Weapon: 0,
      Helmet: 0,
      Armor: 0,
      Necklace: 0,
      Ring: 0,
      Boot: 0
    };
    this.gears.forEach(x => result[x.type]++);
    return result;
  }

  get setFigures(): Gear.SetFigures {
    const result: Gear.SetFigures = {
      Speed: 0,
      Critical: 0,
      Hit: 0,
      Destruction: 0,
      LifeSteal: 0,
      Counter: 0,
      Resist: 0,
      Health: 0,
      Defense: 0,
      Attack: 0,
      Immunity: 0,
      Unity: 0,
      Rage: 0,
      Revenge: 0,
      Injury: 0,
      Penetration: 0
    };
    this.gears.forEach(x => result[x.set]++);
    return result;
  }

  reset() {
    this.form.type = undefined;
    this.form.sets.splice(0);
    this.form.mode = 0;
    this.form.level = 0;
    this.form.main = false;
    this.form.enhanceMode = Gear.EnhanceModeFilter.ALL;
  }
}
</script>
