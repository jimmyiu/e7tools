import { Range } from './common';
import { Gear } from './gear';
import { Hero, HeroAbility, EquipedHero } from './hero';
import { E7db } from './e7db';
import { OptimizationProfile, OptimizationStatCriteria, OptimizationCombinationCriteria } from './optimizer';

export { Gear, Range, E7db };
export { Hero, HeroAbility, EquipedHero };
export { OptimizationProfile, OptimizationStatCriteria, OptimizationCombinationCriteria };

export const Constants = {
  CURRENT_PERSISTENT_DATA_VERSION: '0.2.1',
  KEY_VUEXDATA: 'vuex.data',
  KEY_E7DBDAYA: 'vuex.e7db',
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
