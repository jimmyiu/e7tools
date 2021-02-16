import { Gear } from '.';
import { HeroAbility } from './common';

export type Hero = HeroAbility & {
  id: string;
  name: string;
  icon: string;
};

export type EquipedHero = HeroAbility & {
  combination: Gear.GearCombination;
  damage: number;
  ehp: number;
};
