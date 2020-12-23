<template>
  <div class="about">
    <message-box title="Current Status">
      <ul>
        <li>As data structure is not finalized, need to import gear everytime now</li>
        <li>Working on simple scoring</li>
        <li>Add Gear by UI is not working now</li>
      </ul>
      <br />2020-12-24
    </message-box>
    <message-box hide-default title="Project Background">
      I am going to work on an <a href="https://page.onstove.com/epicseven/global" target="_blank">Epic Seven</a> online
      tools platform. My initiative in doing this is to due with the complicated gear system of this game. It is hard to
      determine a gear is good or bad, and also hard to optimize how to equip the gears to achieve the desired
      ability.<br /><br />
      2020-12-06
    </message-box>
    <message-box hide-default title="Milestones">
      My first target is to complete the MVP with a simple gear management tool. Basically, it has to supports:
      <ol>
        <li>create / list / update / delete gears</li>
        <li>import / export gears using JSON</li>
        <li>
          import gears JSON from <a href="https://github.com/e7-tools/gear-reader" target="_blank">E7 Gear Reader</a>
        </li>
      </ol>
    </message-box>
    <message-box hide-default title="Version History">
      [2020-12-23] add import tool, simple score<br />
      [2020-12-20] fix mobile ui<br />
      [2020-12-19] deploy to GitHub page<br />
      [2020-12-06] project kick start
    </message-box>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { MessageBox } from '@/components';

@Component({
  components: { MessageBox }
})
export default class HomePage extends Vue {
  name: string = 'home-page';
}
</script>
