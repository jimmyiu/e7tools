export enum FilterMode {
  ALL = 0,
  YES = 1,
  NO = 2
}

export enum SortingOrder {
  NONE = 0,
  ASCENDING = 1,
  DESCENDING = 2
}

export type Range = {
  min?: number;
  max?: number;
};

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

export type GearAbility = {
  hpp?: number;
  hp?: number;
  defp?: number;
  def?: number;
  atkp?: number;
  atk?: number;
  cri?: number;
  cdmg?: number;
  spd?: number;
  eff?: number;
  res?: number;
};
