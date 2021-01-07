<template>
  <v-card elevation="6" :max-width="width" outlined>
    <div class="d-flex justify-left align-center" style="height: 36px">
      <!-- <div class="d-flex" style="padding-top: 1px"> -->
      <gear-type-icon class="mx-auto" small style="padding: 0 1px" :type="gear.type" />
      <v-divider vertical />
      <gear-set-icon class="mx-auto" :set="gear.set" small />
      <v-divider vertical />
      <div class="mx-auto align-center">
        <span :style="'color: ' + gear.grade.color">{{ gear.level }}</span>
        <span class="caption">+{{ gear.enhance }}</span>
      </div>
    </div>
    <v-divider />
    <div class="pa-2 text-center">{{ gear.main.label }}: {{ gear[gear.main.value] }}</div>
    <v-divider />
    <v-row class="d-flex flex-wrap py-2 pl-3 pr-1" dense no-gutters>
      <template v-for="(item, i) in stats">
        <v-col v-if="gear[item.value] && item.value != gear.main.value" :key="`${i}1`" cols="4">
          {{ item.label }}:
        </v-col>
        <v-col
          v-if="gear[item.value] && item.value != gear.main.value"
          :key="`${i}2`"
          class="pr-2 text-right"
          cols="2"
          >{{ gear[item.value] }}</v-col
        >
      </template>
    </v-row>
  </v-card>
</template>
<style lang="sass" scoped>
.set
  margin-top: -2px
</style>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { GearSetIcon, GearTypeIcon } from './common';
import { Gear } from '@/models';
import { mapGetters } from 'vuex';

@Component({
  name: 'gear-detail',
  components: { GearSetIcon, GearTypeIcon },
  computed: { ...mapGetters(['getGearMap']) }
})
export default class GearDetail extends Vue {
  @Prop() readonly gearId!: string;
  readonly stats = Object.values(Gear.Stat);
  readonly getGearMap!: Map<string, Gear.Gear>;

  get gear() {
    return this.getGearMap.get(this.gearId);
  }

  get width() {
    // console.log(this.$vuetify.breakpoint);
    // return this.$vuetify.breakpoint.mobile ? 175 : 200;
    return '170';
  }
}
</script>
