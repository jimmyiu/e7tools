import { OptimizationStatCriteria } from '.';
import { Range } from './common';
import { Gear } from './gear';

function getZeroAbility() {
  return {
    hpp: 0,
    hp: 0,
    defp: 0,
    def: 0,
    atkp: 0,
    atk: 0,
    cri: 0,
    cdmg: 0,
    spd: 0,
    eff: 0,
    res: 0
  } as Gear2.GearAbility;
}

export namespace Gear2 {
  export type GearAbility = {
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

  export class GearCombination {
    ability: GearAbility;
    sets: Gear.Set[];

    constructor(
      readonly id: number,
      readonly weapon: Gear.Gear,
      readonly helmet: Gear.Gear,
      readonly armor: Gear.Gear,
      readonly necklace: Gear.Gear,
      readonly ring: Gear.Gear,
      readonly boot: Gear.Gear,
      ability: GearAbility,
      sets: SetCalculator
    ) {
      // this.id = Math.random()
      //   .toString(20)
      //   .substr(2, 10);
      // this.id = '';
      this.ability = Object.assign({}, ability);
      this.sets = sets.determineSets();
      // this.sets = [];
      // this.ability = this.determineActualAbility(ability);
    }
  }

  /**
   * TODO: rename
   */
  class SetCalculator {
    Speed = 0;
    Critical = 0;
    Hit = 0;
    Destruction = 0;
    LifeSteal = 0;
    Counter = 0;
    Resist = 0;
    Health = 0;
    Defense = 0;
    Attack = 0;
    Immunity = 0;
    Unity = 0;
    Rage = 0;
    Revenge = 0;
    Injury = 0;
    Penetration = 0;

    change(to: Gear.Set, from?: Gear.Set) {
      if (from == to) {
        return;
      }
      if (from != undefined) {
        (this as any)[from] -= 1;
        // this.updateValue(from, -1);
      }
      (this as any)[to] += 1;
      // this.updateValue(to, 1);
    }

    isPossible(target: any, emptySlot: number) {
      // console.log('isPossible::target = ', target, ', this = ', this);
      for (let set in target) {
        // console.log(
        //   'isPossible::set =',
        //   set,
        //   ', target[set] = ',
        //   target[set],
        //   ', (this as any)[set] = ',
        //   (this as any)[set]
        // );
        // console.log('isPossible::result = ', target[set] <= (this as any)[set]);
        //
        if (target[set] > (this as any)[set] + emptySlot) {
          return false;
        }
      }
      return true;
    }

    // private updateValue(set: Gear.Set, value: number) {
    // if (set == Gear.Set.Hit) {
    //   this.hit += value;
    // } else if (set == Gear.Set.Destruction) {
    //   this.destruction += value;
    // } else if (set == Gear.Set.LifeSteal) {
    //   this.lifeSteal += value;
    // } else if (set == Gear.Set.Counter) {
    //   this.counter += value;
    // } else if (set == Gear.Set.Resist) {
    //   this.resist += value;
    // } else if (set == Gear.Set.Health) {
    //   this.health += value;
    // } else if (set == Gear.Set.Defense) {
    //   this.defense += value;
    // } else if (set == Gear.Set.Attack) {
    //   this.attack += value;
    // } else if (set == Gear.Set.Immunity) {
    //   this.immunity += value;
    // } else if (set == Gear.Set.Unity) {
    //   this.unity += value;
    // } else if (set == Gear.Set.Rage) {
    //   this.rage += value;
    // } else if (set == Gear.Set.Revenge) {
    //   this.revenge += value;
    // } else if (set == Gear.Set.Injury) {
    //   this.injury += value;
    // } else if (set == Gear.Set.Penetration) {
    //   this.penetration += value;
    // } else if (set == Gear.Set.Speed) {
    //   this.speed += value;
    // } else if (set == Gear.Set.Critical) {
    //   this.critical += value;
    // }
    // }

    determineSets(): Gear.Set[] {
      const result: Gear.Set[] = [];
      for (let key in this) {
        const value = (this as any)[key];
        // console.log('determineSets::key =', key, ', value =', value);
        if (value < 2) {
          continue;
        }
        if (key == Gear.Set.Speed || key == Gear.Set.Attack || key == Gear.Set.Destruction) {
          if (value >= 4) {
            result.push(key as Gear.Set);
          } else {
            continue;
          }
        } else {
          for (let i = 0; i < Math.trunc(value / 2); i++) {
            result.push(key as Gear.Set);
          }
        }
      }
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

  export class GearCombinationBuilder {
    private _weapon = Gear.Gear.NONE;
    private _helmet = Gear.Gear.NONE;
    private _armor = Gear.Gear.NONE;
    private _necklace = Gear.Gear.NONE;
    private _ring = Gear.Gear.NONE;
    private _boot = Gear.Gear.NONE;
    _ability: GearAbility = getZeroAbility();
    _sets = new SetCalculator();

    constructor() { }
    weapon(weapon: Gear.Gear) {
      this.change(this._weapon, weapon);
      this._weapon = weapon;
    }
    helmet(helmet: Gear.Gear) {
      this.change(this._helmet, helmet);
      this._helmet = helmet;
    }
    armor(armor: Gear.Gear) {
      this.change(this._armor, armor);
      this._armor = armor;
    }
    necklace(necklace: Gear.Gear) {
      this.change(this._necklace, necklace);
      this._necklace = necklace;
    }
    ring(ring: Gear.Gear) {
      this.change(this._ring, ring);
      this._ring = ring;
    }
    boot(boot: Gear.Gear) {
      this.change(this._boot, boot);
      this._boot = boot;
    }
    build(id: number) {
      return new GearCombination(
        id,
        this._weapon,
        this._helmet,
        this._armor,
        this._necklace,
        this._ring,
        this._boot,
        this._ability,
        this._sets
      );
    }
    private change(from: Gear.Gear, to: Gear.Gear) {
      this._ability.hpp += (to.hpp ?? 0) - (from.hpp ?? 0);
      this._ability.hp += (to.hp ?? 0) - (from.hp ?? 0);
      this._ability.defp += (to.defp ?? 0) - (from.defp ?? 0);
      this._ability.def += (to.def ?? 0) - (from.def ?? 0);
      this._ability.atkp += (to.atkp ?? 0) - (from.atkp ?? 0);
      this._ability.atk += (to.atk ?? 0) - (from.atk ?? 0);
      this._ability.cri += (to.cri ?? 0) - (from.cri ?? 0);
      this._ability.cdmg += (to.cdmg ?? 0) - (from.cdmg ?? 0);
      this._ability.spd += (to.spd ?? 0) - (from.spd ?? 0);
      this._ability.eff += (to.eff ?? 0) - (from.eff ?? 0);
      this._ability.res += (to.res ?? 0) - (from.res ?? 0);
      this._sets.change(to.set!, from.set);
    }
  }
}
