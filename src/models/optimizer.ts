import { Gear, Hero, HeroAbility, Range } from '.';
import { GearAbility } from './common';

export type OptimizationEvaluationCriteria = {
  forcedSets: Gear.Set[];
  limit: number;
  brokenSet: boolean;
  lv85: boolean;
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
};

/**
 * Full configuration of an optimization process
 */
export type OptimizationProfile = {
  id: string;
  hero: OptimizationHero;
  filter: OptimizationFilter;
  stat: OptimizationStatCriteria;
  evaluation: OptimizationEvaluationCriteria;
  // criteria: OptimizerCriteria;
};

export type OptimizationResult = HeroAbility & {
  id: number;
  damage: number;
  dms: number;
  ehp: number;
  rating: number;
  sets: string[];
  weaponId?: string;
  helmetId?: string;
  armorId?: string;
  necklaceId?: string;
  ringId?: string;
  bootId?: string;
};

export enum OptimizationFilterEquippedMode {
  ALL = 0,
  // SAME_TIER = 1,
  LOWER_ORDER = 1,
  NONE = 2
}

export type OptimizationFilter = {
  sets: Gear.Set[];
  necklaces: Gear.Stat[];
  rings: Gear.Stat[];
  boots: Gear.Stat[];
  maxSize: number;
  enhanceMode: Gear.EnhanceModeFilter;
  equippedMode: OptimizationFilterEquippedMode;
};

// export type OptimizationHeroForm = HeroAbility & {
//   id: string;
// };

export type OptimizationForm = {
  profile: OptimizationProfile;
  hero: Hero;
};
