import { Gear as GearNs } from '../gear';
import { PersistentData } from '../persistence';
export namespace V_0_1_0 {
  export type VuexData = PersistentData & {
    gears: Array<Gear>;
  };

  type StatInput = GearNs.StatInput;
  type GearScore = GearNs.GearScore;
  type GearAbility = GearNs.GearAbility;

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

  export class Gear implements GearAbility, GearScore {
    static NONE: Gear = new Gear(undefined, Type.Armor, Set.Speed, Grade.EPIC, 85, 15, Stat.HP);

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
    equiped: boolean = false;

    public constructor(
      public readonly id: string = Math.random()
        .toString(20)
        .substr(2, 10),
      public type: Type,
      public set: Set,
      public grade: Grade,
      public level: number,
      public enhance: number,
      public main: Stat
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
      let result = new Gear(undefined, gear.type, gear.set, gear.grade, gear.level, gear.enhance, gear.main);
      Object.assign(result, gear);
      return result;
    }
  }
}
