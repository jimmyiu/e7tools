import { HeroAbility } from '@/models';
import { GearAbility } from '@/models/common';

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
