<template>
  <v-card dense width="auto">
    <v-card-title>
      <v-btn class="mr-2" depressed outlined rounded>TODO</v-btn>
      <v-btn class="mr-2" depressed outlined rounded>TODO</v-btn>
      <v-btn class="mr-2" depressed outlined rounded>TODO</v-btn>
    </v-card-title>
    <v-divider class="mb-4" />
    <v-card-text>
      <v-row dense justify="center">
        <v-col cols="auto">
          <v-card class="pa-2 mb-2" outlined width="300px">
            <gear-type-select v-model="form.type" class="justify-center" />
          </v-card>
          <v-card class="pa-2 pb-0 mb-2" outlined width="300px">
            <gear-set-select v-model="form.set" class="justify-center" />
          </v-card>
          <v-card class="pa-2 pt-0" outlined width="300px">
            <gear-form-stat-select v-model="form.statInputs" :type="form.type" />
          </v-card>
        </v-col>
        <v-col cols="auto">
          <v-row dense justify="center">
            <v-col cols="auto">
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
                <gear-stat-input v-model="form.statInputs[0]" class="mt-2" dense mode="main" />
                <gear-stat-input v-model="form.statInputs[1]" class="mt-2" dense mode="sub" />
              </div>
            </v-col>
            <v-col cols="auto">
              <gear-stat-input v-model="form.statInputs[2]" mode="sub" />
              <gear-stat-input v-model="form.statInputs[3]" class="mt-2" dense mode="sub" />
              <gear-stat-input v-model="form.statInputs[4]" class="mt-2" dense mode="sub" />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card-text>
    <v-divider />
    <v-card-actions>
      <v-btn class="font-weight-bold" color="primary" outlined @click="submit">{{ gear ? 'Edit' : 'Create' }}</v-btn>
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
import { Gear } from '@/models';
import { GearSetIcon, GearSetSelect, GearTypeIcon, GearTypeSelect } from './common';
import { Vue, Component, Prop, Emit, Watch } from 'vue-property-decorator';
import GearFormStatSelect from './GearFormStatSelect.vue';
import GearStatInput from './GearStatInput.vue';
import GearService from '@/services/gear-service';
import GearStatRangeService from '@/services/gear-stat-range-service';

/**
 * This is a gear form, it takes a gear for edit (undefined for create) and returns a gear object
 */
@Component({
  name: 'gear-form',
  components: {
    GearFormStatSelect,
    GearSetIcon,
    GearSetSelect,
    GearStatInput,
    GearTypeIcon,
    GearTypeSelect
  },
  computed: {}
})
export default class GearForm extends Vue {
  @Prop({ type: Gear.Gear, required: false, default: undefined }) readonly gear!: Gear.Gear;

  form = this.defaultForm();
  readonly sets = Gear.SETS;
  readonly types = Object.values(Gear.Type);
  readonly grades = Object.values(Gear.Grade);
  levelTicks = [67, 70, 71, 75, 78, 80, 85, 88, 90];

  get mainChanger() {
    return {
      type: this.form.type,
      main: this.form.statInputs[0].stat,
      level: this.levelTicks[this.form.level],
      enhance: this.form.enhance
    };
  }

  @Watch('mainChanger', { immediate: false, deep: false })
  onMainChangerChanged(val: any) {
    console.log('onMainChangerChanged::val =', val);
    const main = GearStatRangeService.getMain(val.type, val.main, val.level, val.enhance);
    if (main) {
      this.form.statInputs[0].value = main;
    }
  }

  // @Watch('form.grade', { immediate: false, deep: true })
  // onGradleChanged(grade: Gear.Grade) {
  //   console.log(
  //     'onGradeChanged::grade.numOfStats =',
  //     grade.numOfStats,
  //     ', stats.length =',
  //     this.form.statInputs.length
  //   );
  //   if (this.form.statInputs.length < grade.numOfStats) {
  //     while (this.form.statInputs.length < grade.numOfStats) {
  //       this.form.statInputs.push({ stat: undefined, value: 0 });
  //     }
  //   } else {
  //     while (grade.numOfStats < this.form.statInputs.length) {
  //       this.form.statInputs.pop();
  //     }
  //   }
  // }

  defaultForm() {
    const defaultInputStats = Array<Gear.StatInput>();
    while (defaultInputStats.length < 5) {
      defaultInputStats.push({ stat: undefined, value: 0 });
    }
    return {
      type: Gear.Type.Weapon,
      set: Gear.Set.Speed,
      grade: Gear.Grade.EPIC,
      level: 5,
      enhance: 15,
      statInputs: defaultInputStats
    };
  }

  // createInputStats(gear: Gear.Gear): Gear.StatInput[] {
  //   const result = Array<Gear.StatInput>();
  //   result.push({ stat: gear.main, value: gear.getMain() });
  //   console.log('createInputStats::main =', gear.getMain());
  //   gear.getSubs().forEach((value, key) => {
  //     console.log('createInputStats::value =', value);
  //     result.push({ stat: key, value: value });
  //   });
  //   while (result.length < 5) {
  //     result.push({ stat: undefined, value: 0 });
  //   }
  //   console.log('createInputStats::result =', result);
  //   return result;
  // }

  created() {
    console.log('created::start');
    this.reset();
  }

  reset() {
    console.log('reset', this.gear);
    if (this.gear) {
      const statInputs = this.gear.getStatInputs();
      while (statInputs.length < 5) {
        statInputs.push({ stat: undefined, value: 0 });
      }
      this.form = {
        type: this.gear.type!!,
        set: this.gear.set!!,
        grade: this.gear.grade!!,
        level: this.levelTicks.indexOf(this.gear.level!!),
        enhance: this.gear.enhance!!,
        // statInputs: this.createInputStats(this.gear)
        statInputs: statInputs
      };
    } else {
      this.form = this.defaultForm();
    }
  }

  @Emit('input')
  submit() {
    let gear = this.gear ? new Gear.Gear(this.gear.id) : new Gear.Gear();
    gear.set = this.form.set;
    gear.type = this.form.type;
    gear.grade = this.form.grade;
    gear.level = this.levelTicks[this.form.level];
    gear.enhance = this.form.enhance;
    gear.main = this.form.statInputs[0].stat;
    for (let i = 0; i < this.form.statInputs.length; i++) {
      if (this.form.statInputs[i].stat && this.form.statInputs[i].value > 0) {
        Vue.set(gear, this.form.statInputs[i].stat!.value, this.form.statInputs[i].value);
      }
    }
    GearService.assignScore(gear);
    console.log('submit::gear =', gear);
    return gear;
  }
}
</script>
