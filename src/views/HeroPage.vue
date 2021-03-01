<template>
  <div>
    for testing<br />
    <!-- <v-btn @click="refresh">refresh</v-btn> -->
    <!-- <div v-if="result">{{ result }}</div> -->
    <!-- <v-divider />
    <div>Five star heros:</div>
    <span v-for="(item, key) in fiveStarHeros" :key="key">
      <img :src="item.icon" width="24" />
    </span>
    <br />Average HP: {{ average.hp }} <br />Average DEF: {{ average.def }} <br />Average ATK: {{ average.atk }} -->
    <v-divider class="my-3" />
    <v-btn @click="unlockAll">Unlock All</v-btn>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Gear } from '@/models';
import { mapActions, mapGetters } from 'vuex';

@Component({
  name: 'hero-page',
  computed: mapGetters(['gears']),
  methods: mapActions(['saveGears'])
})
export default class HeroPage extends Vue {
  readonly gears!: Gear.Gear[];
  saveGears!: (gear: Gear.Gear[]) => void;

  unlockAll() {
    this.gears.forEach(x => {
      x.equippedHero = '';
    });
    this.saveGears(this.gears);
  }
  // heros!: Hero[];
  //
  // result: Hero[] = [];

  // get fiveStarHeros() {
  //   return this.heros.filter(x => x.rarity == 5);
  // }

  // get average() {
  //   const result = {
  //     hp: 0,
  //     def: 0,
  //     atk: 0
  //   };
  //   this.fiveStarHeros.forEach(x => {
  //     result.hp += x.hp;
  //     result.def += x.def;
  //     result.atk += x.atk;
  //   });
  //   result.hp = result.hp / this.fiveStarHeros.length;
  //   result.def = result.def / this.fiveStarHeros.length;
  //   result.atk = result.atk / this.fiveStarHeros.length;
  //   return result;
  // }
}
</script>
