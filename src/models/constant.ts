import { Gear } from '.';

type Constants = {
  GearStat: {
    PRIMITIVE: Readonly<Gear.Stat[]>;
  };
  HERO_STATS: Readonly<Gear.Stat[]>;
};

export const Constants: Constants = {
  GearStat: {
    PRIMITIVE: Object.freeze([
      Gear.Stat.HPP,
      Gear.Stat.HP,
      Gear.Stat.DEFP,
      Gear.Stat.DEF,
      Gear.Stat.ATKP,
      Gear.Stat.ATK,
      Gear.Stat.CRI,
      Gear.Stat.CDMG,
      Gear.Stat.SPD,
      Gear.Stat.EFF,
      Gear.Stat.RES
    ])
  },
  HERO_STATS: Object.freeze([
    Gear.Stat.HP,
    Gear.Stat.DEF,
    Gear.Stat.ATK,
    Gear.Stat.CRI,
    Gear.Stat.CDMG,
    Gear.Stat.SPD,
    Gear.Stat.EFF,
    Gear.Stat.RES
  ])
};

// export const Constants = {
//   CURRENT_PERSISTENT_DATA_VERSION: '0.5.0',
//   OPTIMIZATION_PROCESS_LIMIT: 20000000,
//   DEFAULT_HERO_ID: 'arbiter-vildred', // 'iseria',
//   KEY_VUEXDATA: 'vuex.data',

//   NECKLACE_STATS: [
//     Gear.Stat.HPP,
//     Gear.Stat.HP,
//     Gear.Stat.DEFP,
//     Gear.Stat.DEF,
//     Gear.Stat.ATKP,
//     Gear.Stat.ATK,
//     Gear.Stat.CRI,
//     Gear.Stat.CDMG
//   ],
//   RING_STATS: [
//     Gear.Stat.HPP,
//     Gear.Stat.HP,
//     Gear.Stat.DEFP,
//     Gear.Stat.DEF,
//     Gear.Stat.ATKP,
//     Gear.Stat.ATK,
//     Gear.Stat.EFF,
//     Gear.Stat.RES
//   ],
//   BOOT_STATS: [
//     Gear.Stat.HPP,
//     Gear.Stat.HP,
//     Gear.Stat.DEFP,
//     Gear.Stat.DEF,
//     Gear.Stat.ATKP,
//     Gear.Stat.ATK,
//     Gear.Stat.SPD
//   ],
//   HERO_STATS: [
//     Gear.Stat.HP,
//     Gear.Stat.DEF,
//     Gear.Stat.ATK,
//     Gear.Stat.CRI,
//     Gear.Stat.CDMG,
//     Gear.Stat.SPD,
//     Gear.Stat.EFF,
//     Gear.Stat.RES
//   ]
// };
