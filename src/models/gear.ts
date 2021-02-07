import { Range } from './common';

// TODO: refactor
// function sumAbility(a1?: Gear.GearAbility, a2?: Gear.GearAbility): Gear.GearAbility {
//   const sum = (n1?: number, n2?: number) => {
//     if (n1 == undefined || n2 == undefined) {
//       return n1 ?? n2 ?? undefined;
//     }
//     return n1 + n2;
//   };
//   if (a1 == undefined || a2 == undefined) {
//     return a1 ?? a2 ?? {};
//   }
//   return {
//     hpp: sum(a1.hpp, a2.hpp),
//     hp: sum(a1.hp, a2.hp),
//     defp: sum(a1.defp, a2.defp),
//     def: sum(a1.def, a2.def),
//     atkp: sum(a1.atkp, a2.atkp),
//     atk: sum(a1.atk, a2.atk),
//     cri: sum(a1.cri, a2.cri),
//     cdmg: sum(a1.cdmg, a2.cdmg),
//     spd: sum(a1.spd, a2.spd),
//     eff: sum(a1.eff, a2.eff),
//     res: sum(a1.res, a2.res)
//   };
// }

function applyDeltaAbility(input: Gear.GearAbility, minus?: Gear.GearAbility, plus?: Gear.GearAbility) {
  if (!minus && !plus) {
    return;
  }
  const subtract = (n1?: number, n2?: number) => {
    if (n1 == undefined || n2 == undefined) {
      return n1 ?? (n2 ? -1 * n2 : undefined);
    }
    return n1 - n2;
  };
  const sum = (n1?: number, n2?: number) => {
    if (n1 == undefined || n2 == undefined) {
      return n1 ?? n2 ?? undefined;
    }
    return n1 + n2;
  };
  if (minus) {
    input.hpp = subtract(input.hpp, minus.hpp);
    input.hp = subtract(input.hp, minus.hp);
    input.defp = subtract(input.defp, minus.defp);
    input.def = subtract(input.def, minus.def);
    input.atkp = subtract(input.atkp, minus.atkp);
    input.atk = subtract(input.atk, minus.atk);
    input.cri = subtract(input.cri, minus.cri);
    input.cdmg = subtract(input.cdmg, minus.cdmg);
    input.spd = subtract(input.spd, minus.spd);
    input.eff = subtract(input.eff, minus.eff);
    input.res = subtract(input.res, minus.res);
  }
  if (plus) {
    input.hpp = sum(input.hpp, plus.hpp);
    input.hp = sum(input.hp, plus.hp);
    input.defp = sum(input.defp, plus.defp);
    input.def = sum(input.def, plus.def);
    input.atkp = sum(input.atkp, plus.atkp);
    input.atk = sum(input.atk, plus.atk);
    input.cri = sum(input.cri, plus.cri);
    input.cdmg = sum(input.cdmg, plus.cdmg);
    input.spd = sum(input.spd, plus.spd);
    input.eff = sum(input.eff, plus.eff);
    input.res = sum(input.res, plus.res);
  }
}

export namespace Gear {
  export enum Set {
    Speed = 'Speed',
    Critical = 'Critical',
    Hit = 'Hit',
    //
    Destruction = 'Destruction',
    LifeSteal = 'LifeSteal',
    Counter = 'Counter',
    Resist = 'Resist',
    //
    Health = 'Health',
    Defense = 'Defense',
    Attack = 'Attack',
    //
    Immunity = 'Immunity',
    Unity = 'Unity',
    Rage = 'Rage',
    //
    Revenge = 'Revenge',
    Injury = 'Injury',
    Penetration = 'Penetration'
  }
  export const SETS = [
    [Set.Speed, Set.Critical, Set.Hit],
    [Set.Attack, Set.Health, Set.Defense],
    [Set.Immunity, Set.Unity, Set.Rage],
    [Set.Revenge, Set.Injury, Set.Penetration],
    [Set.Destruction, Set.Counter, Set.LifeSteal, Set.Resist]
  ];
  export class Stat {
    static readonly HPP = new Stat('hpp', 'HP %');
    static readonly HP = new Stat('hp', 'HP');
    static readonly DEFP = new Stat('defp', 'DEF %');
    static readonly DEF = new Stat('def', 'DEF');
    static readonly ATKP = new Stat('atkp', 'ATK %');
    static readonly ATK = new Stat('atk', 'ATK');
    static readonly CRI = new Stat('cri', 'CRI');
    static readonly CDMG = new Stat('cdmg', 'C.DMG');
    static readonly SPD = new Stat('spd', 'SPD');
    static readonly EFF = new Stat('eff', 'EFF');
    static readonly RES = new Stat('res', 'RES');

    private constructor(public readonly value: string, public readonly label: string) { }
  }

  export enum Type {
    Weapon = 'Weapon',
    Helmet = 'Helmet',
    Armor = 'Armor',
    Necklace = 'Necklace',
    Ring = 'Ring',
    Boot = 'Boot'
  }

  export class Grade {
    static readonly EPIC = new Grade('Epic', 'red');
    static readonly HERO = new Grade('Hero', 'purple');
    static readonly RARE = new Grade('Rare', 'blue');
    static readonly GOOD = new Grade('Hero', 'green');
    static readonly NORMAL = new Grade('Rare', 'grey');

    // private to disallow creating other instances of this type
    private constructor(public readonly name: string, public readonly color: string) { }
  }

  export interface GearAbility {
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
  }

  export class Gear implements GearAbility {
    static NONE: Gear = new Gear('');

    type?: Type;
    set?: Set;
    grade?: Grade;
    level?: number;
    enhance?: number;
    main?: Stat;
    // stats
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
    // calculated properties
    score: number = 0;
    offScore: number = 0;
    defScore: number = 0;

    public constructor(
      public readonly id: string = Math.random()
        .toString(20)
        .substr(2, 10) // public readonly main: Stat
    ) { }

    getStatMap(): Map<Stat, number | undefined> {
      return new Map([
        [Stat.HPP, this.hpp],
        [Stat.HP, this.hp],
        [Stat.DEFP, this.defp],
        [Stat.DEF, this.def],
        [Stat.ATKP, this.atkp],
        [Stat.ATK, this.atk],
        [Stat.CRI, this.cri],
        [Stat.CDMG, this.cdmg],
        [Stat.SPD, this.spd],
        [Stat.EFF, this.eff],
        [Stat.RES, this.res]
      ]);
    }

    getScoreMap(): Map<string, number> {
      return new Map([
        ['score', this.score],
        ['offScore', this.offScore],
        ['defScore', this.defScore]
      ]);
    }

    getMain(): number {
      return this.getStatMap().get(this.main!!) || 0;
    }

    getSubs(): Map<Stat, number> {
      let result = new Map<Stat, number>();
      this.getStatMap().forEach((value, key) => {
        if (key.value != this.main?.label && value != undefined) {
          result.set(key, value);
        }
      });
      return result;
    }

    getStatInputs(): StatInput[] {
      const result = Array<StatInput>();
      this.getStatMap().forEach((value, key) => {
        if (key.value == this.main?.value) {
          result.unshift({ stat: key, value: value ?? 0 });
        } else if (value) {
          result.push({ stat: key, value: value });
        }
      });
      return result;
    }

    static clone(gear: Gear): Gear {
      let result = new Gear();
      Object.assign(result, gear);
      return result;
    }
  }

  export enum EnhanceModeFilter {
    ALL = 0,
    LESS_THAN_15 = 1,
    ONLY_15 = 2
  }

  export interface BaseGearFilter {
    sets: Set[];
    enhanceMode: EnhanceModeFilter;
  }

  export interface GearFilter extends BaseGearFilter {
    necklaces: Stat[];
    rings: Stat[];
    boots: Stat[];
  }

  export interface TableFilter extends BaseGearFilter {
    type?: Type;
    level: number;
    mode: number;
    main: boolean;
  }

  export type StatInput = {
    stat?: Stat;
    value: number;
  };

  export interface GearOptimizerCriteria {
    hp: Range;
    def: Range;
    atk: Range;
    cri: Range;
    cdmg: Range;
    spd: Range;
    eff: Range;
    res: Range;
    ehp: Range;
    damage: Range;
  }

  export class GearStore {
    readonly weapons: Gear[] = [];
    readonly helmets: Gear[] = [];
    readonly armors: Gear[] = [];
    readonly necklaces: Gear[] = [];
    readonly rings: Gear[] = [];
    readonly boots: Gear[] = [];

    constructor(gears: Gear[]) {
      gears.forEach(x => {
        switch (x.type) {
          case Type.Weapon:
            this.weapons.push(x);
            break;
          case Type.Helmet:
            this.helmets.push(x);
            break;
          case Type.Armor:
            this.armors.push(x);
            break;
          case Type.Necklace:
            this.necklaces.push(x);
            break;
          case Type.Ring:
            this.rings.push(x);
            break;
          case Type.Boot:
            this.boots.push(x);
            break;
        }
      });
    }

    get distribution() {
      return {
        weapon: this.weapons.length,
        helmet: this.helmets.length,
        armor: this.armors.length,
        necklace: this.necklaces.length,
        ring: this.rings.length,
        boot: this.boots.length
      };
    }

    get numOfCombinations() {
      return (
        this.weapons.length *
        this.helmets.length *
        this.armors.length *
        this.necklaces.length *
        this.rings.length *
        this.boots.length
      );
    }

    getGearsByType(type: Gear.Type) {
      switch (type) {
        case Type.Weapon:
          return this.weapons;
        case Type.Helmet:
          return this.helmets;
        case Type.Armor:
          return this.armors;
        case Type.Necklace:
          return this.necklaces;
        case Type.Ring:
          return this.rings;
        case Type.Boot:
          return this.boots;
      }
      // TODO: throw exception ?
      return [];
    }
  }

  export class GearCombination {
    // weapon?: Gear.Gear;
    // helmet?: Gear.Gear;
    // armor?: Gear.Gear;
    // necklace?: Gear.Gear;
    // ring?: Gear.Gear;
    // boot?: Gear.Gear;
    // weaponId?: string;
    // helmetId?: string;
    // armorId?: string;
    // necklaceId?: string;
    // ringId?: string;
    // bootId?: string;
    // ability: Gear.GearAbility = {};
    constructor(
      readonly weapon?: Gear.Gear,
      readonly helmet?: Gear.Gear,
      readonly armor?: Gear.Gear,
      readonly necklace?: Gear.Gear,
      readonly ring?: Gear.Gear,
      readonly boot?: Gear.Gear,
      readonly ability: Gear.GearAbility = {},
      readonly id: string = Math.random()
        .toString(20)
        .substr(2, 10)
    ) {
      // TODO: cal score
    }
    // constructor(gears: Array<Gear.Gear | undefined>) {
    //   gears.forEach(x => {
    //     if (x) {
    //       switch (x.type) {
    //         case Type.Weapon:
    //           this.weapon = x;
    //           // this.weaponId = x.id;
    //           break;
    //         case Type.Helmet:
    //           this.helmet = x;
    //           // this.helmetId = x.id;
    //           break;
    //         case Type.Armor:
    //           this.armor = x;
    //           // this.armorId = x.id;
    //           break;
    //         case Type.Necklace:
    //           this.necklace = x;
    //           // this.necklaceId = x.id;
    //           break;
    //         case Type.Ring:
    //           this.ring = x;
    //           // this.ringId = x.id;
    //           break;
    //         case Type.Boot:
    //           this.boot = x;
    //           // this.bootId = x.id;
    //           break;
    //       }
    //       this.ability = sumAbility(this.ability, x);
    //     }
    //   });
    // }
  }

  export class GearCombinationBuilder {
    private _weapon?: Gear.Gear;
    private _helmet?: Gear.Gear;
    private _armor?: Gear.Gear;
    private _necklace?: Gear.Gear;
    private _ring?: Gear.Gear;
    private _boot?: Gear.Gear;
    private _ability: Gear.GearAbility = {};
    constructor() { }
    weapon(weapon: Gear.Gear) {
      applyDeltaAbility(this._ability, this._weapon, weapon);
      this._weapon = weapon;
    }
    helmet(helmet: Gear.Gear) {
      applyDeltaAbility(this._ability, this._helmet, helmet);
      this._helmet = helmet;
    }
    armor(armor: Gear.Gear) {
      applyDeltaAbility(this._ability, this._armor, armor);
      this._armor = armor;
    }
    necklace(necklace: Gear.Gear) {
      applyDeltaAbility(this._ability, this._necklace, necklace);
      this._necklace = necklace;
    }
    ring(ring: Gear.Gear) {
      applyDeltaAbility(this._ability, this._ring, ring);
      this._ring = ring;
    }
    boot(boot: Gear.Gear) {
      applyDeltaAbility(this._ability, this._boot, boot);
      this._boot = boot;
    }
    set(type: Gear.Type, gear: Gear.Gear) {
      switch (type) {
        case Type.Weapon:
          this.weapon(gear);
          break;
        case Type.Helmet:
          this.helmet(gear);
          break;
        case Type.Armor:
          this.armor(gear);
          break;
        case Type.Necklace:
          this.necklace(gear);
          break;
        case Type.Ring:
          this.ring(gear);
          break;
        case Type.Boot:
          this.boot(gear);
          break;
      }
    }
    build() {
      return new GearCombination(
        this._weapon,
        this._helmet,
        this._armor,
        this._necklace,
        this._ring,
        this._boot,
        Object.assign({}, this._ability)
      );
    }
  }
}
