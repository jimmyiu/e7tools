import { Gear, Suit } from '.';
import { GearAbility, HeroAbility } from './common';

export type Hero = HeroAbility & {
  id: string;
  name: string;
  icon: string;
  rarity: number;
  attribute: string;
  role: string;
  order: number;
  bonusAbility: GearAbility;
  abilityRating: HeroAbility;
};

export type EquippedHero = HeroAbility & {
  // combination: Gear.GearCombination;
  hero: Readonly<Hero>;
  suit: Suit;
  damage: number;
  ehp: number;
  dms: number;
};
