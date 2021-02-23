import { EquippedHero, Gear, Hero, Suit } from '@/models';

export function equip(hero: Hero, suit: Suit): EquippedHero {
  const extra = determineSetsExtraAbility(suit.sets);
  const result: EquippedHero = {
    hp: Math.trunc(hero.hp * (1 + (suit.ability.hpp + extra.hpp) / 100)) + suit.ability.hp,
    def: Math.trunc(hero.def * (1 + (suit.ability.defp + extra.defp) / 100)) + suit.ability.def,
    atk: Math.trunc(hero.atk * (1 + (suit.ability.atkp + extra.atkp) / 100)) + suit.ability.atk,
    cri: hero.cri + suit.ability.cri + extra.cri,
    cdmg: hero.cdmg + suit.ability.cdmg + extra.cdmg,
    spd: Math.trunc(hero.spd * (1 + extra.spdp / 100)) + suit.ability.spd,
    eff: hero.eff + suit.ability.eff + extra.eff,
    res: hero.res + suit.ability.res + extra.res,
    damage: 0,
    ehp: 0,
    dms: 0,
    suit: suit,
    combination: {} as Gear.GearCombination
  };
  result.damage = Math.trunc((result.atk * Math.min(result.cdmg, 350)) / 1000);
  result.ehp = Math.trunc(result.hp * (1 + result.def / 300));
  result.dms = Math.trunc((result.damage * result.spd) / 100);
  return result;
}
function determineSetsExtraAbility(sets: Gear.Set[]) {
  const result: Gear.SetAbility = {
    hpp: 0,
    defp: 0,
    atkp: 0,
    cri: 0,
    cdmg: 0,
    spdp: 0,
    eff: 0,
    res: 0
  };
  for (let i = 0; i < sets.length; i++) {
    if (sets[i] == Gear.Set.Health) {
      result.hpp += 12;
    } else if (sets[i] == Gear.Set.Defense) {
      result.defp += 12;
    } else if (sets[i] == Gear.Set.Attack) {
      result.atkp += 35;
    } else if (sets[i] == Gear.Set.Critical) {
      result.cri += 12;
    } else if (sets[i] == Gear.Set.Destruction) {
      result.cdmg += 40;
    } else if (sets[i] == Gear.Set.Speed) {
      result.spdp += 25;
    } else if (sets[i] == Gear.Set.Hit) {
      result.eff += 12;
    } else if (sets[i] == Gear.Set.Resist) {
      result.res += 12;
    }
  }
  return result;
}
