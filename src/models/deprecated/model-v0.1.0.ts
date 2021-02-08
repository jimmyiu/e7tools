import { Gear as GearNs } from '../gear';
import { PersistentData } from '../persistence';
export namespace V_0_1_0 {
  export type VuexData = PersistentData & {
    gears: Array<Gear>;
  };

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

    type?: GearNs.Type;
    set?: GearNs.Set;
    grade?: GearNs.Grade;
    level?: number;
    enhance?: number;
    main?: GearNs.Stat;
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

    getStatMap(): Map<GearNs.Stat, number | undefined> {
      return new Map([
        [GearNs.Stat.HPP, this.hpp],
        [GearNs.Stat.HP, this.hp],
        [GearNs.Stat.DEFP, this.defp],
        [GearNs.Stat.DEF, this.def],
        [GearNs.Stat.ATKP, this.atkp],
        [GearNs.Stat.ATK, this.atk],
        [GearNs.Stat.CRI, this.cri],
        [GearNs.Stat.CDMG, this.cdmg],
        [GearNs.Stat.SPD, this.spd],
        [GearNs.Stat.EFF, this.eff],
        [GearNs.Stat.RES, this.res]
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

    getSubs(): Map<GearNs.Stat, number> {
      let result = new Map<GearNs.Stat, number>();
      this.getStatMap().forEach((value, key) => {
        if (key.value != this.main?.label && value != undefined) {
          result.set(key, value);
        }
      });
      return result;
    }

    getStatInputs(): GearNs.StatInput[] {
      const result = Array<GearNs.StatInput>();
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
}
