<template>
  <v-bottom-sheet scrollable :value="visible" @input="onClose">
    <v-card dense width="auto">
      <v-card-title>
        <!-- <v-btn class="mr-2" depressed outlined rounded>TODO</v-btn>
        <v-btn class="mr-2" depressed outlined rounded>TODO</v-btn>
        <v-btn class="mr-2" depressed outlined rounded>TODO</v-btn> -->
      </v-card-title>
      <v-divider class="mb-4" />
      <v-card-text>
        <v-row dense justify="center">
          <v-col cols="auto">
            <v-card class="pa-2 mb-2 d-flex justify-center flex-column align-center" outlined width="280px">
              <gear-type-select v-model="form.type" class="mb-2" />
              <gear-set-select v-model="form.set" />
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
                      <v-slider v-model="form.level" hide-details max="8" min="0" :tick-labels="levelTicks" />
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
        <v-btn class="font-weight-bold" color="primary" text @click="submit">{{ submitBtnLabel }}</v-btn>
        <v-btn text @click="resetForm">Reset</v-btn>
        <v-spacer />
        <v-btn text @click="onClose">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-bottom-sheet>
</template>
<style lang="sass" scoped>
::v-deep .v-slide-group__next, ::v-deep .v-slide-group__prev
  min-width: 32px
</style>
<script lang="ts">
import { Gear } from '@/models';
import { GearSetIcon, GearSetSelect, GearTypeIcon, GearTypeSelect } from './common';
import { Vue, Component, Prop, Emit, Watch, Model } from 'vue-property-decorator';
import GearFormStatSelect from './GearFormStatSelect.vue';
import GearStatInput from './GearStatInput.vue';
import { gearService, gearStatRangeService } from '@/services';
import { GearForm, GearFormMode } from '@/models/gear/gear-form';
import { mapActions } from 'vuex';

/**
 * This is a gear form, it takes a gear for edit (undefined for create) and returns a gear object
 */
@Component({
  name: 'gear-form-bottom-sheet',
  components: {
    GearFormStatSelect,
    GearSetIcon,
    GearSetSelect,
    GearStatInput,
    GearTypeIcon,
    GearTypeSelect
  },
  methods: mapActions(['saveGears'])
})
export default class GearFormBottomSheet extends Vue {
  saveGears!: (gear: Gear.Gear[]) => void;
  @Model('input') visible!: boolean; // show / hide
  @Prop({ type: Gear.Gear, required: false, default: undefined }) readonly gear!: Gear.Gear;
  @Prop({ required: false, default: 'new' }) readonly mode: GearFormMode = 'new';

  readonly grades = Object.values(Gear.Grade);
  levelTicks = [67, 70, 71, 75, 78, 80, 85, 88, 90];
  // model
  form = this.defaultForm();

  get mainChanger() {
    return {
      type: this.form.type,
      main: this.form.statInputs[0].stat,
      level: this.levelTicks[this.form.level],
      enhance: this.form.enhance
    };
  }

  get submitBtnLabel() {
    if (this.mode == 'edit' && this.gear && this.gear.id) {
      return 'Edit';
    } else if (this.mode == 'copy' && this.gear && this.gear.id) {
      return 'Copy';
    }
    return 'Create';
  }

  @Watch('mainChanger', { immediate: false, deep: false })
  onMainChangerChanged(val: any) {
    console.log('onMainChangerChanged::val =', val);
    const main = gearStatRangeService.getMain(val.type, val.main, val.level, val.enhance);
    if (main) {
      this.form.statInputs[0].value = main;
    }
  }

  @Watch('visible', { immediate: false, deep: false })
  onVisibleChange(val: Gear.Gear) {
    console.log(`onVisibleChange = ${val}`);
    if (val) {
      this.resetForm();
    }
  }

  onClose() {
    this.$emit('input', false);
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

  defaultForm(): GearForm {
    const defaultInputStats = Array<Gear.StatInput>();
    while (defaultInputStats.length < 5) {
      defaultInputStats.push({ stat: undefined, value: 0 });
    }
    return {
      type: undefined,
      set: undefined,
      grade: Gear.Grade.EPIC,
      level: 6,
      enhance: 15,
      statInputs: defaultInputStats
    };
  }

  convertToForm(gear: Gear.Gear) {
    return {
      type: gear.type!!,
      set: gear.set!!,
      grade: gear.grade!!,
      level: this.levelTicks.indexOf(gear.level!!),
      enhance: gear.enhance!!,
      statInputs: gear.getStatInputs()
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

  resetForm() {
    console.log('resetForm', this.gear);
    if (this.gear && this.gear.id && (this.mode == 'edit' || this.mode == 'copy')) {
      this.updateForm(this.convertToForm(this.gear));
    } else {
      this.updateForm(this.defaultForm());
    }
    console.log('resetForm::form', this.form);
  }

  updateForm(form: GearForm) {
    this.form.type = form.type;
    this.form.set = form.set;
    this.form.grade = form.grade;
    this.form.level = form.level;
    this.form.enhance = form.enhance;
    for (let i = 0; i < this.form.statInputs.length; i++) {
      if (i < form.statInputs.length) {
        Object.assign(this.form.statInputs[i], form.statInputs[i]);
      } else {
        this.form.statInputs[i].stat = undefined;
        this.form.statInputs[i].value = 0;
      }
    }
  }

  submit() {
    if (!this.form.set || !this.form.type || !this.form.statInputs[0].stat) {
      console.log('submit::TODO: show validation message');
      return;
    }
    // let gear = this.gear ? new Gear.Gear(this.gear.id) : new Gear.Gear();
    let gear = new Gear.Gear(
      this.gear && this.mode == 'edit' ? this.gear.id : undefined,
      this.form.type,
      this.form.set,
      this.form.grade.name,
      this.levelTicks[this.form.level],
      this.form.enhance,
      this.form.statInputs[0].stat.value
    );
    gear.set = this.form.set;
    gear.type = this.form.type;
    for (let i = 0; i < this.form.statInputs.length; i++) {
      if (this.form.statInputs[i].stat && this.form.statInputs[i].value > 0) {
        Vue.set(gear, this.form.statInputs[i].stat!.value, this.form.statInputs[i].value);
      }
    }
    gear.locked = this.gear ? this.gear.locked : false;
    gear.equippedHero = this.gear && this.mode == 'edit' ? this.gear.equippedHero : '';
    gearService.assignScore(gear);
    console.log('submit::gear =', gear);
    this.saveGears([gear]);
    this.onClose();
  }
}
</script>
