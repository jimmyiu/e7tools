import { Vue } from 'vue-property-decorator';
import { Gear } from '@/models/gear';
import GearService from './gear-service';

interface Stat {
  Name: number;
  Value: number;
}
interface ImportGear {
  ID: string;
  Type: number;
  Set: number;
  Grade: number;
  Ilvl: number;
  Enhance: number;
  Main: Stat;
  SubStats: Stat[];
  Locked: boolean;
}
const TYPE_MAPPING: ReadonlyMap<number, Gear.Type> = new Map([
  [0, Gear.Type.Weapon],
  [1, Gear.Type.Helmet],
  [2, Gear.Type.Armor],
  [3, Gear.Type.Necklace],
  [4, Gear.Type.Ring],
  [5, Gear.Type.Boot]
]);
const SET_MAPPING: ReadonlyMap<number, Gear.Set> = new Map([
  [0, Gear.Set.Speed],
  [1, Gear.Set.Hit],
  [2, Gear.Set.Critical],
  [3, Gear.Set.Defense],
  [4, Gear.Set.Health],
  [5, Gear.Set.Attack],
  [6, Gear.Set.Counter],
  [7, Gear.Set.LifeSteal],
  [8, Gear.Set.Destruction],
  [9, Gear.Set.Resist],
  [10, Gear.Set.Rage],
  [11, Gear.Set.Immunity],
  [12, Gear.Set.Unity]
]);
const GRADE_MAPPING: ReadonlyMap<number, Gear.Grade> = new Map([
  [0, Gear.Grade.EPIC],
  [1, Gear.Grade.HERO],
  [2, Gear.Grade.RARE],
  [3, Gear.Grade.GOOD],
  [4, Gear.Grade.NORMAL]
]);
const STAT_MAPPING: ReadonlyMap<number, Gear.Stat> = new Map([
  [0, Gear.Stat.ATKP],
  [1, Gear.Stat.ATK],
  [2, Gear.Stat.SPD],
  [3, Gear.Stat.CRI],
  [4, Gear.Stat.CDMG],
  [5, Gear.Stat.HPP],
  [6, Gear.Stat.HP],
  [7, Gear.Stat.DEFP],
  [8, Gear.Stat.DEF],
  [9, Gear.Stat.EFF],
  [10, Gear.Stat.RES]
]);
class ImportService {
  convert(item: any): Gear.Gear {
    let gear: ImportGear = item;
    let result = new Gear.Gear(`i-${gear.ID}`);
    result.type = TYPE_MAPPING.get(gear.Type);
    result.set = SET_MAPPING.get(gear.Set);
    result.grade = GRADE_MAPPING.get(gear.Grade);
    result.level = gear.Ilvl;
    result.enhance = gear.Enhance;
    result.main = STAT_MAPPING.get(gear.Main.Name);
    [gear.Main, ...gear.SubStats].forEach(it => {
      let stat = STAT_MAPPING.get(it.Name);
      if (stat != undefined) {
        Vue.set(result, stat.value, this.covertStatValue(stat, it.Value));
      }
    });
    result.score = GearService.calculateScore(result);
    return result;
  }

  covertStatValue(stat: Gear.Stat, value: number): number {
    if (
      stat == Gear.Stat.ATKP ||
      stat == Gear.Stat.HPP ||
      stat == Gear.Stat.DEFP ||
      stat == Gear.Stat.CRI ||
      stat == Gear.Stat.CDMG ||
      stat == Gear.Stat.EFF ||
      stat == Gear.Stat.RES
    ) {
      return Math.trunc(value * 100);
    }
    return value;
  }
}
export default new ImportService();
