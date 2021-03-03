import { Gear, Hero, HeroAbility, OptimizationProfile, OptimizationStatCriteria, Suit, SuitAbility } from '@/models';
import { GearAbility, Range } from '@/models/common';
import { OptimizationEvaluationCriteria, OptimizationFilter, OptimizationFilterEquippedMode } from '@/models/optimizer';

export const emptyRange: () => Range = () => {
  return {
    min: undefined,
    max: undefined
  };
};

export const emptyHeroAbility: () => HeroAbility = () => {
  return {
    hp: 0,
    def: 0,
    atk: 0,
    cri: 0,
    cdmg: 0,
    spd: 0,
    eff: 0,
    res: 0
  };
};

export const emptyGearAbility: () => GearAbility = () => {
  return {
    hpp: undefined,
    hp: undefined,
    defp: undefined,
    def: undefined,
    atkp: undefined,
    atk: undefined,
    cri: undefined,
    cdmg: undefined,
    spd: undefined,
    eff: undefined,
    res: undefined
  };
};

export const emptyOptimizationStatCriteria: () => OptimizationStatCriteria = () => {
  return {
    hp: emptyRange(),
    def: emptyRange(),
    atk: emptyRange(), // { min: 3500 },
    cri: { min: undefined, max: 110 }, // min: 96,
    cdmg: { min: undefined, max: 360 }, // min: 270,
    spd: emptyRange(), // min: 218
    eff: emptyRange(),
    res: emptyRange(),
    ehp: emptyRange(),
    damage: emptyRange()
  };
};

export const emptyOptimizationFilter: () => OptimizationFilter = () => {
  return {
    sets: [],
    necklaces: [],
    rings: [],
    boots: [],
    maxSize: 0,
    enhanceMode: Gear.EnhanceModeFilter.ONLY_15,
    equippedMode: OptimizationFilterEquippedMode.NONE
  };
};

export const emptyOptimizationEvaluationCriteria: () => OptimizationEvaluationCriteria = () => {
  return {
    forcedSets: [],
    brokenSet: false,
    limit: 10000000,
    lv85: false
  };
};

export const emptyOptimizationProfile: () => OptimizationProfile = () => {
  return {
    id: '',
    hero: {
      id: ''
    },
    filter: emptyOptimizationFilter(),
    stat: emptyOptimizationStatCriteria(),
    evaluation: emptyOptimizationEvaluationCriteria()
  };
};

export const emptyHero: () => Hero = () => {
  return {
    id: '',
    ...emptyHeroAbility(),
    name: '',
    icon: '',
    rarity: 0,
    attribute: '',
    role: '',
    tier: 0,
    bonusAbility: emptyGearAbility(),
    abilityRating: emptyHeroAbility()
  };
};

export const emptySuitAbility: () => SuitAbility = () => {
  return {
    hpp: 0,
    hp: 0,
    defp: 0,
    def: 0,
    atkp: 0,
    atk: 0,
    cri: 0,
    cdmg: 0,
    spd: 0,
    eff: 0,
    res: 0
  };
};

export const emptySuit: () => Suit = () => {
  return {
    ability: emptySuitAbility(),
    sets: [],
    weapon: undefined,
    armor: undefined,
    helmet: undefined,
    necklace: undefined,
    ring: undefined,
    boot: undefined
  };
};
