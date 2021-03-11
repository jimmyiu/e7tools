<template>
  <v-virtual-scroll :height="height" item-height="102" :items="gears" max-width="366" min-width="351">
    <template v-slot:default="{ item }">
      <gear-card
        :gear="item"
        :highlight1="sortCol"
        :selectable="true"
        :selected="isSelected(item)"
        @click="clickGear"
      />
    </template>
  </v-virtual-scroll>
  <!-- </v-col> -->
  <!-- <v-col cols="12"> -->
  <!-- Showing {{ gears.length }} gears: 1-15 of 363, page size = {{ pageSize }} -->
  <!-- <div>
        <v-text-field v-model.number="pageSize" dense hide-details label="Page Size" outlined type="number" />
      </div> -->
  <!-- <v-pagination v-model="currentPage" :length="numOfPages" :total-visible="6"></v-pagination> -->
  <!-- </v-col> -->
  <!-- </v-row> -->
</template>
<style lang="sass" scoped></style>
<script lang="ts">
import { Vue, Component, Prop, Emit, Model } from 'vue-property-decorator';
import { Gear } from '@/models';
import { GearCard } from '..';
import { mapActions, mapGetters } from 'vuex';

@Component({
  name: 'gear-table',
  components: { GearCard },
  computed: { ...mapGetters(['getGear']) }
})
export default class GearListView extends Vue {
  getGear!: (gearId: string) => Gear.Gear;
  @Prop({ default: 506 }) readonly height!: number;
  @Prop() readonly gears!: Gear.Gear[];
  @Prop() readonly sortCol!: string | undefined;
  @Model('input') readonly selectedGearId!: string;

  clickGear(gear: Gear.Gear) {
    if (gear) {
      if (this.selectedGearId == gear.id) {
        this.$emit('input', '');
      } else {
        this.$emit('input', gear.id);
      }
    }
  }

  isSelected(gear: Gear.Gear) {
    return this.selectedGearId == gear.id;
  }
}
</script>
