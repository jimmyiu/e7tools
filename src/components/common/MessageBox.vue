<template>
  <v-alert border="top">
    <div class="d-flex flex-row justify-space-between">
      <div class="font-weight-bold  align-self-center">{{ title }}</div>
      <v-btn icon shaped @click="show = !show"
        ><v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon></v-btn
      >
    </div>
    <v-expand-transition>
      <div v-show="show">
        <v-divider class="my-2" />
        <slot></slot>
      </div>
    </v-expand-transition>
  </v-alert>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class MessageBox extends Vue {
  name: string = 'message-box';
  @Prop() title!: string;
  @Prop({ type: Boolean, default: false }) hideDefault!: Boolean;
  show = false;

  created() {
    this.show = !this.hideDefault;
  }
}
</script>
