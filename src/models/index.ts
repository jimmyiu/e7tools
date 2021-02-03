import { Gear } from './gear';
import { Hero } from './hero';

export { Gear, Hero };
export const Constants = {
  KEY_VUEXDATA: 'vuex.data',
  GEAR_FILTER_DEFAULT: {
    sets: [],
    enhanceMode: Gear.EnhanceModeFilter.ONLY_15,
    necklaces: [Gear.Stat.CDMG, Gear.Stat.ATKP, Gear.Stat.ATK],
    rings: [Gear.Stat.ATKP, Gear.Stat.ATK],
    boots: [Gear.Stat.SPD]
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
