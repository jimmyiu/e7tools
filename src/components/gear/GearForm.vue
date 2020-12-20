<template>
  <v-card dense>
    <v-card-text>
      <v-row dense>
        <v-col style="max-width: 300px; min-width: 300px;">
          <v-card flat>
            <v-card-text>
              <v-btn-toggle v-model="form.type" class="gear-filter" dense>
                <v-btn v-for="(item, index) in types" :key="index" :value="item">
                  <gear-type-icon small :type="item" />
                </v-btn>
              </v-btn-toggle>
              <v-divider class="my-3" />
              <v-btn-toggle v-for="i in [0, 2, 3, 4, 1]" :key="i" v-model="form.set" class="gear-filter" dense>
                <v-btn v-for="(item, index) in sets[i]" :key="index" :value="item">
                  <gear-set-icon :set="item" small />
                </v-btn>
              </v-btn-toggle>
              <v-divider class="my-3" />
              <gear-form-stat-select
                v-model="form.stats"
                :enhance="form.enhance"
                :grade="form.grade"
                :type="form.type"
              />
            </v-card-text>
          </v-card>
        </v-col>
        <v-col>
          <div class="d-flex justify-space-between mt-2">
            <div class="gear-stat-input">
              <v-card color="section" flat>
                <v-card-text class="pt-3 px-2">
                  <div class="d-flex">
                    <v-select
                      v-model="form.grade"
                      class="mr-1"
                      dense
                      hide-details
                      item-text="name"
                      :items="grades"
                      label="Grade"
                      outlined
                      return-object
                      style="width: 100%"
                    />
                    <v-text-field
                      class="mr-1"
                      dense
                      hide-details
                      label="Level"
                      outlined
                      readonly
                      :value="levelTicks[form.level]"
                    />
                    <v-select
                      v-model="form.enhance"
                      dense
                      hide-details
                      :items="[15, 14, 13, 12, 11, 10, 9, 8, 7, 6]"
                      label="Enhance"
                      outlined
                    />
                  </div>
                  <v-slider v-model="form.level" hide-details max="7" min="0" :tick-labels="levelTicks" />
                </v-card-text>
              </v-card>
            </div>
            <gear-stat-input v-model="form.statValues[0]" class="ml-2" mode="main" :stat="form.stats[0]" />
          </div>
          <div class="d-flex justify-space-between mt-2">
            <gear-stat-input v-model="form.statValues[1]" dense mode="sub" :stat="form.stats[1]" />
            <gear-stat-input v-model="form.statValues[2]" class="ml-2" dense mode="sub" :stat="form.stats[2]" />
          </div>
          <div class="d-flex justify-space-between mt-2">
            <gear-stat-input v-model="form.statValues[3]" dense mode="sub" :stat="form.stats[3]" />
            <gear-stat-input v-model="form.statValues[4]" class="ml-2" dense mode="sub" :stat="form.stats[4]" />
          </div>
        </v-col>
      </v-row>
    </v-card-text>
    <v-divider />
    <v-card-actions>
      <v-btn class="font-weight-bold" color="primary" outlined @click="submit">Create</v-btn>
      <v-btn text @click="reset">Reset</v-btn>
      <v-spacer />
      <v-btn text @click="$emit('close')">Close</v-btn>
    </v-card-actions>
  </v-card>
</template>
<style lang="sass" scoped>
::v-deep .v-slide-group__next, ::v-deep .v-slide-group__prev
  min-width: 32px
</style>
<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';
import { Gear } from '@/models';
import GearFormStatSelect from './GearFormStatSelect.vue';
import GearSetIcon from './GearSetIcon.vue';
import GearTypeIcon from './GearTypeIcon.vue';
import GearStatInput from './GearStatInput.vue';

@Component({
  components: {
    GearFormStatSelect,
    GearSetIcon,
    GearTypeIcon,
    GearStatInput
  },
  computed: {}
})
export default class GearForm extends Vue {
  name: string = 'gear-form';
  form = {
    type: Gear.Type.Weapon,
    set: Gear.Set.Speed,
    grade: Gear.Grade.EPIC,
    level: 5,
    enhance: 15,
    stats: Array<Gear.Stat>(),
    statValues: Array<number>()
  };
  readonly sets = Gear.SETS;
  readonly types = Object.values(Gear.Type);
  readonly grades = Object.values(Gear.Grade);
  levelTicks = [67, 70, 71, 75, 78, 85, 88, 90];

  get levelColor(): string {
    if (this.levelTicks[this.form.level] < 75) {
      return 'success';
    } else if (this.levelTicks[this.form.level] <= 85) {
      return 'primary';
    }
    return 'red';
  }

  mounted() {
    this.reset();
  }

  reset() {
    this.form = {
      type: Gear.Type.Weapon,
      set: Gear.Set.Speed,
      grade: Gear.Grade.EPIC,
      level: 5,
      enhance: 15,
      stats: [Gear.Stat.ATK, Gear.Stat.ATKP, Gear.Stat.CRI, Gear.Stat.CDMG, Gear.Stat.SPD],
      statValues: [100, 10, 10, 10, 10]
    };
  }

  @Emit('input')
  submit() {
    let gear: Gear.Gear = {
      id: Math.random()
        .toString(20)
        .substr(2, 10),
      set: this.form.set,
      type: this.form.type,
      grade: this.form.grade,
      level: this.levelTicks[this.form.level],
      enhance: this.form.enhance
    };
    for (let i = 0; i < this.form.stats.length; i++) {
      Vue.set(gear, this.form.stats[i].value, this.form.statValues[i]);
    }
    console.log('gear', gear);
    return gear;
  }
}
</script>
