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
    <v-btn fab right @click="overlay = true"><v-icon>mdi-plus</v-icon></v-btn>
    <v-overlay color="secondary" opacity="0.5" :value="overlay">
      <gear-form @close="overlay = false" @input="inputGear" />
    </v-overlay>
    <!-- <v-navigation-drawer absolute mini-variant permanent right>
      <v-list dense nav>
        <v-list-item link @click="overlay = true">
          <v-tooltip left>
            <template v-slot:activator="{ on, attrs }">
              <v-icon v-bind="attrs" v-on="on">mdi-plus-box</v-icon>
            </template>
            <span>Add Gear</span>
          </v-tooltip>
        </v-list-item>
        <v-list-item link>
          <v-tooltip left>
            <template v-slot:activator="{ on, attrs }">
              <v-icon v-bind="attrs" v-on="on">mdi-import</v-icon>
            </template>
            <span>Import Gears</span>
          </v-tooltip>
        </v-list-item>
      </v-list>
    </v-navigation-drawer> -->
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { mapState } from 'vuex';
import { GearDetail, GearForm, GearTable, GearTableFilter } from '@/components';
import { Gear } from '@/models';

@Component({
  name: 'gear-page',
  components: { GearDetail, GearForm, GearTable, GearTableFilter },
  computed: { ...mapState(['gears']) }
})
export default class GearPage extends Vue {
  gears2 = Array<Gear.Gear>();
  gears!: Gear.Gear[];
  overlay = false;
  filter: Gear.TableFilter = {
    type: undefined,
    sets: [],
    level: 0,
    mode: 0,
    main: true
  };

  get filteredGears() {
    let result = this.gears.filter(it => {
      let type = this.filter.type == undefined || this.filter.type == it.type!!;
      let set = this.filter.sets.length == 0 || this.filter.sets.indexOf(it.set!!) >= 0;
      let level = !this.filter.level || this.filter.level == it.level!!;
      return type && set && level;
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

  created() {
    this.gears2 = [
      this.dummy('1'),
      this.dummy('2'),
      this.dummy('3')
      // this.dummy('4'),
      // this.dummy('5'),
      // this.dummy('6'),
      // this.dummy('7'),
      // this.dummy('8'),
      // this.dummy('9'),
      // this.dummy('10'),
      // this.dummy('11'),
      // this.dummy('12'),
      // this.dummy('13'),
      // this.dummy('14'),
      // this.dummy('15'),
      // this.dummy('16'),
      // this.dummy('17'),
      // this.dummy('18'),
      // this.dummy('19')
    ];
  }

  dummy(id: string): Gear.Gear {
    let gear = new Gear.Gear(id);
    gear.type = Gear.Type.Weapon;
    gear.set = Gear.Set.Speed;
    gear.grade = Gear.Grade.EPIC;
    gear.level = 85;
    gear.enhance = 15;
    gear.main = Gear.Stat.ATK;
    gear.hpp = 1;
    gear.hp = 20000;
    gear.defp = 3;
    gear.def = 2000;
    gear.atkp = 5;
    gear.atk = 4000;
    gear.cri = 100;
    gear.cdmg = 350;
    gear.spd = 9;
    gear.eff = 10;
    gear.res = 11;
    gear.score = 12;
    return gear;
  }

  inputGear(gear: Gear.Gear) {
    // this.gears.push(gear);
  }

  // items: Array<Hero> = new Array();
  // hero: Hero = new Hero();
  // async created() {
  //   await axios.get('https://api.epicsevendb.com/api/hero').then(response => (this.items = response.data.results));
  // }
  // async load() {
  //   return await axios
  //     .get('https://api.epicsevendb.com/api/hero')
  //     .then(response => (this.items = response.data.results));
  // }
}
</script>
