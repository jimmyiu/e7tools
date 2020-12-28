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

  export class Gear {
    type?: Type;
    set?: Set;
    grade?: Grade;
    level?: number;
    enhance?: number;
    main?: Stat;
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

    static clone(gear: Gear): Gear {
      let result = new Gear();
      Object.assign(result, gear);
      return result;
    }
  }

  export interface TableFilter {
    type?: Type;
    sets: Set[];
    level: number;
    mode: number;
    main: boolean;
    enhanceMode: number;
  }
}
