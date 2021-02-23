import { Range, HeroAbility } from './common';
import { Gear } from './gear';
import { Hero, EquipedHero } from './hero';
import { Suit, SuitAbility } from './suit';
import {
  OptimizationProfile,
  OptimizationStatCriteria,
  OptimizationEvaluationCriteria,
  OptimizationHero
} from './optimizer';

export { Gear, Range, Suit, SuitAbility };
export { Hero, HeroAbility, EquipedHero };
export { OptimizationProfile, OptimizationStatCriteria, OptimizationEvaluationCriteria, OptimizationHero };

export const Constants = {
  CURRENT_PERSISTENT_DATA_VERSION: '0.4.0',
  OPTIMIZATION_PROCESS_LIMIT: 20000000,
  DEFAULT_HERO_ID: 'arbiter-vildred', // 'iseria',
  KEY_VUEXDATA: 'vuex.data',

  // GEAR_FILTER_DEFAULT: {
  //   sets: [],
  //   enhanceMode: Gear.EnhanceModeFilter.ONLY_15,
  //   necklaces: [], // [Gear.Stat.CDMG, Gear.Stat.ATKP, Gear.Stat.ATK],
  //   rings: [], // [Gear.Stat.ATKP, Gear.Stat.ATK],
  //   boots: [],
  //   locked: false,
  //   equipped: false,
  //   score: 0,
  //   rating: {
  //     point: {
  //       hp: 1,
  //       def: 1,
  //       atk: 1,
  //       cri: 1,
  //       cdmg: 1,
  //       spd: 1,
  //       eff: 1,
  //       res: 1
  //     },
  //     threshold: 100
  //   }
  // } as Gear.GearFilter,
  //
  NECKLACE_STATS: [
    Gear.Stat.HPP,
    Gear.Stat.HP,
    Gear.Stat.DEFP,
    Gear.Stat.DEF,
    Gear.Stat.ATKP,
    Gear.Stat.ATK,
    Gear.Stat.CRI,
    Gear.Stat.CDMG
  ],
  RING_STATS: [
    Gear.Stat.HPP,
    Gear.Stat.HP,
    Gear.Stat.DEFP,
    Gear.Stat.DEF,
    Gear.Stat.ATKP,
    Gear.Stat.ATK,
    Gear.Stat.EFF,
    Gear.Stat.RES
  ],
  BOOT_STATS: [Gear.Stat.HPP, Gear.Stat.HP, Gear.Stat.DEFP, Gear.Stat.DEF, Gear.Stat.ATKP, Gear.Stat.ATK, Gear.Stat.SPD]
};

export type SiteState = {
  lastSelectedHeroId: string;
};

export type VuexData = {
  gears: Array<Gear.Gear>;
  profiles: Array<OptimizationProfile>;
  heros: Array<Hero>;
  state: SiteState;
};
