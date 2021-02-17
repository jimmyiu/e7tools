<template>
  <div>
    for testing<br />
    <v-btn @click="refresh">refresh</v-btn>
    <div v-if="result">{{ result }}</div>
    <v-divider />
    <span v-for="(item, key) in heros" :key="key">
      <img :src="item.icon" width="24" />
    </span>
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
  // updateE7dbHeros!: (heros: Hero[]) => void;
  heros!: Hero[];
  //
  result: Hero[] = [];

  async refresh() {
    this.withLoading(async () => {
      // this.result = await E7dbDataHandler.retrieveHeros();
      // this.updateE7dbHeros(this.result);
    });
  }
}
</script>
