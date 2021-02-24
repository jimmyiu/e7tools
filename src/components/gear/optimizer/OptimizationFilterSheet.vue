<template>
  <v-sheet class="mx-auto pa-2">
    <v-row dense>
      <v-col class="d-flex justify-center align-center">
        <div class="mr-2">Gear Filter</div>
        <v-divider />
      </v-col>
    </v-row>
    <v-row dense>
      <v-col cols="12" sm="5">
        <v-autocomplete
          v-model="value.sets"
          class="mb-2"
          clear-icon="mdi-close-circle-outline"
          clearable
          dense
          hide-details
          :items="sets"
          label="Only Include Sets"
          multiple
          outlined
          return-object
        >
          <template v-slot:selection="{ item, index }">
            <span v-if="index === 0" class="mr-1">{{ item }}</span>
            <span v-if="index === 1" class="grey--text caption"> (+{{ value.sets.length - 1 }} others) </span>
          </template>
        </v-autocomplete>
        <v-select
          v-model="value.necklaces"
          class="mb-2"
          clear-icon="mdi-close-circle-outline"
          clearable
          dense
          hide-details
          item-text="label"
          :items="stats.necklaces"
          label="Necklace Main Stat"
          multiple
          outlined
          return-object
        >
          <template v-slot:selection="{ item, index }">
            <span v-if="index === 0" class="mr-1">{{ item.label }}</span>
            <span v-if="index === 1" class="grey--text caption"> (+{{ value.necklaces.length - 1 }} others) </span>
          </template>
        </v-select>
        <v-select
          v-model="value.rings"
          class="mb-2"
          clear-icon="mdi-close-circle-outline"
          clearable
          dense
          hide-details
          item-text="label"
          :items="stats.rings"
          label="Ring Main Stat"
          multiple
          outlined
          return-object
        >
          <template v-slot:selection="{ item, index }">
            <span v-if="index === 0" class="mr-1">{{ item.label }}</span>
            <span v-if="index === 1" class="grey--text caption"> (+{{ value.rings.length - 1 }} others) </span>
          </template>
        </v-select>
        <v-select
          v-model="value.boots"
          class="mb-2"
          clear-icon="mdi-close-circle-outline"
          clearable
          dense
          hide-details
          item-text="label"
          :items="stats.boots"
          label="Boot Main Stat"
          multiple
          outlined
          return-object
        >
          <template v-slot:selection="{ item, index }">
            <span v-if="index === 0" class="mr-1">{{ item.label }}</span>
            <span v-if="index === 1" class="grey--text caption"> (+{{ value.boots.length - 1 }} others) </span>
          </template>
        </v-select>
        <v-text-field v-model="value.score" dense hide-details label="Gear Score (Min)" outlined />
      </v-col>
      <!-- <v-col cols="auto">
        <v-divider vertical />
      </v-col> -->
      <!-- <v-col cols="auto">
        <v-checkbox
          v-model="value.enhanceMode"
          class="mr-3 my-0"
          dense
          hide-details
          label="+15 Only"
          :value="2"
        ></v-checkbox>
        <v-checkbox v-model="value.locked" class="mr-3 my-0" dense hide-details label="Locked"></v-checkbox>
        <v-checkbox v-model="value.equipped" class="mr-3 my-0" dense hide-details label="Equipped"></v-checkbox>
      </v-col> -->
      <v-col cols="7" sm="4">
        <v-row v-for="(item, key) in ratingStats" :key="key" dense>
          <v-col v-for="(i, k) in [0, 1]" :key="k">
            <v-text-field
              v-model.number="value.rating.point[item[i].value]"
              class="rating"
              dense
              hide-details
              max="3"
              min="-1"
              outlined
              type="number"
            >
              <template v-slot:prepend-inner>
                <v-img
                  max-height="18"
                  max-width="18"
                  :src="require(`@/assets/img/stat/${item[i].value}.png`)"
                  style="margin: 2px 4px 0 0"
                />
              </template>
            </v-text-field>
          </v-col>
        </v-row>
        <v-row dense>
          <v-col>
            <v-text-field
              v-model.number="value.rating.threshold"
              dense
              hide-details
              label="Threshold"
              max="100"
              min="1"
              outlined
              type="number"
            />
          </v-col>
          <v-col>
            <v-text-field
              v-model.number="value.rating.minSize"
              dense
              hide-details
              label="Minimum"
              min="1"
              outlined
              type="number"
            />
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="auto">
        <v-checkbox
          v-model="value.enhanceMode"
          class="mr-3 my-0"
          dense
          hide-details
          label="+15 Only"
          :value="2"
        ></v-checkbox>
        <v-checkbox v-model="value.locked" class="mr-3 my-0" dense hide-details label="Locked"></v-checkbox>
        <v-checkbox v-model="value.equipped" class="mr-3 my-0" dense hide-details label="Equipped"></v-checkbox>
      </v-col>
    </v-row>
  </v-sheet>
</template>
<style lang="sass" scoped>
::v-deep .rating > .v-input__control > .v-input__slot
  padding: 0 8px!important
</style>
<script lang="ts">
import { Vue, Component, Prop, Emit, Model } from 'vue-property-decorator';
import { Constants, Gear } from '@/models';
import { GearSetIcon, GearSetSelect, GearTypeIcon, GearTypeSelect } from '../common';

@Component({
  name: 'optimization-filter-sheet',
  components: {
    GearSetIcon,
    GearSetSelect,
    GearTypeIcon,
    GearTypeSelect
  }
})
export default class OptimizationFilter extends Vue {
  @Model() readonly value!: Gear.GearFilter;
  readonly ratingStats = [
    [Gear.Stat.HP, Gear.Stat.DEF],
    [Gear.Stat.ATK, Gear.Stat.CRI],
    [Gear.Stat.CDMG, Gear.Stat.SPD],
    [Gear.Stat.EFF, Gear.Stat.RES]
  ];

  get stats() {
    return {
      necklaces: Constants.NECKLACE_STATS,
      rings: Constants.RING_STATS,
      boots: Constants.BOOT_STATS
    };
  }

  get sets() {
    return Object.values(Gear.Set);
  }
}
</script>
