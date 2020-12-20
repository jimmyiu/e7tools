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
    [Gear.Set.Speed, Gear.Set.Critical, Gear.Set.Hit],
    [Gear.Set.Destruction, Gear.Set.Counter, Gear.Set.LifeSteal, Gear.Set.Resist],
    [Gear.Set.Attack, Gear.Set.Health, Gear.Set.Defense],
    [Gear.Set.Immunity, Gear.Set.Unity, Gear.Set.Rage],
    [Gear.Set.Revenge, Gear.Set.Injury, Gear.Set.Penetration]
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

    private constructor(public readonly value: string, public readonly label: string) {}
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

    // private to disallow creating other instances of this type
    private constructor(public readonly name: string, public readonly color: string) {}

    // static values() {
    //   return [Grade.EPIC, Grade.HERO, Grade.RARE];
    // }
  }

  export interface Gear {
    id?: string;
    type?: Type;
    set?: Set;
    grade?: Grade;
    level?: Number;
    enhance?: Number;
    main?: Stat;
    hpp?: Number;
    hp?: Number;
    defp?: Number;
    def?: Number;
    atkp?: Number;
    atk?: Number;
    cri?: Number;
    cdmg?: Number;
    spd?: Number;
    eff?: Number;
    res?: Number;
  }

  export interface TableFilter {
    types: Type[];
    sets: Set[];
    mode: Number;
  }
}
