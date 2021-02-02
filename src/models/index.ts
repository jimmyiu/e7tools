import { Gear } from './gear';
import { Hero } from './hero';

export { Gear, Hero };
export const Constants = {
  KEY_VUEXDATA: 'vuex.data',
  GEAR_FILTER_DEFAULT: {
    sets: [],
    enhanceMode: Gear.EnhanceModeFilter.ONLY_15
  } as Gear.GearFilter
};
