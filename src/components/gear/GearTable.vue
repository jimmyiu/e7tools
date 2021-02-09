<template>
  <v-data-table
    dense
    :footer-props="{ showFirstLastPage: true }"
    :headers="headers"
    :items="filteredGears"
    :items-per-page="15"
    :multi-sort="false"
  >
    <!-- header -->
    <template v-slot:header.type="{ item }">
      <div class="d-flex align-center" style="white-space:nowrap; max-width: 82px">hello {{ item }}</div>
    </template>
    <!-- item -->
    <template v-slot:item.type="{ item }">
      <div class="d-flex align-center" style="white-space:nowrap; max-width: 82px">
        <gear-type-icon small :type="item.type" />
        <gear-set-icon :set="item.set" small />
        <div>
          <span :style="'color: ' + item.grade.color">{{ item.level }}</span
          >+{{ item.enhance }}
        </div>
      </div>
    </template>
    <template v-slot:item.set="{ item }">
      <gear-set-icon :set="item.set" small />
    </template>
    <template v-slot:item.grade="{ item }">
      <v-chip :color="item.grade.color" label small text-color="white">{{ item.grade.name.substring(0, 1) }}</v-chip>
    </template>
    <template v-slot:item.main="{ item }">
      {{ item.main.label }}
    </template>
    <template v-slot:item.action="{ item }">
      <div style="white-space:nowrap;">
        <v-btn icon small @click="lockGear(item)">
          <v-icon small>{{ item.locked ? 'lock' : 'lock_open' }}</v-icon>
        </v-btn>
        <v-btn icon small @click="editGear(item)"><v-icon small>mdi-pencil</v-icon></v-btn>
        <v-btn icon small @click="confirmDelete(item)"><v-icon small>mdi-delete</v-icon></v-btn>
      </div>
    </template>
    <template v-slot:body.prepend="{ headers }">
      <tr class="hidden-xs-only">
        <td v-for="(item, index) in headers" :key="index" class="text-center v-data-table__divider">
          <v-text-field v-if="index > 1 && index < 16" v-model="filter[item.value]" dense flat hide-details />
          <span v-if="index == 0">
            filter<br />
            max/25%
          </span>
          <span v-else-if="index == 1 || index == 16"></span>
          <span v-else class="caption">{{ statistics[item.value].max }}/{{ statistics[item.value].third }}</span>
        </td>
      </tr>
    </template>
  </v-data-table>
</template>
<style lang="sass" scoped>
::v-deep td
  padding: 0 8px!important
</style>
<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';
import { Gear } from '@/models';
import GearService from '@/services/gear-service';
import { GearSetIcon, GearTypeIcon } from './common';
import { mapActions, mapGetters } from 'vuex';

@Component({
  name: 'gear-table',
  components: { GearSetIcon, GearTypeIcon },
  computed: { ...mapGetters(['getGearMap']) },
  methods: mapActions(['updateGear', 'deleteGear'])
})
export default class GearTable extends Vue {
  readonly getGearMap!: Map<string, Gear.Gear>;
  updateGear!: (gear: Gear.Gear) => void;
  deleteGear!: (gear: Gear.Gear) => void;

  @Prop() readonly item!: any;
  @Prop() readonly gears!: Gear.Gear[];
  filter: Gear.GearAbility & Gear.GearScore = {
    score: 0,
    offScore: 0,
    defScore: 0
  };

  get filteredGears() {
    return this.gears.filter(x => {
      return (
        (x.hpp || 0) >= (this.filter.hpp || 0) &&
        (x.hp || 0) >= (this.filter.hp || 0) &&
        (x.defp || 0) >= (this.filter.defp || 0) &&
        (x.def || 0) >= (this.filter.def || 0) &&
        (x.atkp || 0) >= (this.filter.atkp || 0) &&
        (x.atk || 0) >= (this.filter.atk || 0) &&
        (x.cri || 0) >= (this.filter.cri || 0) &&
        (x.cdmg || 0) >= (this.filter.cdmg || 0) &&
        (x.spd || 0) >= (this.filter.spd || 0) &&
        (x.eff || 0) >= (this.filter.eff || 0) &&
        (x.res || 0) >= (this.filter.res || 0) &&
        x.score >= this.filter.score &&
        x.offScore >= this.filter.offScore &&
        x.defScore >= this.filter.defScore
      );
    });
  }

  get statistics() {
    return GearService.calculateStatistics(this.filteredGears);
  }

  headers = [
    this.getHeader({ text: 'GEAR', value: 'type', sortable: false }),
    // this.getHeader({ text: 'SET', value: 'set', width: '40px' }),
    // this.getHeader({ text: 'GRADE', value: 'grade', width: '60px' }),
    // this.getHeader({ text: 'LV', value: 'level' }),
    // this.getHeader({ text: 'ENH', value: 'enhance' }),
    // this.getHeader({ text: 'TITLE', value: 'title', width: '200px' }),
    this.getHeader({ text: 'Main', value: 'main', width: '70px', sortable: false }),
    this.getHeader({ text: 'HP %', value: 'hpp', width: '60px' }),
    this.getHeader({ text: 'HP', value: 'hp' }),
    this.getHeader({ text: 'DEF %', value: 'defp', width: '60px' }),
    this.getHeader({ text: 'DEF', value: 'def' }),
    this.getHeader({ text: 'ATK %', value: 'atkp', width: '60px' }),
    this.getHeader({ text: 'ATK', value: 'atk' }),
    this.getHeader({ text: 'CRI', value: 'cri' }),
    this.getHeader({ text: 'C.DMG', value: 'cdmg', width: '60px' }),
    this.getHeader({ text: 'SPD', value: 'spd' }),
    this.getHeader({ text: 'EFF', value: 'eff' }),
    this.getHeader({ text: 'RES', value: 'res' }),
    this.getHeader({ text: 'SCORE', value: 'score' }),
    this.getHeader({ text: 'OFF', value: 'offScore' }),
    this.getHeader({ text: 'DEF', value: 'defScore' }),
    this.getHeader({ text: '', value: 'action', width: '100px' })
  ];

  getHeader(obj: any): any {
    return {
      ...{ width: '50px', class: 'px-1 py-1', divider: true, align: 'center', style: 'border: 3px' },
      ...obj
    };
  }

  lockGear(gear: Gear.Gear) {
    let lockGear = this.getGearMap.get(gear.id);
    if (lockGear) {
      lockGear.locked = !lockGear.locked;
      this.updateGear(lockGear);
    }
  }

  @Emit()
  editGear(gear: Gear.Gear) {
    return gear.id;
  }

  confirmDelete(gear: Gear.Gear) {
    if (window.confirm(`Are you sure to delete the gear with type = ${gear.type} and set = ${gear.set}?`)) {
      this.deleteGear(gear);
    }
  }
}
</script>
