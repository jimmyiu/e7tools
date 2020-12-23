<template>
  <div>
    <v-textarea readonly :value="sample"></v-textarea>
    <v-btn :loading="loading" @click="importGears">Import</v-btn>
    <v-snackbar v-model="complete">
      You have imported {{ number }} gears
      <template v-slot:action="{ attrs }">
        <v-btn v-bind="attrs" color="red" text @click="complete = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import ImportService from '@/services/import-service';

@Component({
  name: 'import-page'
})
export default class GearPage extends Vue {
  readonly sample = JSON.stringify(require('@/assets/json/import-sample.json'));
  loading = false;
  complete = false;
  number = 0;
  importGears($event: any) {
    this.loading = true;
    let items = JSON.parse(this.sample);
    items.items.forEach((it: any) => {
      // console.log(it);
      let foo = ImportService.convert(it);
      console.log(foo);
    });
    this.number = items.items.length;
    this.complete = true;
    this.loading = false;
  }
}
</script>
