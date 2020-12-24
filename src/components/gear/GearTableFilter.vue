<template>
  <div>
    <v-row class="mb-1" dense no-gutters>
      <v-col>
        <v-btn-toggle v-model="form.type" class="gear-filter" dense>
          <v-btn v-for="(item, index) in types" :key="index" :value="item">
            <gear-type-icon small :type="item" />
          </v-btn>
        </v-btn-toggle>
      </v-col>
      <v-col align="right">
        <v-btn-toggle v-model="form.level" dense rounded>
          <v-btn depressed small :value="85">85</v-btn>
          <v-btn depressed small :value="90">90</v-btn>
        </v-btn-toggle>
        <!-- <v-btn-toggle v-model="form.mode" dense rounded>
          <v-btn outlined small text> Full </v-btn>
          <v-btn outlined small text> Compact </v-btn>
          <v-btn outlined small text> HP </v-btn>
          <v-btn outlined small text> ATK </v-btn>
        </v-btn-toggle> -->
      </v-col>
    </v-row>
    <v-row dense no-gutters>
      <v-col>
        <span v-for="(set, i) in sets" :key="i" class="mr-1">
          <v-btn-toggle v-model="form.sets" class="gear-filter" dense multiple>
            <v-btn v-for="(item, index) in set" :key="index" :value="item">
              <gear-set-icon :set="item" small />
            </v-btn>
          </v-btn-toggle>
        </span>
      </v-col>
      <v-col align="right" cols="2">
        <v-btn class="ml-2" outlined small text @click="reset()">
          <v-icon left small>mdi-close</v-icon>
          Reset
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit, Model } from 'vue-property-decorator';
import { Gear } from '@/models';
import GearSetIcon from './GearSetIcon.vue';
import GearTypeIcon from './GearTypeIcon.vue';

@Component({
  name: 'gear-table-filter',
  components: {
    GearSetIcon,
    GearTypeIcon
  }
})
export default class GearTableFilter extends Vue {
  types = Object.values(Gear.Type);
  sets = Gear.SETS;
  @Model() readonly form!: Gear.TableFilter;

  reset() {
    this.form.type = undefined;
    this.form.sets.splice(0);
    this.form.mode = 0;
    this.form.level = 0;
  }
}
</script>
