import { Gear } from '.';

export type SuitAbility = {
  hpp: number;
  hp: number;
  defp: number;
  def: number;
  atkp: number;
  atk: number;
  cri: number;
  cdmg: number;
  spd: number;
  eff: number;
  res: number;
};

export type Suit = {
  ability: SuitAbility;
  sets: Gear.Set[];
  weapon?: Gear.Gear;
  helmet?: Gear.Gear;
  armor?: Gear.Gear;
  necklace?: Gear.Gear;
  ring?: Gear.Gear;
  boot?: Gear.Gear;
};
