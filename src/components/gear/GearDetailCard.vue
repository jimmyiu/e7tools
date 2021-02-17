<template>
  <v-card elevation="6" min-width="160px" outlined width="180px">
    <div v-if="gear && gear.id">
      <v-card-text class="pa-0">
        <v-row dense>
          <v-col class="d-flex pl-2 align-center">
            <gear-type-icon small style="padding-bottom: 1px" :type="gear.type" />
            <gear-set-icon :set="gear.set" small />
            <div>
              <span :style="'color: ' + gear.grade.color">{{ gear.level }}</span>
              <span class="caption">+{{ gear.enhance }}</span>
            </div>
          </v-col>
          <v-col class="pa-2" cols="auto" style="height: 46px">
            <v-img v-if="hero" :src="hero.icon" width="30" />
            <!-- {{ gear.equippedHero }} -->
          </v-col>
        </v-row>
        <v-divider />
        <v-row>
          <v-col>
            <div class="pa-1 text-center">{{ gear.main.label }}: {{ gear[gear.main.value] }}</div>
          </v-col>
        </v-row>
        <v-divider class="mb-1" />
        <!-- class="d-flex flex-wrap" -->
        <v-row dense>
          <template v-for="(item, i) in subs">
            <v-col :key="2 * i" class="pl-2 d-flex align-center" cols="3">
              <gear-stat-icon :stat="item[0]" />
            </v-col>
            <v-col :key="2 * i + 1" class="pr-2 d-flex align-center justify-end" cols="3">
              {{ item[1] }}
              <span v-if="item[0].percent">%</span>
            </v-col>
          </template>
        </v-row>
      </v-card-text>
    </div>
    <div v-else>TODO: EMPTY</div>
  </v-card>
</template>
<style lang="sass" scoped>
.set
  margin-top: -2px
</style>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { GearSetIcon, GearStatIcon, GearTypeIcon } from './common';
import { Gear, Hero } from '@/models';
import { mapGetters } from 'vuex';

@Component({
  name: 'gear-detail-card',
  components: { GearSetIcon, GearTypeIcon, GearStatIcon },
  computed: mapGetters(['getHero'])
})
export default class GearDetailCard extends Vue {
  // vuex
  getHero!: (heroId: string) => Hero | undefined;
  //
  @Prop() readonly gear!: Gear.Gear;
  get hero(): Hero | undefined {
    return this.gear.equippedHero ? this.getHero(this.gear.equippedHero) : undefined;
  }
  get stats() {
    return Object.values(Gear.Stat);
  }

  get subs() {
    return this.gear.getSubs();
  }

  get width() {
    return '170';
  }
}
</script>
