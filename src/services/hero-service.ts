import { EquippedHero, Gear, Hero, Suit } from '@/models';

export function equip(hero: Hero, suit: Suit): EquippedHero {
  const extra = determineSetsExtraAbility(suit.sets);
  const result: EquippedHero = {
    hp: Math.trunc(hero.hp * (1 + (suit.ability.hpp + extra.hpp) / 100)) + suit.ability.hp,
    def: Math.trunc(hero.def * (1 + (suit.ability.defp + extra.defp) / 100)) + suit.ability.def,
    atk: Math.round(hero.atk * (1 + (suit.ability.atkp + extra.atkp) / 100)) + suit.ability.atk,
    cri: Math.trunc((hero.cri + suit.ability.cri + extra.cri) * 10) / 10,
    cdmg: hero.cdmg + suit.ability.cdmg + extra.cdmg,
    spd: Math.trunc(hero.spd * (1 + extra.spdp / 100)) + suit.ability.spd,
    eff: Math.trunc(((hero.eff + suit.ability.eff + extra.eff) * 10) / 10),
    res: Math.trunc(((hero.res + suit.ability.res + extra.res) * 10) / 10),
    damage: 0,
    ehp: 0,
    dms: 0,
    suit: suit,
    hero: hero
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
      result.hpp += 15;
    } else if (sets[i] == Gear.Set.Defense) {
      result.defp += 15;
    } else if (sets[i] == Gear.Set.Attack) {
      result.atkp += 35;
    } else if (sets[i] == Gear.Set.Critical) {
      result.cri += 12;
    } else if (sets[i] == Gear.Set.Destruction) {
      result.cdmg += 40;
    } else if (sets[i] == Gear.Set.Speed) {
      result.spdp += 25;
    } else if (sets[i] == Gear.Set.Hit) {
      result.eff += 20;
    } else if (sets[i] == Gear.Set.Resist) {
      result.res += 20;
    }
  }
  return result;
}
