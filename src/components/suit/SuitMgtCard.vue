<template>
  <v-card>
    <v-card-title class="py-3">
      Current Suit
    </v-card-title>
    <v-card-text class="pa-2">
      <suit-gear-view v-model="selectedIds" selectable :suit="currentEquipped.suit" />
    </v-card-text>
    <v-divider />
    <v-card-actions>
      <v-btn class="font-weight-bold" color="primary" text>Save</v-btn>
      <!-- <v-btn class="font-weight-bold" color="success" :disabled="!selected" text @click="equip">Equip</v-btn> -->
      <v-btn class="font-weight-bold" color="warning" :disabled="!selected" text @click="unequip">Unequip</v-btn>
      <v-btn :disabled="!selected" text @click="clear">Clear</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script lang="ts">
import { EquippedHero, Gear, Suit } from '@/models';
import { Vue, Component, Prop, Emit, Model } from 'vue-property-decorator';
import { SuitGearView } from '@/components';
import { mapActions, mapGetters } from 'vuex';

/**
 * TODO: add slider
 */
@Component({
  name: 'suit-mgt-card',
  computed: { ...mapGetters(['getEquippedHero', 'getGear']) },
  components: { SuitGearView },
  methods: { ...mapActions(['saveGears']) }
})
export default class SuitMgtCard extends Vue {
  getEquippedHero!: (heroId: string) => EquippedHero | undefined;
  saveGears!: (gear: Gear.Gear[]) => void;
  getGear!: (gearId: string) => Gear.Gear | undefined;
  @Prop() readonly heroId!: string;
  selectedIds: string[] = [];

  get currentEquipped() {
    return this.getEquippedHero(this.heroId);
  }

  get selected() {
    return this.selectedIds.length > 0;
  }

  equip() {
    console.log('equip::', this.selectedIds);
    if (this.selectedIds.length > 0) {
      this.selectedIds.forEach(id => {
        const gear = this.getGear(id);
        if (gear) {
          gear.equippedHero = this.heroId;
          this.saveGears([gear]);
        }
      });
    }
  }

  unequip() {
    console.log('unequip::', this.selectedIds);
    if (this.selectedIds.length > 0) {
      this.selectedIds.forEach(id => {
        const gear = this.getGear(id);
        if (gear) {
          gear.equippedHero = '';
          this.saveGears([gear]);
        }
      });
    }
  }

  clear() {
    this.selectedIds.splice(0, this.selectedIds.length);
  }
}
</script>
