<template>
  <div>
    <v-row dense>
      <v-col>
        <gear-table-filter v-model="filter" />
        <v-divider class="mt-1" />
        <gear-table :gears="filteredGears" />
      </v-col>
    </v-row>
    <!-- <v-row>
      <v-col>
        <gear-statistics :gears="filteredGears" />
      </v-col>
    </v-row> -->
    <v-bottom-sheet v-model="overlay" persistent scrollable>
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-bind="attrs" bottom fab fixed right v-on="on"><v-icon>mdi-plus</v-icon></v-btn>
      </template>
      <gear-form @close="overlay = false" @input="inputGear" />
    </v-bottom-sheet>
    <v-snackbar v-model="complete" color="success" rounded="pill" timeout="1500" top>
      <div class="text-center">A gear is updated</div>
      <!-- <template v-slot:action="{ attrs }">
        <v-btn v-bind="attrs" color="red" text @click="complete = false">
          Close
        </v-btn>
      </template> -->
    </v-snackbar>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { mapState, mapActions } from 'vuex';
import { GearDetail, GearForm, GearTable, GearTableFilter } from '@/components';
import { Gear } from '@/models';

@Component({
  name: 'gear-page',
  components: { GearDetail, GearForm, GearTable, GearTableFilter },
  computed: { ...mapState(['gears']) },
  methods: { ...mapActions(['updateGear']) }
})
export default class GearPage extends Vue {
  updateGear!: (a: Gear.Gear) => void;
  gears!: Gear.Gear[];
  overlay = false;
  complete = false;
  filter: Gear.TableFilter = {
    type: undefined,
    sets: [],
    level: 0,
    mode: 0,
    main: true,
    enhanceMode: 0
  };

  get filteredGears() {
    let result = this.gears.filter(it => {
      let type = this.filter.type == undefined || this.filter.type == it.type!!;
      let set = this.filter.sets.length == 0 || this.filter.sets.indexOf(it.set!!) >= 0;
      let level = !this.filter.level || this.filter.level == it.level!!;
      let enhance =
        !this.filter.enhanceMode ||
        (this.filter.enhanceMode == 1 && it.enhance!! < 15) ||
        (this.filter.enhanceMode == 2 && it.enhance!! == 15);
      return type && set && level && enhance;
    });
    if (!this.filter.main) {
      result = result.map(x => {
        let foo = Gear.Gear.clone(x);
        Vue.set(foo, foo.main!!.value, 0);
        return foo;
      });
    }
    return result;
  }

  created() {}

  inputGear(gear: Gear.Gear) {
    this.updateGear(gear);
    this.complete = true;
    this.overlay = false;
  }
}
</script>
