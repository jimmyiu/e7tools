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
