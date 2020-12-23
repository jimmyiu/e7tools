<template>
  <div>
    <v-row dense>
      <v-col>
        <gear-table-filter v-model="filter" />
        <v-divider class="mt-1" />
        <gear-table :gears="gears" />
      </v-col>
    </v-row>
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
import { GearDetail, GearForm, GearTable, GearTableFilter } from '@/components';
import { Gear } from '@/models';

@Component({
  components: { GearDetail, GearForm, GearTable, GearTableFilter }
})
export default class GearPage extends Vue {
  name: string = 'gear-page';
  gears: Gear.Gear[] = [];
  overlay = false;
  filter: Gear.TableFilter = {
    types: [],
    sets: [],
    mode: 0
  };

  headers = [
    {
      text: 'Dessert (100g serving)',
      align: 'start',
      sortable: false,
      value: 'name'
    },
    { text: 'Calories', value: 'calories' },
    { text: 'Fat (g)', value: 'fat' },
    { text: 'Carbs (g)', value: 'carbs' },
    { text: 'Protein (g)', value: 'protein' },
    { text: 'Iron (%)', value: 'iron' }
  ];
  desserts = [
    {
      name: 'Frozen Yogurt',
      calories: 159,
      fat: 6.0,
      carbs: 24,
      protein: 4.0,
      iron: '1%'
    },
    {
      name: 'Ice cream sandwich',
      calories: 237,
      fat: 9.0,
      carbs: 37,
      protein: 4.3,
      iron: '1%'
    },
    {
      name: 'Eclair',
      calories: 262,
      fat: 16.0,
      carbs: 23,
      protein: 6.0,
      iron: '7%'
    },
    {
      name: 'Cupcake',
      calories: 305,
      fat: 3.7,
      carbs: 67,
      protein: 4.3,
      iron: '8%'
    },
    {
      name: 'Gingerbread',
      calories: 356,
      fat: 16.0,
      carbs: 49,
      protein: 3.9,
      iron: '16%'
    },
    {
      name: 'Jelly bean',
      calories: 375,
      fat: 0.0,
      carbs: 94,
      protein: 0.0,
      iron: '0%'
    },
    {
      name: 'Lollipop',
      calories: 392,
      fat: 0.2,
      carbs: 98,
      protein: 0,
      iron: '2%'
    },
    {
      name: 'Honeycomb',
      calories: 408,
      fat: 3.2,
      carbs: 87,
      protein: 6.5,
      iron: '45%'
    },
    {
      name: 'Donut',
      calories: 452,
      fat: 25.0,
      carbs: 51,
      protein: 4.9,
      iron: '22%'
    },
    {
      name: 'KitKat',
      calories: 518,
      fat: 26.0,
      carbs: 65,
      protein: 7,
      iron: '6%'
    }
  ];

  created() {
    this.gears = [
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
    return {
      id: id,
      type: Gear.Type.Weapon,
      set: Gear.Set.Speed,
      grade: Gear.Grade.EPIC,
      level: 85,
      enhance: 15,
      hpp: 1,
      hp: 20000,
      defp: 3,
      def: 2000,
      atkp: 5,
      atk: 4000,
      cri: 100,
      cdmg: 350,
      spd: 9,
      eff: 10,
      res: 11
    };
  }

  inputGear(gear: Gear.Gear) {
    this.gears.push(gear);
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
