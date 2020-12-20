<template>
  <v-card class="gear-stat-input" color="section" flat width="100%">
    <v-card-text :class="{ 'pb-0': dense, 'pt-3 px-2': true }">
      <v-text-field
        dense
        :disabled="!stat"
        hide-details
        :label="label"
        outlined
        type="number"
        :value="value"
        @input="input"
      />
      <v-slider
        :disabled="!stat"
        hide-details
        :max="config.max"
        :min="config.min"
        :value="value < config.max ? value : config.max"
        @input="input"
      />
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
@Component
export default class GearStatInput extends Vue {
  name: string = 'gear-stat-input';
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

  @Model('input') value!: number;
  @Prop({ default: null }) readonly mode!: string;
  @Prop({ default: null }) readonly stat!: Gear.Stat;
  @Prop({ type: Boolean, default: false }) readonly dense!: Boolean;
  get config(): Config {
    if (this.stat == null) {
      return this.NULL_CONFIG;
    }
    let obj = this.SLIDER_CONFIG.find(it => it.id == this.stat.value);
    if (obj != null) {
      return this.mode == 'main' ? obj.main : obj.sub;
    }
    return this.NULL_CONFIG;
  }

  get label(): string {
    if (this.mode != null && this.stat != null) {
      return this.mode.toUpperCase() + ': ' + this.stat.label;
    }
    return '';
  }

  input(value: number) {
    this.$emit('input', value);
  }
}
</script>
