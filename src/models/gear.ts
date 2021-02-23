import { GearAbility, HeroAbility } from './common';

export namespace Gear {
  export enum Type {
    Weapon = 'Weapon',
    Helmet = 'Helmet',
    Armor = 'Armor',
    Necklace = 'Necklace',
    Ring = 'Ring',
    Boot = 'Boot'
  }
  export type TypeFigures = Record<Type, number>;

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
  export type SetFigures = Record<Set, number>;
  export const SETS = [
    [Set.Speed, Set.Critical, Set.Hit],
    [Set.Attack, Set.Health, Set.Defense],
    [Set.Immunity, Set.Unity, Set.Rage],
    [Set.Revenge, Set.Injury, Set.Penetration],
    [Set.Destruction, Set.Counter, Set.LifeSteal, Set.Resist]
  ];
  export const ALL_SETS = Object.values(Set);
  export type SetAbility = {
    hpp: number;
    defp: number;
    atkp: number;
    cri: number;
    cdmg: number;
    spdp: number;
    eff: number;
    res: number;
  };

  export class Stat {
    static readonly HPP = Object.freeze(new Stat('hpp', 'HP %', true));
    static readonly HP = Object.freeze(new Stat('hp', 'HP', false));
    static readonly DEFP = Object.freeze(new Stat('defp', 'DEF %', true));
    static readonly DEF = Object.freeze(new Stat('def', 'DEF', false));
    static readonly ATKP = Object.freeze(new Stat('atkp', 'ATK %', true));
    static readonly ATK = Object.freeze(new Stat('atk', 'ATK', false));
    static readonly CRI = Object.freeze(new Stat('cri', 'CRI', false));
    static readonly CDMG = Object.freeze(new Stat('cdmg', 'CDMG', false));
    static readonly SPD = Object.freeze(new Stat('spd', 'SPD', false));
    static readonly EFF = Object.freeze(new Stat('eff', 'EFF', false));
    static readonly RES = Object.freeze(new Stat('res', 'RES', false));
    static getInstance(value: string) {
      switch (value) {
        case Stat.HPP.value:
          return Stat.HPP;
        case Stat.HP.value:
          return Stat.HP;
        case Stat.DEFP.value:
          return Stat.DEFP;
        case Stat.DEF.value:
          return Stat.DEF;
        case Stat.ATKP.value:
          return Stat.ATKP;
        case Stat.ATK.value:
          return Stat.ATK;
        case Stat.CRI.value:
          return Stat.CRI;
        case Stat.CDMG.value:
          return Stat.CDMG;
        case Stat.SPD.value:
          return Stat.SPD;
        case Stat.EFF.value:
          return Stat.EFF;
        case Stat.RES.value:
          return Stat.RES;
      }
      console.error('getInstance::fail to convert stat=', value);
      throw new Error('fail to convert stat=' + value);
    }

    private constructor(
      public readonly value: string,
      public readonly label: string,
      public readonly percent: boolean
    ) { }
  }

  export class Grade {
    static readonly EPIC = Object.freeze(new Grade('Epic', 'red'));
    static readonly HERO = Object.freeze(new Grade('Hero', 'purple'));
    static readonly RARE = Object.freeze(new Grade('Rare', 'blue'));
    static readonly GOOD = Object.freeze(new Grade('Hero', 'green'));
    static readonly NORMAL = Object.freeze(new Grade('Rare', 'grey'));

    static getInstance(name: string) {
      switch (name) {
        case Grade.EPIC.name:
          return Grade.EPIC;
        case Grade.HERO.name:
          return Grade.HERO;
        case Grade.RARE.name:
          return Grade.RARE;
        case Grade.GOOD.name:
          return Grade.GOOD;
        case Grade.NORMAL.name:
          return Grade.NORMAL;
      }
      console.error('getInstance::fail to convert grade =', name);
      throw new Error('fail to convert grade =' + name);
    }

    // private to disallow creating other instances of this type
    private constructor(public readonly name: string, public readonly color: string) { }
  }

  export type GearScore = {
    score: number;
    offScore: number;
    defScore: number;
  };

  export class Gear implements GearAbility, GearScore {
    static NONE: Gear = new Gear(undefined, Type.Armor, Set.Speed, Grade.EPIC.name, 85, 15, Stat.HP.value);

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
    // v0.2.0
    locked: boolean = false;
    equippedHero: string = '';
    // v0.2.1
    grade: Grade;
    main: Stat;

    public constructor(
      public readonly id: string = Math.random()
        .toString(20)
        .substr(2, 10),
      public type: Type,
      public set: Set,
      grade: string,
      public level: number,
      public enhance: number,
      main: string
    ) {
      this.main = Stat.getInstance(main);
      this.grade = Grade.getInstance(grade);
    }

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
        if (key.value != this.main?.value && value != undefined) {
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
      let result = new Gear(undefined, gear.type, gear.set, gear.grade.name, gear.level, gear.enhance, gear.main.value);
      Object.assign(result, gear);
      return result;
    }
  }

  export enum EnhanceModeFilter {
    ALL = 0,
    LESS_THAN_15 = 1,
    ONLY_15 = 2
  }

  export type BaseGearFilter = {
    sets: Set[];
    enhanceMode: EnhanceModeFilter;
  };

  export type GearFilter = BaseGearFilter & {
    necklaces: Stat[];
    rings: Stat[];
    boots: Stat[];
    locked: boolean;
    equipped: boolean;
    score: number;
    rating: {
      point: HeroAbility;
      threshold: number;
      minSize: number;
    };
  };

  export type TableFilter = BaseGearFilter & {
    type?: Type;
    level: number;
    mode: number;
    main: boolean;
    equipped: boolean;
  };

  export type StatInput = {
    stat?: Stat;
    value: number;
  };

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

  // v.0.1.0
  export type GearCombinationAbility = {
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
    ability: GearCombinationAbility;
    sets: Set[];

    constructor(
      readonly id: number,
      readonly weapon: Gear,
      readonly helmet: Gear,
      readonly armor: Gear,
      readonly necklace: Gear,
      readonly ring: Gear,
      readonly boot: Gear,
      ability: GearCombinationAbility,
      sets: SetCalculator
    ) {
      this.ability = Object.assign({}, ability);
      this.sets = []; //sets.determineSets();
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

    constructor(defaultGears: Gear.Gear[]) {
      for (let i = 0; i < defaultGears.length; i++) {
        (this as any)[defaultGears[i].set] += 1;
      }
    }

    change(to: Set, from: Set) {
      if (from == to) {
        return;
      }
      (this as any)[from] -= 1;
      (this as any)[to] += 1;
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
        if (target[set] > (this as any)[set] + emptySlot) {
          return false;
        }
      }
      return true;
    }

    // private updateValue(set: Set, value: number) {
    // if (set == Set.Hit) {
    //   this.hit += value;
    // } else if (set == Set.Destruction) {
    //   this.destruction += value;
    // } else if (set == Set.LifeSteal) {
    //   this.lifeSteal += value;
    // } else if (set == Set.Counter) {
    //   this.counter += value;
    // } else if (set == Set.Resist) {
    //   this.resist += value;
    // } else if (set == Set.Health) {
    //   this.health += value;
    // } else if (set == Set.Defense) {
    //   this.defense += value;
    // } else if (set == Set.Attack) {
    //   this.attack += value;
    // } else if (set == Set.Immunity) {
    //   this.immunity += value;
    // } else if (set == Set.Unity) {
    //   this.unity += value;
    // } else if (set == Set.Rage) {
    //   this.rage += value;
    // } else if (set == Set.Revenge) {
    //   this.revenge += value;
    // } else if (set == Set.Injury) {
    //   this.injury += value;
    // } else if (set == Set.Penetration) {
    //   this.penetration += value;
    // } else if (set == Set.Speed) {
    //   this.speed += value;
    // } else if (set == Set.Critical) {
    //   this.critical += value;
    // }
    // }

    determineSets(): Set[] {
      const result: Set[] = [];
      for (let key in this) {
        const value = (this as any)[key];
        // console.log('determineSets::key =', key, ', value =', value);
        if (value < 2) {
          continue;
        }
        if (key == Set.Speed || key == Set.Attack || key == Set.Destruction) {
          if (value >= 4) {
            result.push(key as Set);
          } else {
            continue;
          }
        } else {
          for (let i = 0; i < Math.trunc(value / 2); i++) {
            result.push(key as Set);
          }
        }
      }
      return result;
    }
  }

  export class GearCombinationBuilder {
    private _weapon = Gear.NONE;
    private _helmet = Gear.NONE;
    private _armor = Gear.NONE;
    private _necklace = Gear.NONE;
    private _ring = Gear.NONE;
    private _boot = Gear.NONE;
    _ability: GearCombinationAbility = {
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
    _sets = new SetCalculator([this._weapon, this._helmet, this._armor, this._necklace, this._ring, this._boot]);

    constructor() { }
    weapon(weapon: Gear) {
      this.change(this._weapon, weapon);
      this._weapon = weapon;
    }
    helmet(helmet: Gear) {
      this.change(this._helmet, helmet);
      this._helmet = helmet;
    }
    armor(armor: Gear) {
      this.change(this._armor, armor);
      this._armor = armor;
    }
    necklace(necklace: Gear) {
      this.change(this._necklace, necklace);
      this._necklace = necklace;
    }
    ring(ring: Gear) {
      this.change(this._ring, ring);
      this._ring = ring;
    }
    boot(boot: Gear) {
      this.change(this._boot, boot);
      this._boot = boot;
    }
    setGear(gear: Gear) {
      if (gear.type == Type.Weapon) {
        this.weapon(gear);
      } else if (gear.type == Type.Helmet) {
        this.helmet(gear);
      } else if (gear.type == Type.Armor) {
        this.armor(gear);
      } else if (gear.type == Type.Necklace) {
        this.necklace(gear);
      } else if (gear.type == Type.Ring) {
        this.ring(gear);
      } else if (gear.type == Type.Boot) {
        this.boot(gear);
      }
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
    private change(from: Gear, to: Gear) {
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

  // v0.2.0
  export type GearInputForm = GearAbility & {
    type?: Type;
    set?: Set;
    grade: Grade;
    level: number;
    enhance: number;
    statInputs: Array<Gear.StatInput>;
  };
}
