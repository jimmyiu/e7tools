<template>
  <div class="about">
    <message-box title="Current Status">
      <ul>
        <li>
          This site is lack of documentations at this moment. You can try Setting > Import to play around with the
          sample data
        </li>
        <li>You can use Others > Hero to configure hero bonus stat and tier</li>
        <li>Gear Management & Gear Optimizer features are working</li>
        <li>Next target: Gear page desktop layout</li>
      </ul>
      <br />2021-03-10
    </message-box>
    <message-box hide-default title="Project Background">
      I am going to work on an <a href="https://page.onstove.com/epicseven/global" target="_blank">Epic Seven</a> online
      tools platform. My initiative is to deal with the complicated gear system of this game. It is hard to determine a
      gear is good or bad, and also hard to optimize the equip combination to achieve a desired ability.<br /><br />
      2020-12-06
    </message-box>
    <!-- <message-box hide-default title="Milestones">
      My first target is to complete the MVP with a simple gear management tool. Basically, it has to supports:
      <ol>
        <li>create / list / update / delete gears</li>
        <li>import / export gears using JSON</li>
        <li>
          import gears JSON from <a href="https://github.com/e7-tools/gear-reader" target="_blank">E7 Gear Reader</a>
        </li>
      </ol>
    </message-box> -->
    <message-box hide-default title="Progress">
      [2021-03-10] enhance gear page to support mobile layout<br />
      [2021-03-04] enhance gear page<br />
      [2021-03-03] add tier support for hero and optimizer<br />
      [2021-03-02] enhance gear management page<br />
      [2020-02] complete basic optimizer and hero setup<br />
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
  name: 'home-page',
  components: { MessageBox }
})
export default class HomePage extends Vue {}
</script>
