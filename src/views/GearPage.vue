<template>
  <div>
    <v-row dense>
      <v-col>
        <gear-table-filter v-model="filter" />
        <v-divider class="mt-1" />
        <gear-table :gears="filteredGears" @edit-gear="editGear" />
      </v-col>
    </v-row>
    <!-- <v-row>
      <v-col>
        <gear-statistics :gears="filteredGears" />
      </v-col>
    </v-row> -->
    <v-btn bottom fab fixed right @click="createGear"><v-icon>mdi-plus</v-icon></v-btn>
    <v-bottom-sheet v-model="visible.overlay" scrollable>
      <gear-form-card
        v-if="visible.overlay"
        :gear="gearToBeEdited"
        @close="visible.overlay = false"
        @input="inputGear"
      />
    </v-bottom-sheet>
    <v-snackbar v-model="visible.completeMsg" color="success" rounded="pill" timeout="1500" top>
      <div class="text-center">A gear is updated</div>
    </v-snackbar>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { mapState, mapActions, mapGetters } from 'vuex';
import { GearFormCard, GearTable, GearTableFilter } from '@/components';
import { Gear } from '@/models';

@Component({
  name: 'gear-page',
  components: { GearFormCard, GearTable, GearTableFilter },
  computed: { ...mapState(['gears']), ...mapGetters(['getGearMap']) },
  methods: mapActions(['updateGear'])
})
export default class GearPage extends Vue {
  readonly getGearMap!: Map<string, Gear.Gear>;
  updateGear!: (gear: Gear.Gear) => void;

  gears!: Gear.Gear[];
  gearToBeEdited?: Gear.Gear = undefined;
  visible = {
    overlay: false,
    completeMsg: false
  };
  filter: Gear.TableFilter = {
    type: undefined,
    sets: [],
    level: 0,
    mode: 0,
    main: false,
    enhanceMode: Gear.EnhanceModeFilter.ALL
  };

  get filteredGears() {
    let result = this.gears.filter(it => {
      let type = this.filter.type == undefined || this.filter.type == it.type!!;
      let set = this.filter.sets.length == 0 || this.filter.sets.indexOf(it.set!!) >= 0;
      let level = !this.filter.level || this.filter.level == it.level!!;
      let enhance =
        !this.filter.enhanceMode ||
        (this.filter.enhanceMode == Gear.EnhanceModeFilter.LESS_THAN_15 && it.enhance!! < 15) ||
        (this.filter.enhanceMode == Gear.EnhanceModeFilter.ONLY_15 && it.enhance!! == 15);
      return type && set && level && enhance;
    });
    if (!this.filter.main) {
      result = result.map(x => {
        let foo = Gear.Gear.clone(x);
        Vue.set(foo, foo.main!!.value, undefined);
        return foo;
      });
    }
    return result;
  }

  inputGear(gear: Gear.Gear) {
    this.updateGear(gear);
    this.visible.completeMsg = true;
    this.visible.overlay = false;
  }

  editGear(gearId: string) {
    this.gearToBeEdited = this.getGearMap.get(gearId);
    this.visible.overlay = true;
  }

  createGear() {
    this.gearToBeEdited = undefined;
    this.visible.overlay = true;
  }
}
</script>
