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
import { E7db } from '@/models';
import { mapActions, mapState } from 'vuex';

@Component({
  name: 'hero-page',
  computed: mapState({ heros: (state: any) => state.e7db.heros }),
  methods: { ...mapActions(['updateE7dbHeros', 'withLoading']) }
})
export default class HeroPage extends Vue {
  withLoading!: (fn: () => Promise<any>) => void;
  updateE7dbHeros!: (heros: E7db.Hero[]) => void;
  heros!: E7db.Hero[];
  //
  result: E7db.Hero[] = [];

  async refresh() {
    this.withLoading(async () => {
      this.result = await E7dbDataHandler.retrieveHeros();
      // this.updateE7dbHeros(this.result);
    });
  }
}
</script>
