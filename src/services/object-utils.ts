import { Gear, Hero, HeroAbility, OptimizationProfile, OptimizationStatCriteria } from '@/models';
import { GearAbility, Range } from '@/models/common';
import { Constants } from '@/models/constant';
import { OptimizationEvaluationCriteria, OptimizationFilter } from '@/models/optimizer';

export const assignRange: (to: Range, from: Range) => void = (to: Range, from: Range) => {
  to.min = from.min;
  to.max = from.max;
};

export const assignHeroAbility: (to: HeroAbility, from: HeroAbility) => void = (to: HeroAbility, from: HeroAbility) => {
  to.hp = from.hp;
  to.def = from.def;
  to.atk = from.atk;
  to.cri = from.cri;
  to.cdmg = from.cdmg;
  to.spd = from.spd;
  to.eff = from.eff;
  to.res = from.res;
};

export const assignGearAbility: (to: GearAbility, from: GearAbility) => void = (to: GearAbility, from: GearAbility) => {
  to.hpp = from.hpp;
  to.hp = from.hp;
  to.defp = from.defp;
  to.def = from.def;
  to.atkp = from.atkp;
  to.atk = from.atk;
  to.cri = from.cri;
  to.cdmg = from.cdmg;
  to.spd = from.spd;
  to.eff = from.eff;
  to.res = from.res;
  // (Constants.GearStat.PRIMITIVE.map(x => x.value) as (keyof GearAbility)[]).forEach(x => {
  //   to[x] = from[x];
  // });
};

export const assignHero: (to: Hero, from: Hero) => void = (to: Hero, from: Hero) => {
  to.id = from.id;
  assignHeroAbility(to, from);
  to.name = from.name;
  to.icon = from.icon;
  to.rarity = from.rarity;
  to.attribute = from.attribute;
  to.role = from.role;
  to.tier = from.tier;
  assignGearAbility(to.bonusAbility, from.bonusAbility);
  assignHeroAbility(to.abilityRating, from.abilityRating);
};

export const assignOptimizationFilter: (to: OptimizationFilter, from: OptimizationFilter) => void = (
  to: OptimizationFilter,
  from: OptimizationFilter
) => {
  to.sets = [...from.sets];
  to.necklaces = [...from.necklaces];
  to.rings = [...from.rings];
  to.boots = [...from.boots];
  to.maxSize = from.maxSize;
  to.enhanceMode = from.enhanceMode;
  to.equippedMode = from.equippedMode;
};

export const assignOptimizationStatCriteria: (to: OptimizationStatCriteria, from: OptimizationStatCriteria) => void = (
  to: OptimizationStatCriteria,
  from: OptimizationStatCriteria
) => {
  assignRange(to.hp, from.hp);
  assignRange(to.def, from.def);
  assignRange(to.atk, from.atk);
  assignRange(to.cri, from.cri);
  assignRange(to.cdmg, from.cdmg);
  assignRange(to.spd, from.spd);
  assignRange(to.eff, from.eff);
  assignRange(to.res, from.res);
  assignRange(to.ehp, from.ehp);
  assignRange(to.damage, from.damage);
};

export const assignOptimizationEvaluationCriteria: (
  to: OptimizationEvaluationCriteria,
  from: OptimizationEvaluationCriteria
) => void = (to: OptimizationEvaluationCriteria, from: OptimizationEvaluationCriteria) => {
  to.brokenSet = from.brokenSet;
  to.forcedSets = [...from.forcedSets];
  to.limit = from.limit;
  to.lv85 = from.lv85;
};

export const assignOptimizationProfile: (to: OptimizationProfile, from: OptimizationProfile) => void = (
  to: OptimizationProfile,
  from: OptimizationProfile
) => {
  to.id = from.id;
  to.hero.id = from.hero.id;
  assignOptimizationFilter(to.filter, from.filter);
  assignOptimizationStatCriteria(to.stat, from.stat);
  assignOptimizationEvaluationCriteria(to.evaluation, from.evaluation);
};
