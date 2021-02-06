import { Gear, Gear2, Hero, HeroAbility } from '.';

/**
 * Full configuration of an optimization process
 */
export type OptimizationProfile = {
  id: string;
  hero: Hero;
  filter: Gear.GearFilter;
  criteria: Gear.GearOptimizerCriteria;
};

export type OptimizationResult = {
  ability: HeroAbility;
  combination: Gear2.GearCombination;
};
