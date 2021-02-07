import { Gear, Gear2, Hero, Range } from '.';

export type OptimizationCombinationCriteria = {
  forcedSets: Gear.Set[];
};

// export interface OptimizerCriteria {
//   hp: Range;
//   def: Range;
//   atk: Range;
//   cri: Range;
//   cdmg: Range;
//   spd: Range;
//   eff: Range;
//   res: Range;
//   ehp: Range;
//   damage: Range;
//   forcedSets: Gear.Set[];
// }

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
  hero: Hero;
  filter: Gear.GearFilter;
  stat: OptimizationStatCriteria;
  combination: OptimizationCombinationCriteria;
  // criteria: OptimizerCriteria;
};
