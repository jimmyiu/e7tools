import { Gear, Suit } from '.';
import { HeroAbility } from './common';

export type Hero = HeroAbility & {
  id: string;
  name: string;
  icon: string;
};

export type EquipedHero = HeroAbility & {
  combination: Gear.GearCombination;
  suit: Suit;
  damage: number;
  ehp: number;
  dms: number;
};
