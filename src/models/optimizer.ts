import { Gear, HeroAbility, Range, SuitAbility } from '.';

export type OptimizationCombinationCriteria = {
  forcedSets: Gear.Set[];
  limit: number;
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

/**
 * Full configuration of an optimization process
 */
export type OptimizationProfile = {
  id: string;
  heroId: string;
  filter: Gear.GearFilter;
  stat: OptimizationStatCriteria;
  combination: OptimizationCombinationCriteria;
  // criteria: OptimizerCriteria;
};

export type OptimizationResult = HeroAbility & {
  id: number;
  damage: number;
  ehp: number;
  sets: string[];
  weaponId?: string;
  helmetId?: string;
  armorId?: string;
  necklaceId?: string;
  ringId?: string;
  bootId?: string;
};
