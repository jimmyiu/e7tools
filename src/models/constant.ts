import { Gear } from '.';

type Constants = {
  GearStat: {
    PRIMITIVE: Readonly<Gear.Stat[]>;
    NECKLACE_MAIN_STATS: Readonly<Gear.Stat[]>;
    RING_MAIN_STATS: Readonly<Gear.Stat[]>;
    BOOT_MAIN_STATS: Readonly<Gear.Stat[]>;
  };
  GearSet: {
    ALL: Readonly<Gear.Set[]>;
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
    ]),
    NECKLACE_MAIN_STATS: Object.freeze([
      Gear.Stat.HPP,
      Gear.Stat.HP,
      Gear.Stat.DEFP,
      Gear.Stat.DEF,
      Gear.Stat.ATKP,
      Gear.Stat.ATK,
      Gear.Stat.CRI,
      Gear.Stat.CDMG
    ]),
    RING_MAIN_STATS: Object.freeze([
      Gear.Stat.HPP,
      Gear.Stat.HP,
      Gear.Stat.DEFP,
      Gear.Stat.DEF,
      Gear.Stat.ATKP,
      Gear.Stat.ATK,
      Gear.Stat.EFF,
      Gear.Stat.RES
    ]),
    BOOT_MAIN_STATS: Object.freeze([
      Gear.Stat.HPP,
      Gear.Stat.HP,
      Gear.Stat.DEFP,
      Gear.Stat.DEF,
      Gear.Stat.ATKP,
      Gear.Stat.ATK,
      Gear.Stat.SPD
    ])
  },
  GearSet: {
    ALL: Object.freeze([...Object.values(Gear.Set)])
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
