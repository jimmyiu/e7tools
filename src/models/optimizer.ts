import { Gear, HeroAbility, Range } from '.';
import { GearAbility } from './common';

export type OptimizationEvaluationCriteria = {
  forcedSets: Gear.Set[];
  limit: number;
  brokenSet: boolean;
};

export type OptimizationStatCriteria = {
  hp: Range;
  def: Range;
  atk: Range;
  cri: Range;
  cdmg: Range;
  spd: Range;
  eff: Range;
  res: Range;
  ehp: Range;
  damage: Range;
};

export type OptimizationHero = {
  id: string;
  bonusAbility: GearAbility;
};

/**
 * Full configuration of an optimization process
 */
export type OptimizationProfile = {
  id: string;
  hero: OptimizationHero;
  filter: Gear.GearFilter;
  stat: OptimizationStatCriteria;
  evaluation: OptimizationEvaluationCriteria;
  // criteria: OptimizerCriteria;
};

export type OptimizationResult = HeroAbility & {
  id: number;
  damage: number;
  dms: number;
  ehp: number;
  sets: string[];
  weaponId?: string;
  helmetId?: string;
  armorId?: string;
  necklaceId?: string;
  ringId?: string;
  bootId?: string;
};

export const EMPTY_PROFILE: OptimizationProfile = Object.freeze({
  id: '',
  hero: {
    id: '',
    bonusAbility: {
      atk: undefined,
      atkp: undefined
    }
  },
  filter: {
    sets: [],
    enhanceMode: Gear.EnhanceModeFilter.ONLY_15,
    necklaces: [], // [Gear.Stat.CDMG, Gear.Stat.ATKP, Gear.Stat.ATK],
    rings: [], // [Gear.Stat.ATKP, Gear.Stat.ATK],
    boots: [],
    locked: false,
    equipped: false,
    score: 0,
    rating: {
      point: {
        hp: 1,
        def: 1,
        atk: 1,
        cri: 1,
        cdmg: 1,
        spd: 1,
        eff: 1,
        res: 1
      },
      threshold: 100
    }
  },
  stat: {
    hp: {},
    def: {},
    atk: {}, // { min: 3500 },
    cri: { max: 110 }, // min: 96,
    cdmg: { max: 360 }, // min: 270,
    spd: {}, // min: 218
    eff: {},
    res: {},
    ehp: {},
    damage: {}
  },
  evaluation: {
    forcedSets: [], // [Gear.Set.Speed, Gear.Set.Critical]
    limit: 20000000,
    brokenSet: true
  }
});
