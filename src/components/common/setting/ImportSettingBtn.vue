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
        <br />Paste previous exported JSON here, and then click 'Import' <br />
        <span style="color: red">
          CAUTION: existing data will be replaced without backup, please make sure you have backup (exported) data
          properly
        </span>
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
import { Constants, VuexData } from '@/models';
import { PersistentData } from '@/models/persistence';
import { Vue, Component, Prop, Model, Emit } from 'vue-property-decorator';
import { mapActions } from 'vuex';

@Component({
  name: 'import-setting-btn',
  methods: { ...mapActions(['initVuex']) }
})
export default class ImportSettingBtn extends Vue {
  initVuex!: (data: VuexData) => void;
  //
  dialog = false;
  data: string = JSON.stringify(require('@/assets/json/xceoj.json'));

  importData() {
    if (this.isValid()) {
      localStorage.setItem(Constants.KEY_VUEXDATA, this.data);
      location.reload();
    }
  }

  isValid() {
    const importData = JSON.parse(this.data) as PersistentData;
    // TODO: better validation
    return importData.version != undefined;
  }
}
</script>
