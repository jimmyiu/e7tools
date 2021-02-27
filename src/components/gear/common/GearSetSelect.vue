<template>
  <div>
    <div v-for="(set, i) in sets" :key="i" cols="auto">
      <v-btn-toggle
        class="gear-filter"
        :class="{ 'mb-2': i < 2 }"
        dense
        :multiple="multiple"
        :value="value"
        @change="change"
      >
        <v-btn v-for="(item, index) in set" :key="index" :class="{ 'with-figure': displayFigures }" :value="item">
          <div class="d-flex flex-column justify-center align-center">
            <gear-set-icon :set="item" />
            <div v-if="displayFigures" class="caption" style="margin-top: -4px">({{ figures[item] }})</div>
          </div>
        </v-btn>
      </v-btn-toggle>
    </div>
  </div>
  <!-- <v-row dense>
    
  </v-row> -->
  <!-- 'mr-2': i == sets.length - 1,  -->
  <!-- <div v-for="(set, i) in sets" :key="i" :class="{ 'mb-1': true }">
      <v-btn-toggle class="gear-filter" dense :multiple="multiple" :value="value" @change="change">
        <v-btn v-for="(item, index) in set" :key="index" :class="{ 'with-figure': displayFigures }" :value="item">
          <div class="d-flex flex-column justify-center align-center">
            <gear-set-icon :set="item" />
            <div v-if="displayFigures" class="caption" style="margin-top: -4px">({{ figures[item] }})</div>
          </div>
        </v-btn>
      </v-btn-toggle>
    </div> -->
  <!-- </v-sheet> -->
</template>
<script lang="ts">
import { Vue, Component, Prop, Model, Emit } from 'vue-property-decorator';
import { GearSetIcon } from './index';
import { Gear } from '@/models';

@Component({
  name: 'gear-set-select',
  components: {
    GearSetIcon
  }
})
export default class GearSetSelect extends Vue {
  @Model('change') value!: Gear.Set[] | Gear.Set;
  @Prop({ type: Boolean, default: false }) readonly multiple!: boolean;
  @Prop({ required: false }) readonly figures?: Gear.SetFigures;

  readonly sets = [
    [Gear.Set.Speed, Gear.Set.Critical, Gear.Set.Hit, Gear.Set.Attack, Gear.Set.Health, Gear.Set.Defense],
    [Gear.Set.Immunity, Gear.Set.Unity, Gear.Set.Rage, Gear.Set.Revenge, Gear.Set.Injury, Gear.Set.Penetration],
    [Gear.Set.Destruction, Gear.Set.Counter, Gear.Set.LifeSteal, Gear.Set.Resist]
  ];

  get displayFigures() {
    return this.figures != undefined;
  }

  @Emit()
  change(value: Gear.Set[] | Gear.Set) {
    console.log(`change::value = ${value}`);
    return value;
  }
}
</script>
