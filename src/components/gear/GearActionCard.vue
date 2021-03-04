<template>
  <v-card class="pa-1" elevation="0" outlined>
    <v-card-actions class="pa-0 mt-0 d-flex justify-space-between">
      <div>
        <v-btn class="font-weight-bold" color="primary" text @click="createGear">Create</v-btn>
        <!-- <v-btn :disabled="!gear" text @click="clear">Clear</v-btn> -->
      </div>
      <div>
        <v-btn :disabled="!gear" icon @click="copyGear"><v-icon>mdi-content-copy</v-icon></v-btn>
        <v-btn :disabled="!gear" icon @click="editGear"><v-icon>edit</v-icon></v-btn>
        <v-btn :disabled="!gear" icon @click="deleteGear"><v-icon>delete</v-icon></v-btn>
      </div>
    </v-card-actions>
    <gear-form-bottom-sheet v-model="form.visible" :gear="gear" :mode="form.mode" />
  </v-card>
</template>
<script lang="ts">
import { Gear } from '@/models';
import GearCard from './GearCard.vue';
import GearFormBottomSheet from './GearFormBottomSheet.vue';
import { mapGetters, mapActions } from 'vuex';
import { Vue, Component, Prop, Model } from 'vue-property-decorator';
import { GearFormMode } from '@/models/gear/gear-form';

@Component({
  name: 'gear-action-card',
  components: { GearCard, GearFormBottomSheet },
  computed: { ...mapGetters(['getGear']) },
  methods: mapActions(['removeGears'])
})
export default class GearActionCard extends Vue {
  getGear!: (gearId: string) => Gear.Gear | undefined;
  removeGears!: (gears: Gear.Gear[]) => void;
  @Model('clear') gearId?: string;
  form = {
    visible: false,
    mode: 'new',
    gear: undefined
  } as {
    visible: boolean;
    mode: GearFormMode;
    gear?: Gear.Gear;
  };

  get gear() {
    if (this.gearId) {
      return this.getGear(this.gearId);
    }
    return undefined;
  }

  createGear() {
    this.form.gear = undefined;
    this.form.mode = 'new';
    this.form.visible = true;
  }

  editGear() {
    console.log('editGear::gear.id = ' + this.gear!.id);
    this.form.gear = this.gear;
    this.form.mode = 'edit';
    this.form.visible = true;
  }

  copyGear() {
    this.form.gear = this.gear;
    this.form.mode = 'copy';
    this.form.visible = true;
  }

  deleteGear() {
    if (
      this.gear &&
      window.confirm(`Are you sure to delete the gear with type = ${this.gear.type} and set = ${this.gear.set}?`)
    ) {
      this.removeGears([this.gear]);
      this.clear();
    }
  }

  clear() {
    this.$emit('clear', '');
  }
}
</script>
