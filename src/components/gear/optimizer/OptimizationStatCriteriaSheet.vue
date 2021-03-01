<template>
  <v-sheet class="mx-auto pa-2">
    <v-row dense>
      <v-col class="d-flex justify-center align-center">
        <div class="mr-2">Target Stat</div>
        <v-divider />
      </v-col>
    </v-row>
    <v-row v-for="(item, key) in stats" :key="key" dense>
      <v-col cols="auto" style="margin: auto;">
        <v-img max-height="18" max-width="18" :src="require(`@/assets/img/stat/${item[0].value}.png`)" />
      </v-col>
      <v-col>
        <v-text-field v-model.number="value[item[0].value].min" dense hide-details label="min" outlined type="number" />
      </v-col>
      <v-col>
        <v-text-field
          v-model.number="value[item[0].value].max"
          dense
          flat
          hide-details
          label="max"
          outlined
          type="number"
        />
      </v-col>
      <v-col cols="auto" style="margin: auto">
        <v-img max-height="18" max-width="18" :src="require(`@/assets/img/stat/${item[1].value}.png`)" />
      </v-col>
      <v-col>
        <v-text-field v-model.number="value[item[1].value].min" dense hide-details label="min" outlined type="number" />
      </v-col>
      <v-col>
        <v-text-field
          v-model.number="value[item[1].value].max"
          dense
          flat
          hide-details
          label="max"
          outlined
          type="number"
        />
      </v-col>
    </v-row>
    <v-row dense>
      <v-col cols="auto" style="margin: auto;"><div style="width: 18px"></div></v-col>
      <v-col>
        <v-text-field v-model.number="value.ehp.min" dense hide-details label="EHP (min)" outlined type="number" />
      </v-col>
      <v-col cols="auto" style="margin: auto;"><div style="width: 18px"></div></v-col>
      <v-col>
        <v-text-field
          v-model.number="value.damage.min"
          dense
          hide-details
          label="Damage (min)"
          outlined
          type="number"
        />
      </v-col>
      <!-- <v-col cols="auto" style="margin: auto"><div style="width: 18px">&nbsp;</div></v-col>
      <v-col> </v-col>
      <v-col> </v-col> -->
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
  </v-sheet>
</template>
<style lang="sass" scoped>
::v-deep input
  font-size: 14px
// max-height: 18px
// ::v-deep .v-text-field.v-input--dense > .v-input__control
//   min-height: 32px
// ::v-deep .v-input__control > .v-input__slot
//   min-height: 32px
</style>
<script lang="ts">
import { Vue, Component, Prop, Emit, Model } from 'vue-property-decorator';
import { Gear, OptimizationStatCriteria } from '@/models';

@Component({
  name: 'optimization-stat-criteria-sheet'
})
export default class OptimizationStatCriteriaCard extends Vue {
  readonly stats = [
    [Gear.Stat.HP, Gear.Stat.DEF],
    [Gear.Stat.ATK, Gear.Stat.CRI],
    [Gear.Stat.CDMG, Gear.Stat.SPD],
    [Gear.Stat.EFF, Gear.Stat.RES]
  ];
  // readonly stats = [
  //   Gear.Stat.HP,
  //   Gear.Stat.DEF,
  //   Gear.Stat.ATK,
  //   Gear.Stat.CRI,
  //   Gear.Stat.CDMG,
  //   Gear.Stat.SPD,
  //   Gear.Stat.EFF,
  //   Gear.Stat.RES
  // ];
  @Model() readonly value!: OptimizationStatCriteria;
}
</script>
