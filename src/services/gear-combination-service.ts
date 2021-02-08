import { Gear, Hero } from '@/models';
import { EquipedHero } from '@/models/hero';

class GearCombinationService {
  public apply(combination: Gear.GearCombination, hero: Hero): EquipedHero {
    const extra = this.determineSetsExtraAbility(combination.sets);
    const result: EquipedHero = {
      hp: Math.trunc(hero.hp * (1 + (combination.ability.hpp + extra.hpp) / 100)) + combination.ability.hp,
      def: Math.trunc(hero.def * (1 + (combination.ability.defp + extra.defp) / 100)) + combination.ability.def,
      atk: Math.trunc(hero.atk * (1 + (combination.ability.atkp + extra.atkp) / 100)) + combination.ability.atk,
      cri: hero.cri + combination.ability.cri + extra.cri,
      cdmg: hero.cdmg + combination.ability.cdmg + extra.cdmg,
      spd: Math.trunc(hero.spd * (1 + extra.spdp / 100)) + combination.ability.spd,
      eff: hero.eff + combination.ability.eff + extra.eff,
      res: hero.res + combination.ability.res + extra.res,
      combination: combination,
      damage: 0,
      ehp: 0
    };
    result.damage = Math.trunc((result.atk * Math.min(result.cdmg, 350)) / 1000);
    result.ehp = Math.trunc(result.hp * (1 + result.def / 300));
    return result;
  }

  private determineSetsExtraAbility(sets: Gear.Set[]) {
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
}

export default new GearCombinationService();
