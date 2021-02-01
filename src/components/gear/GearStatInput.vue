<template>
  <v-card class="gear-stat-input" color="section" flat width="100%">
    <v-card-text :class="{ 'pb-0': dense, 'pt-3 px-2': true }">
      <v-text-field
        dense
        :disabled="value.stat == undefined"
        hide-details
        :label="label"
        outlined
        type="number"
        :value="value.value"
        @input="input"
      />
      <v-slider :disabled="true" hide-details :max="0" :min="1" />
    </v-card-text>
    <!-- <v-card-text v-else :class="{ 'pt-2 pb-0': dense, 'px-2': true }" style="min-height: 100%">
    </v-card-text> -->
  </v-card>
</template>
<script lang="ts">
import { Gear } from '@/models';
import { Vue, Component, Prop, Emit, Model } from 'vue-property-decorator';

class Config {
  constructor(public readonly min: number, public readonly max: number) {}
}

/**
 * TODO: add slider
 */
@Component({
  name: 'gear-stat-input'
})
export default class GearStatInput extends Vue {
  readonly NULL_CONFIG = new Config(0, 1);
  readonly SLIDER_CONFIG = [
    { id: 'hpp', main: new Config(0, 70), sub: new Config(0, 70) },
    { id: 'hp', main: new Config(0, 600), sub: new Config(0, 500) },
    { id: 'defp', main: new Config(0, 70), sub: new Config(0, 70) },
    { id: 'def', main: new Config(0, 600), sub: new Config(0, 500) },
    { id: 'atkp', main: new Config(0, 70), sub: new Config(0, 70) },
    { id: 'atk', main: new Config(0, 600), sub: new Config(0, 500) },
    { id: 'cri', main: new Config(0, 70), sub: new Config(0, 70) },
    { id: 'cdmg', main: new Config(0, 600), sub: new Config(0, 500) },
    { id: 'spd', main: new Config(6, 45), sub: new Config(1, 35) },
    { id: 'eff', main: new Config(0, 600), sub: new Config(0, 500) },
    { id: 'res', main: new Config(0, 70), sub: new Config(0, 70) }
  ];

  @Model('input') value!: Gear.StatInput;
  @Prop({ default: null }) readonly mode!: string;
  @Prop({ type: Boolean, default: false }) readonly dense!: Boolean;
  // get config(): Config {
  // if (this.stat == null) {
  //   return this.NULL_CONFIG;
  // }
  // let obj = this.SLIDER_CONFIG.find(it => it.id == this.stat.value);
  // if (obj != null) {
  //   return this.mode == 'main' ? obj.main : obj.sub;
  // }
  //   return this.NULL_CONFIG;
  // }

  get label(): string {
    if (this.value.stat != undefined) {
      return this.mode.toUpperCase() + ': ' + this.value.stat.label;
    }
    return '';
  }

  @Emit()
  input(value: number) {
    const result = Object.assign({}, this.value);
    result.value = value;
    return result;
  }
}
</script>
