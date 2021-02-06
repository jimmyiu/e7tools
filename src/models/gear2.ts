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
      // readonly id: number,
      readonly weapon: Gear.Gear,
      readonly helmet: Gear.Gear,
      readonly armor: Gear.Gear,
      readonly necklace: Gear.Gear,
      readonly ring: Gear.Gear,
      readonly boot: Gear.Gear,
      ability: GearAbility,
      sets: any
    ) {
      // this.id = Math.random()
      //   .toString(20)
      //   .substr(2, 10);
      // this.id = '';
      this.ability = Object.assign({}, ability);
      this.sets = this.determineSets(sets);
      // this.sets = [];
      // this.ability = this.determineActualAbility(ability);
    }

    private determineSets(sets: any) {
      // const map = new Map<Gear.Set, number>();
      // const sets = [this.weapon.set, this.helmet.set, this.armor.set, this.necklace.set, this.ring.set, this.boot.set];
      // const map: any = {};
      // for (let i = 0; i < sets.length; i++) {
      //   map[sets[i]!] = 1;
      // }
      // console.log('determineSets::sets =', sets);
      const result: Gear.Set[] = [];
      for (let key in sets) {
        if (key == Gear.Set.Speed || key == Gear.Set.Attack || key == Gear.Set.Destruction) {
          if (sets[key] >= 4) {
            result.push(key);
          } else {
            continue;
          }
        } else if (sets[key] >= 2) {
          for (let i = 0; i < Math.trunc(sets[key] / 2); i++) {
            result.push(key as Gear.Set);
          }
        }
      }
      // map.forEach((value: number, key: Gear.Set) => {
      //   switch (key) {
      //     case Gear.Set.Speed:
      //     case Gear.Set.Attack:
      //     case Gear.Set.Destruction:
      //       if (value >= 4) {
      //         result.push(key);
      //       }
      //       break;
      //     case Gear.Set.Health:
      //     case Gear.Set.Hit:
      //     case Gear.Set.Immunity:
      //     case Gear.Set.Resist:
      //     case Gear.Set.Critical:
      //     case Gear.Set.Defense:
      //       for (let i = 0; i < Math.trunc(value / 2); i++) {
      //         result.push(key);
      //       }
      //       break;
      //   }
      // });
      // console.log('determineSets::result =', result);
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
    private _ability: GearAbility = getZeroAbility();
    private _sets: any = {};
    constructor() {
      Object.values(Gear.Set).forEach(x => (this._sets[x] = 0));
    }
    weapon(weapon: Gear.Gear) {
      if (this._weapon.set) {
        this._sets[this._weapon.set]--;
      }
      this.applyDeltaAbility(weapon, this._weapon);
      this._sets[weapon.set!]++;
      this._weapon = weapon;
    }
    helmet(helmet: Gear.Gear) {
      if (this._helmet.set) {
        this._sets[this._helmet.set]--;
      }
      this.applyDeltaAbility(helmet, this._helmet);
      this._sets[helmet.set!]++;
      this._helmet = helmet;
    }
    armor(armor: Gear.Gear) {
      if (this._armor.set) {
        this._sets[this._armor.set]--;
      }
      this.applyDeltaAbility(armor, this._armor);
      this._sets[armor.set!]++;
      this._armor = armor;
    }
    necklace(necklace: Gear.Gear) {
      if (this._necklace.set) {
        this._sets[this._necklace.set]--;
      }
      this.applyDeltaAbility(necklace, this._necklace);
      this._sets[necklace.set!]++;
      this._necklace = necklace;
    }
    ring(ring: Gear.Gear) {
      if (this._ring.set) {
        this._sets[this._ring.set]--;
      }
      this.applyDeltaAbility(ring, this._ring);
      this._sets[ring.set!]++;
      this._ring = ring;
    }
    boot(boot: Gear.Gear) {
      if (this._boot.set) {
        this._sets[this._boot.set]--;
      }
      this.applyDeltaAbility(boot, this._boot);
      this._sets[boot.set!]++;
      this._boot = boot;
    }
    build() {
      return new GearCombination(
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

    private addAbility(plus: Gear.GearAbility) {
      this._ability.hpp += plus.hpp ?? 0;
      this._ability.hp += plus.hp ?? 0;
      this._ability.defp += plus.defp ?? 0;
      this._ability.def += plus.def ?? 0;
      this._ability.atkp += plus.atkp ?? 0;
      this._ability.atk += plus.atk ?? 0;
      this._ability.cri += plus.cri ?? 0;
      this._ability.cdmg += plus.cdmg ?? 0;
      this._ability.spd += plus.spd ?? 0;
      this._ability.eff += plus.eff ?? 0;
      this._ability.res += plus.res ?? 0;
    }

    private applyDeltaAbility(plus: Gear.GearAbility, minus: Gear.GearAbility) {
      this._ability.hpp += (plus.hpp ?? 0) - (minus.hpp ?? 0);
      this._ability.hp += (plus.hp ?? 0) - (minus.hp ?? 0);
      this._ability.defp += (plus.defp ?? 0) - (minus.defp ?? 0);
      this._ability.def += (plus.def ?? 0) - (minus.def ?? 0);
      this._ability.atkp += (plus.atkp ?? 0) - (minus.atkp ?? 0);
      this._ability.atk += (plus.atk ?? 0) - (minus.atk ?? 0);
      this._ability.cri += (plus.cri ?? 0) - (minus.cri ?? 0);
      this._ability.cdmg += (plus.cdmg ?? 0) - (minus.cdmg ?? 0);
      this._ability.spd += (plus.spd ?? 0) - (minus.spd ?? 0);
      this._ability.eff += (plus.eff ?? 0) - (minus.eff ?? 0);
      this._ability.res += (plus.res ?? 0) - (minus.res ?? 0);
    }
  }
}
