<template>
  <v-card elevation="6" outlined width="100%">
    <div v-if="gear && gear.id">
      <div class="d-flex justify-left align-center" style="height: 36px">
        <!-- <div class="d-flex" style="padding-top: 1px"> -->
        <gear-type-icon class="mx-auto" small style="padding: 0 1px" :type="gear.type" />
        <v-divider vertical />
        <gear-set-icon class="mx-auto" :set="gear.set" small />
        <v-divider vertical />
        <div class="mx-auto align-center align-self-center">
          <span :style="'color: ' + gear.grade.color">{{ gear.level }}</span>
          <span class="caption">+{{ gear.enhance }}</span>
        </div>
      </div>
      <v-divider />
      <div class="pa-1 text-center">{{ gear.main.label }}: {{ gear[gear.main.value] }}</div>
      <v-divider />
      <v-row class="d-flex flex-wrap py-1" dense no-gutters>
        <template v-for="(item, i) in stats">
          <v-col
            v-if="gear[item.value] && item.value != gear.main.value"
            :key="`${i}1`"
            bottom
            class="pl-1 caption align-self-center"
            cols="4"
          >
            <!-- <v-img max-height="18" max-width="18" :src="require(`@/assets/img/stat/${item.value}.png`)" /> -->
            {{ item.label }}:
          </v-col>
          <v-col
            v-if="gear[item.value] && item.value != gear.main.value"
            :key="`${i}2`"
            class="pr-1 text-right"
            cols="2"
            >{{ gear[item.value] }}</v-col
          >
        </template>
      </v-row>
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
import { GearSetIcon, GearTypeIcon } from './common';
import { Gear } from '@/models';
// import { mapGetters } from 'vuex';

@Component({
  name: 'gear-detail-card',
  components: { GearSetIcon, GearTypeIcon }
  // computed: { ...mapGetters(['getGearMap']) }
})
export default class GearDetailCard extends Vue {
  @Prop() readonly gear!: Gear.Gear;
  get stats() {
    return Object.values(Gear.Stat);
  }

  get width() {
    return '170';
  }
}
</script>
