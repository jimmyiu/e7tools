// TODO: refactor
function sumAbility(a1?: Gear.GearAbility, a2?: Gear.GearAbility): Gear.GearAbility {
  const sum = (n1?: number, n2?: number) => {
    if (n1 == undefined || n2 == undefined) {
      return n1 ?? n2 ?? undefined;
    }
    return n1 + n2;
  };
  if (a1 == undefined || a2 == undefined) {
    return a1 ?? a2 ?? {};
  }
  return {
    hpp: sum(a1.hpp, a2.hpp),
    hp: sum(a1.hp, a2.hp),
    defp: sum(a1.defp, a2.defp),
    def: sum(a1.def, a2.def),
    atkp: sum(a1.atkp, a2.atkp),
    atk: sum(a1.atk, a2.atk),
    cri: sum(a1.cri, a2.cri),
    cdmg: sum(a1.cdmg, a2.cdmg),
    spd: sum(a1.spd, a2.spd),
    eff: sum(a1.eff, a2.eff),
    res: sum(a1.res, a2.res)
  };
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

  export interface GearFilter {
    sets: Set[];
    enhanceMode: EnhanceModeFilter;
  }

  export interface TableFilter extends GearFilter {
    type?: Type;
    level: number;
    mode: number;
    main: boolean;
  }

  export type StatInput = {
    stat?: Stat;
    value: number;
  };

  export interface Range {
    min?: number;
    max?: number;
  }

  export interface GearOptimizerCriteria {
    cri: Range;
    cdmg: Range;
    spd: Range;
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
  }

  export class GearCombination {
    weapon?: Gear.Gear;
    helmet?: Gear.Gear;
    armor?: Gear.Gear;
    necklace?: Gear.Gear;
    ring?: Gear.Gear;
    boot?: Gear.Gear;
    // weaponId?: string;
    // helmetId?: string;
    // armorId?: string;
    // necklaceId?: string;
    // ringId?: string;
    // bootId?: string;
    ability: Gear.GearAbility = {};
    constructor(gears: Array<Gear.Gear | undefined>) {
      gears.forEach(x => {
        if (x) {
          switch (x.type) {
            case Type.Weapon:
              this.weapon = x;
              // this.weaponId = x.id;
              break;
            case Type.Helmet:
              this.helmet = x;
              // this.helmetId = x.id;
              break;
            case Type.Armor:
              this.armor = x;
              // this.armorId = x.id;
              break;
            case Type.Necklace:
              this.necklace = x;
              // this.necklaceId = x.id;
              break;
            case Type.Ring:
              this.ring = x;
              // this.ringId = x.id;
              break;
            case Type.Boot:
              this.boot = x;
              // this.bootId = x.id;
              break;
          }
          this.ability = sumAbility(this.ability, x);
        }
      });
    }
  }
}
