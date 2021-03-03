import Vue from 'vue';
import { Constants } from '@/models/constant';

declare module 'vue/types/vue' {
  interface Vue {
    $const: typeof Constants;
  }
}

export default new (class ConstantPlugin {
  public install(Vue: any) {
    Vue.prototype.$const = Constants;
  }
})();
