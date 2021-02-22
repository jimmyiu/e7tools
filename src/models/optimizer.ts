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
