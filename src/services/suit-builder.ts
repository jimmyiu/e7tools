import { Gear, Suit, SuitAbility } from '@/models';

class SuitSetBuilder implements Record<Gear.Set, number> {
  // static FOUR_PIECES = [Gear.Set.Speed, Gear.Set.Attack, Gear.Set.Destruction];
  static TWO_PIECES = [
    Gear.Set.Critical,
    Gear.Set.Hit,
    Gear.Set.Resist,
    Gear.Set.Health,
    Gear.Set.Defense,
    Gear.Set.Immunity,
    Gear.Set.Unity,
    Gear.Set.Penetration
  ];
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

  change(from: Gear.Set, to: Gear.Set) {
    if (from == to) {
      return;
    }
    this[from] -= 1;
    this[to] += 1;
  }

  assign(set: Gear.Set) {
    this[set] += 1;
  }

  remove(set: Gear.Set) {
    this[set] -= 1;
  }

  assertTargetSets(target: Record<Gear.Set, number>, emptySlot: number) {
    for (let set of Gear.ALL_SETS) {
      if (target[set] > this[set] + emptySlot) {
        return false;
      }
    }
    return true;
  }

  determineSets(): Gear.Set[] {
    const result: Gear.Set[] = [];
    // case 1
    if (this.Speed >= 4) {
      result.push(Gear.Set.Speed);
    } else if (this.Attack >= 4) {
      result.push(Gear.Set.Attack);
    } else if (this.Destruction >= 4) {
      result.push(Gear.Set.Destruction);
    } else if (this.LifeSteal >= 4) {
      result.push(Gear.Set.Destruction);
    } else if (this.Counter >= 4) {
      result.push(Gear.Set.Counter);
    } else if (this.Rage >= 4) {
      result.push(Gear.Set.Rage);
    } else if (this.Revenge >= 4) {
      result.push(Gear.Set.Revenge);
    } else if (this.Injury >= 4) {
      result.push(Gear.Set.Injury);
    }
    // case 2
    const two = [
      this.Critical,
      this.Hit,
      this.Resist,
      this.Health,
      this.Defense,
      this.Immunity,
      this.Unity,
      this.Penetration
    ];
    for (let i = 0; i < two.length; i++) {
      const value = two[i];
      if (value >= 2) {
        for (let j = 0; j < Math.trunc(value / 2); j++) {
          result.push(SuitSetBuilder.TWO_PIECES[i]);
        }
      }
    }
    return result;
  }
}

export class SuitBuilder {
  private _weapon?: Gear.Gear;
  private _helmet?: Gear.Gear;
  private _armor?: Gear.Gear;
  private _necklace?: Gear.Gear;
  private _ring?: Gear.Gear;
  private _boot?: Gear.Gear;
  private _sets: SuitSetBuilder;
  private _ability: SuitAbility = {
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
  };

  constructor() {
    this._sets = new SuitSetBuilder();
  }
  weapon(weapon?: Gear.Gear) {
    this.change(this._weapon, weapon);
    this._weapon = weapon;
  }
  helmet(helmet?: Gear.Gear) {
    this.change(this._helmet, helmet);
    this._helmet = helmet;
  }
  armor(armor?: Gear.Gear) {
    this.change(this._armor, armor);
    this._armor = armor;
  }
  necklace(necklace?: Gear.Gear) {
    this.change(this._necklace, necklace);
    this._necklace = necklace;
  }
  ring(ring?: Gear.Gear) {
    this.change(this._ring, ring);
    this._ring = ring;
  }
  boot(boot?: Gear.Gear) {
    this.change(this._boot, boot);
    this._boot = boot;
  }
  setGear(gear: Gear.Gear) {
    if (gear.type == Gear.Type.Weapon) {
      this.weapon(gear);
    } else if (gear.type == Gear.Type.Helmet) {
      this.helmet(gear);
    } else if (gear.type == Gear.Type.Armor) {
      this.armor(gear);
    } else if (gear.type == Gear.Type.Necklace) {
      this.necklace(gear);
    } else if (gear.type == Gear.Type.Ring) {
      this.ring(gear);
    } else if (gear.type == Gear.Type.Boot) {
      this.boot(gear);
    }
  }
  assertTargetSets(target: Record<Gear.Set, number>, emptySlot: number) {
    return this._sets.assertTargetSets(target, emptySlot);
  }
  build(): Suit {
    return {
      ability: Object.assign({}, this._ability),
      weapon: this._weapon,
      helmet: this._helmet,
      armor: this._armor,
      necklace: this._necklace,
      ring: this._ring,
      boot: this._boot,
      sets: this._sets.determineSets()
    };
  }
  private change(from?: Gear.Gear, to?: Gear.Gear) {
    if (from != undefined && to != undefined) {
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
      this._sets.change(from.set, to.set);
    } else if (from == undefined && to != undefined) {
      this._ability.hpp += to.hpp ?? 0;
      this._ability.hp += to.hp ?? 0;
      this._ability.defp += to.defp ?? 0;
      this._ability.def += to.def ?? 0;
      this._ability.atkp += to.atkp ?? 0;
      this._ability.atk += to.atk ?? 0;
      this._ability.cri += to.cri ?? 0;
      this._ability.cdmg += to.cdmg ?? 0;
      this._ability.spd += to.spd ?? 0;
      this._ability.eff += to.eff ?? 0;
      this._ability.res += to.res ?? 0;
      this._sets.assign(to.set);
    } else if (from != undefined && to == undefined) {
      this._ability.hpp -= from.hpp ?? 0;
      this._ability.hp -= from.hp ?? 0;
      this._ability.defp -= from.defp ?? 0;
      this._ability.def -= from.def ?? 0;
      this._ability.atkp -= from.atkp ?? 0;
      this._ability.atk -= from.atk ?? 0;
      this._ability.cri -= from.cri ?? 0;
      this._ability.cdmg -= from.cdmg ?? 0;
      this._ability.spd -= from.spd ?? 0;
      this._ability.eff -= from.eff ?? 0;
      this._ability.res -= from.res ?? 0;
      this._sets.remove(from.set);
    }
  }
}
