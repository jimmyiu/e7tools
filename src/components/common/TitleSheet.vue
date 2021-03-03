<template>
  <v-sheet class="pa-2" :class="{ 'card-size': $vuetify.breakpoint.smAndUp }" rounded>
    <v-row no-gutters>
      <v-col class="d-flex align-center" cols="12">
        <v-btn icon small @click="visible = !visible">
          <v-icon>{{ visible ? 'mdi-chevron-down' : 'mdi-chevron-up' }}</v-icon>
        </v-btn>
        <div class="ml-1 mr-3">{{ title }}</div>
        <v-divider />
        <v-btn v-if="reset" icon small @click="$emit('reset')"><v-icon size="21">mdi-delete-outline</v-icon></v-btn>
      </v-col>
    </v-row>
    <v-row v-if="visible" class="mt-0" no-gutters>
      <v-col cols="12">
        <slot />
      </v-col>
    </v-row>
  </v-sheet>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit, Model } from 'vue-property-decorator';

@Component({
  name: 'title-sheet'
})
export default class TitleSheet extends Vue {
  visible: boolean = true;
  @Prop() readonly title!: string;
  @Prop({ required: false, default: true }) readonly reset!: boolean;
}
</script>
