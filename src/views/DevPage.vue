<template>
  <div>
    This page is for development purpose<br />
    <v-btn @click="start">start</v-btn>
    Result = {{ sum }}<br />
    Average = {{ average }}
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import axios from 'axios';

@Component({
  name: 'dev-page'
})
export default class DevPage extends Vue {
  result: object[] = [];
  sum = {
    atk: 0,
    hp: 0,
    spd: 0,
    def: 0
  };
  get average() {
    return {
      atk: this.sum.atk / this.result.length - 1,
      hp: this.sum.hp / this.result.length - 1,
      spd: this.sum.spd / this.result.length - 1,
      def: this.sum.def / this.result.length - 1
    };
  }
  async start() {
    await axios.get('https://api.epicsevendb.com/hero').then(async response => {
      this.result = response.data.results.filter((x: any) => x.rarity == 5).map((x: any) => x._id);
      for (let i = 0; i < this.result.length; i++) {
        let id = this.result[i] + '';
        if (id != 'straze') {
          await this.retrieveStat(id);
        }
      }
    });

    // localStorage.setItem('average', JSON.stringify(average));
  }

  async retrieveStat(id: string) {
    await axios.get(`https://api.epicsevendb.com/hero/${id}`).then(response => {
      let item = response.data.results[0].calculatedStatus.lv60SixStarFullyAwakened;
      this.sum.atk += item.atk;
      this.sum.hp += item.hp;
      this.sum.spd += item.spd;
      this.sum.def += item.def;
    });
    await this.delay(100);
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
</script>
