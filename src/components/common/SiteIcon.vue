<template>
  <router-link v-ripple class="site-icon" tag="div" :to="{ name: 'home' }">
    E7Tools<sup>
      <v-icon class="icon">mdi-chat-outline</v-icon>
      <!-- <div class="text">JI</div> -->
      <span class="text">JI</span>
    </sup>
  </router-link>
</template>
<style lang="sass" scoped>
.site-icon
  font-size: 20px
  font-weight: 700
  white-space: nowrap
  cursor: pointer
  padding: 4px 4px 2px 4px
  border-radius: 4px
  // &:hover
  //   background-color: #363636
.icon
  margin-top: -6px
.text
  position: absolute
  top: 5px
  left: 6px
  font-size: 12px
.effect-1
  color: black
  text-shadow: -1px 0 white, 0 1px white, 1px 0 white, 0 -1px white
</style>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class SiteIcon extends Vue {
  name: string = 'site-icon';
}
</script>
