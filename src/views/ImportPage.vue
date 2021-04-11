<template>
  <div>
    Instruction:<br />
    <ul>
      <li>
        This importer supports the JSON format of these sites:
        <a href="https://github.com/e7-tools/gear-reader" target="_blank">E7 Gear Reader</a> /
        <a href="https://github.com/Zarroc2762/E7-Gear-Optimizer" target="_blank">E7 Gear Optimizer</a> /
        <a href="https://github.com/fribbels/Fribbels-Epic-7-Optimizer" target="_blank">Fribbels Optimizer</a>
      </li>
      <li>Gear will be replaced if the ID is the same</li>
    </ul>
    <v-divider class="my-5" />
    E7 Gear Reader / E7 Gear Optimizer<br />
    Paste the JSON here:
    <v-textarea v-model="sample"></v-textarea>
    <v-btn :loading="loading" @click="importGears">Import</v-btn>
    <v-divider class="my-5" />
    Fribbels Optimizer<br />
    Paste the JSON here:
    <v-textarea v-model="sampleFribbels"></v-textarea>
    <v-btn :loading="loading" @click="importFribbels">Replace</v-btn>
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
import { mapActions, mapGetters } from 'vuex';
import ImportService from '@/services/import-service';
import { ImportFribbelsService } from '@/services';
import { gearService } from '@/services';
import { Gear } from '@/models/gear';

@Component({
  name: 'import-page',
  computed: { ...mapGetters(['gears']) },
  methods: { ...mapActions(['saveGears', 'replaceGears']) }
})
export default class GearPage extends Vue {
  readonly sample = JSON.stringify(require('@/assets/json/import-sample.json'));
  readonly sampleFribbels = JSON.stringify(require('@/assets/json/import-sample-fribbels.json'));
  readonly gears!: Gear.Gear[];
  saveGears!: (a: any) => any;
  replaceGears!: (gears: Gear.Gear[]) => void;
  loading = false;
  complete = false;
  number = 0;

  created() {
    // console.log(this.addGears);
  }

  importGears($event: any) {
    let converted = Array<Gear.Gear>();
    JSON.parse(this.sample).items.forEach((it: any) => {
      let foo = ImportService.convert(it);
      converted.push(foo);
      // console.log(foo);
    });
    this.number = converted.length;
    this.saveGears(gearService.mergeGears(this.gears, converted));
    this.loading = false;
    this.complete = true;
  }

  importFribbels() {
    let converted = Array<Gear.Gear>();
    let items = JSON.parse(this.sampleFribbels).items;
    console.log(items.length);
    items.forEach((it: any) => {
      let foo = ImportFribbelsService.convert(it);
      converted.push(foo);
    });
    this.number = converted.length;
    // const newGears = ;
    this.replaceGears(gearService.replaceGears(this.gears, converted));
    // this.saveGears(newGears);
    console.log(converted[0]);
    this.complete = true;
  }
}
</script>
