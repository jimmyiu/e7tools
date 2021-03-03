import { Range, HeroAbility, FilterMode } from './common';
import { Gear } from './gear';
import { Hero, EquippedHero } from './hero';
import { HeroSuit, Suit, SuitAbility } from './suit';
import {
  OptimizationProfile,
  OptimizationStatCriteria,
  OptimizationEvaluationCriteria,
  OptimizationHero
} from './optimizer';

export { Gear, Range, Suit, SuitAbility, FilterMode };
export { Hero, HeroAbility, EquippedHero };
export { OptimizationProfile, OptimizationStatCriteria, OptimizationEvaluationCriteria, OptimizationHero };

export const Constants = {
  CURRENT_PERSISTENT_DATA_VERSION: '0.5.1',
  OPTIMIZATION_PROCESS_LIMIT: 20000000,
  DEFAULT_HERO_ID: 'arbiter-vildred', // 'iseria',
  KEY_VUEXDATA: 'vuex.data',

  HERO_STATS: [
    Gear.Stat.HP,
    Gear.Stat.DEF,
    Gear.Stat.ATK,
    Gear.Stat.CRI,
    Gear.Stat.CDMG,
    Gear.Stat.SPD,
    Gear.Stat.EFF,
    Gear.Stat.RES
  ]
};

export type SiteState = {
  lastSelectedHeroId: string;
};

export type VuexData = {
  gears: Array<Gear.Gear>;
  profiles: Array<OptimizationProfile>;
  heros: Array<Hero>;
  suits: Array<HeroSuit>;
  state: SiteState;
};
