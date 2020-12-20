<template>
  <v-card class="mx-auto my-12" max-width="374">
    <v-card-title>Ring, Health: 60%</v-card-title>
    <v-card-subtitle>epic, speed</v-card-subtitle>
    <v-divider />
    <v-card-text>Health: 60</v-card-text>
    <v-divider />
    <v-card-text>Health: 60</v-card-text>
    <v-divider />
    <v-card-text>Health: 60</v-card-text>
    <v-divider />
    <v-card-text>Health: 60</v-card-text>
  </v-card>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';

@Component
export default class GearDetail extends Vue {
  name: string = 'gear-detail';
  @Prop() readonly item!: any;
  form = {};
  step: number = 1;
  creating: Boolean = false;

  createItem() {
    this.form = Object.assign({}, this.item);
    this.step = 2;
  }

  submit() {
    this.$emit('submit', this.form);
    this.step = 1;
  }

  cancel() {
    this.step = 1;
  }
}
</script>
