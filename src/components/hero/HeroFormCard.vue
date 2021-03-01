<template>
  <v-card>
    hero:
  </v-card>
  <!-- <v-sheet class="mx-auto pa-2">
    <v-row dense>
      <v-col class="d-flex justify-center align-center">
        <div class="mr-2">Hero Setup</div>
        <v-divider />
      </v-col>
    </v-row>
    <v-row dense>
      <v-col>
        <v-autocomplete
          v-model="value.id"
          hide-details
          item-text="name"
          item-value="id"
          :items="heros"
          label="Hero"
          outlined
          @change="changeHero"
        >
          <template v-slot:item="data">
            <v-avatar class="mr-2" left size="32">
              <v-img :src="data.item.icon"></v-img>
            </v-avatar>
            {{ data.item.name }}
          </template>
          <template v-slot:selection="data">
            <v-avatar class="mr-2" left size="32">
              <v-img :src="data.item.icon"></v-img>
            </v-avatar>
            {{ data.item.name }}
          </template>
        </v-autocomplete>
      </v-col>
    </v-row>
    <v-row dense>
      <v-col v-for="(item, key) in stats" :key="key" cols="3">
        <v-text-field v-model.number="value.bonusAbility[item.value]" dense hide-details :label="item.label" outlined />
      </v-col>
    </v-row>
  </v-sheet> -->
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit, Model } from 'vue-property-decorator';
import { OptimizationHero } from '@/models/optimizer';
import { mapGetters } from 'vuex';
import { Gear } from '@/models';

@Component({
  name: 'hero-form-card',
  computed: { ...mapGetters(['heros']) }
})
export default class HeroFormCard extends Vue {
  // readonly stats = [
  //   [Gear.Stat.HP, Gear.Stat.DEF],
  //   [Gear.Stat.ATK, Gear.Stat.CRI],
  //   [Gear.Stat.CDMG, Gear.Stat.SPD],
  //   [Gear.Stat.EFF, Gear.Stat.RES]
  // ];
  @Model() readonly value!: OptimizationHero;

  get stats() {
    return Object.values(Gear.Stat);
  }

  changeHero() {
    if (this.value.id) {
      this.$emit('change-hero', this.value.id);
    }
  }
}
</script>
