import { Range, HeroAbility } from './common';
import { Gear } from './gear';
import { Hero, EquipedHero } from './hero';
import { Suit, SuitAbility } from './suit';
import { OptimizationProfile, OptimizationStatCriteria, OptimizationCombinationCriteria } from './optimizer';

export { Gear, Range, Suit, SuitAbility };
export { Hero, HeroAbility, EquipedHero };
export { OptimizationProfile, OptimizationStatCriteria, OptimizationCombinationCriteria };

export const Constants = {
  CURRENT_PERSISTENT_DATA_VERSION: '0.3.1',
  OPTIMIZATION_CALCULATION_LIMIT: 20000000,
  OPTIMIZATION_RESULT_LIMIT: 10000,
  DEFAULT_HERO_ID: 'iseria',
  KEY_VUEXDATA: 'vuex.data',

  GEAR_FILTER_DEFAULT: {
    sets: [],
    enhanceMode: Gear.EnhanceModeFilter.ONLY_15,
    necklaces: [], // [Gear.Stat.CDMG, Gear.Stat.ATKP, Gear.Stat.ATK],
    rings: [], // [Gear.Stat.ATKP, Gear.Stat.ATK],
    boots: [],
    locked: false,
    equipped: false
  } as Gear.GearFilter,
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
