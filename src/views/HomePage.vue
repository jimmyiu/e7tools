<template>
  <div class="about">
    <message-box title="Current Status">
      <p>This tool is under development</p>
      <ul>
        <li>Gear Management feature is working, but definitely a lot of things have to improve</li>
        <li>
          Gears are presisted in localstorage, a simple import / export function is provided (may revise later)
        </li>
        <li>Next target: Gear Optimizer</li>
      </ul>
      <br />2021-02-04
    </message-box>
    <message-box hide-default title="Project Background">
      I am going to work on an <a href="https://page.onstove.com/epicseven/global" target="_blank">Epic Seven</a> online
      tools platform. My initiative is to deal with the complicated gear system of this game. It is hard to determine a
      gear is good or bad, and also hard to optimize the equip combination to achieve a desired ability.<br /><br />
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
    <message-box hide-default title="Progress">
      [2021-02-03] adopt web worker for optimizer calculation<br />
      [2021-02-02] start gear optimizer<br />
      [2021-02-01] complete edit gear<br />
      [2020-01] no progress<br />
      [2020-12] foundation setup, including data structure and settings<br />
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
