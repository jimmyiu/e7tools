<template>
  <div>
    <v-alert dense dismissible outlined type="info">Organize heros</v-alert>
    <hero-form-card />
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { HeroFormCard } from '@/components';
import { mapGetters } from 'vuex';

@Component({
  name: 'tier-page',
  components: { HeroFormCard },
  computed: { ...mapGetters(['gears', 'getGear']) }
})
export default class TierPage extends Vue {}
</script>
