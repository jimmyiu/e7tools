import { BasePersistentData } from '.';
import { Gear as GearNs, Range } from '../';

export namespace V_0_2_1 {
  type GearScore = GearNs.GearScore;
  type GearAbility = GearNs.GearAbility;

  export type StatInput = {
    stat?: Stat;
    value: number;
  };

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

  export enum Type {
    Weapon = 'Weapon',
    Helmet = 'Helmet',
    Armor = 'Armor',
    Necklace = 'Necklace',
    Ring = 'Ring',
    Boot = 'Boot'
  }

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
  };

  export type OptimizationCombinationCriteria = {
    forcedSets: Set[];
  };

  export type OptimizationStatCriteria = {
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
  };

  /**
   * Full configuration of an optimization process
   */
  export type OptimizationProfile = {
    id: string;
    hero: Hero;
    filter: GearFilter;
    stat: OptimizationStatCriteria;
    combination: OptimizationCombinationCriteria;
    // criteria: OptimizerCriteria;
  };

  export type PersistentData = BasePersistentData & {
    gears: Array<Gear>;
    profiles: Array<OptimizationProfile>;
  };

  export type E7dbData = {
    date: number;
    heros: Array<Hero>;
  };

  export type HeroAbility = {
    hp: number;
    def: number;
    atk: number;
    cri: number;
    cdmg: number;
    spd: number;
    eff: number;
    res: number;
  };

  export type Hero = HeroAbility & {
    id: string;
    name: string;
    icon: string;
  };
}
