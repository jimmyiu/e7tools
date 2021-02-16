import { Gear, Range } from '.';

export type OptimizationCombinationCriteria = {
  forcedSets: Gear.Set[];
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
