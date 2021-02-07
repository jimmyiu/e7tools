import { Gear2 } from '.';

export type HeroAbility = {
  hp: number;
  def: number;
  atk: number;
  cri: number;
  cdmg: number;
  spd: number;
  eff: number;
  res: number;
};

export type Hero = HeroAbility & {
  id: string;
  name: string;
  icon: string;
};

export type EquipedHero = HeroAbility & {
  combination: Gear2.GearCombination;
  damage: number;
  ehp: number;
};
