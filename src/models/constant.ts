import { Gear } from '.';

type Constants = {
  GearStat: {
    PRIMITIVE: Readonly<Gear.Stat[]>;
    HERO_PRIMITIVE: Readonly<Gear.Stat[]>;
    SCORES: Readonly<Gear.Stat[]>;
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
    HERO_PRIMITIVE: Object.freeze([
      Gear.Stat.HP,
      Gear.Stat.DEF,
      Gear.Stat.ATK,
      Gear.Stat.CRI,
      Gear.Stat.CDMG,
      Gear.Stat.SPD,
      Gear.Stat.EFF,
      Gear.Stat.RES
    ]),
    SCORES: Object.freeze([Gear.Stat.SCORE, Gear.Stat.OFF_SCORE, Gear.Stat.DEF_SCORE]),
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
