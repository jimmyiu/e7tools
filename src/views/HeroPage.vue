<template>
  <div>
    for testing<br />
    <!-- <v-btn @click="refresh">refresh</v-btn> -->
    <!-- <div v-if="result">{{ result }}</div> -->
    <v-divider />
    <div>Five star heros:</div>
    <span v-for="(item, key) in fiveStarHeros" :key="key">
      <img :src="item.icon" width="24" />
    </span>
    <br />Average HP: {{ average.hp }} <br />Average DEF: {{ average.def }} <br />Average ATK: {{ average.atk }}
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import E7dbDataHandler from '@/services/e7db-data-handler';
import { Hero } from '@/models';
import { mapActions, mapGetters } from 'vuex';

@Component({
  name: 'hero-page',
  computed: mapGetters(['heros']),
  methods: { ...mapActions(['withLoading']) }
})
export default class HeroPage extends Vue {
  withLoading!: (fn: () => Promise<any>) => void;
  heros!: Hero[];
  //
  result: Hero[] = [];

  get fiveStarHeros() {
    return this.heros.filter(x => x.rarity == 5);
  }

  get average() {
    const result = {
      hp: 0,
      def: 0,
      atk: 0
    };
    this.fiveStarHeros.forEach(x => {
      result.hp += x.hp;
      result.def += x.def;
      result.atk += x.atk;
    });
    result.hp = result.hp / this.fiveStarHeros.length;
    result.def = result.def / this.fiveStarHeros.length;
    result.atk = result.atk / this.fiveStarHeros.length;
    return result;
  }
}
</script>
