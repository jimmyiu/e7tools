<template>
  <v-dialog v-model="dialog">
    <template v-slot:activator="{ on, attrs }">
      <v-btn v-bind="attrs" class="mr-2" color="success" dark small v-on="on">
        Import
      </v-btn>
    </template>
    <v-card>
      <v-toolbar color="success">Import</v-toolbar>
      <v-card-text>
        <br />Paste previous exported JSON here, and then click 'Import'
        <v-textarea ref="import-data" v-model="data" filled hide-details="" />
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn class="font-weight-bold" color="primary" :disabled="data == ''" text @click="importData">
          Import
        </v-btn>
        <v-btn color="" text @click="dialog = false">
          CLOSE
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script lang="ts">
import { Constants } from '@/models';
import { PersistentData } from '@/models/persistence';
import { DataConverterFactory } from '@/services/data-converter';
import { Vue, Component, Prop, Model, Emit } from 'vue-property-decorator';

@Component({
  name: 'import-setting-btn'
})
export default class ImportSettingBtn extends Vue {
  dialog = false;
  data: string = '';

  importData() {
    // localStorage.clear();
    const importData = JSON.parse(this.data) as PersistentData;
    console.log('importData::data.version =', importData.version);
    if (importData.version == Constants.CURRENT_PERSISTENT_DATA_VERSION) {
      localStorage.setItem(Constants.KEY_VUEXDATA, this.data);
    } else {
      console.log('importData::data conversion starts');
      const result = DataConverterFactory.getDataConverter(importData.version).convert(importData);
    }
    this.$router.go(0);
  }
}
</script>
