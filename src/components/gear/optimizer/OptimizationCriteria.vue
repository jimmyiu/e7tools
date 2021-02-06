<template>
  <div style="max-width: 340px">
    <!-- <v-row dense>
      <v-col> </v-col>
      <v-col class="text-center" cols="5">
        Min
      </v-col>
      <v-col class="text-center" cols="5">
        Max
      </v-col>
    </v-row> -->
    <v-row v-for="(item, key) in stats" :key="key" dense>
      <v-col cols="auto" style="margin: auto;">
        <v-img max-height="18" max-width="18" :src="require(`@/assets/img/stat/${item[0].value}.png`)" />
      </v-col>
      <v-col>
        <v-text-field v-model="value[item[0].value].min" dense hide-details label="min" solo-inverted />
      </v-col>
      <v-col>
        <v-text-field v-model="value[item[0].value].max" dense flat hide-details label="max" solo-inverted />
      </v-col>
      <v-col cols="auto" style="margin: auto">
        <v-img max-height="18" max-width="18" :src="require(`@/assets/img/stat/${item[1].value}.png`)" />
      </v-col>
      <v-col>
        <v-text-field v-model="value[item[1].value].min" dense hide-details label="min" solo-inverted />
      </v-col>
      <v-col>
        <v-text-field v-model="value[item[1].value].max" dense flat hide-details label="max" solo-inverted />
      </v-col>
    </v-row>
    <!-- <v-row dense>
      <v-col cols="3">
        <v-text-field v-model="value.cdmg.min" dense hide-details label="C.DMG (min)" outlined type="number" />
      </v-col>
      <v-col cols="3">
        <v-text-field v-model="value.cdmg.max" dense hide-details label="C.DMG (max)" outlined type="number" />
      </v-col>
    </v-row>
    <v-row dense>
      <v-col class="text-center" cols="2" style="margin: auto">
        CRI
      </v-col>
      <v-col>
        <v-text-field v-model="value.cri.min" dense hide-details label="min" outlined type="number" />
      </v-col>
      <v-col>
        <v-text-field v-model="value.cri.max" dense hide-details label="max" outlined type="number" />
      </v-col>
    </v-row> -->
  </div>
</template>
<style lang="sass" scoped>
::v-deep input
  font-size: 14px
  max-height: 20px
</style>
<script lang="ts">
import { Vue, Component, Prop, Emit, Model } from 'vue-property-decorator';
import { Gear } from '@/models';

@Component({
  name: 'optimization-criteria'
})
export default class OptimizationCriteria extends Vue {
  readonly stats = [
    [Gear.Stat.HP, Gear.Stat.DEF],
    [Gear.Stat.ATK, Gear.Stat.CRI],
    [Gear.Stat.CDMG, Gear.Stat.SPD],
    [Gear.Stat.EFF, Gear.Stat.RES]
  ];
  @Model() readonly value!: Gear.GearOptimizerCriteria;
}
</script>
