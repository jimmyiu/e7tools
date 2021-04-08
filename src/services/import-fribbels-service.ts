import { Vue } from 'vue-property-decorator';
import { Gear } from '@/models/gear';
import { gearService } from '.';

interface Stat {
  type: string;
  value: number;
  rolls: number;
}
interface ImportGear {
  ingameId: string;
  type: string;
  set: string;
  rank: string;
  level: number;
  enhance: number;
  main: Stat;
  substats: Stat[];
}
const TYPE_MAPPING: ReadonlyMap<string, Gear.Type> = new Map([
  ['weapon', Gear.Type.Weapon],
  ['helm', Gear.Type.Helmet],
  ['armor', Gear.Type.Armor],
  ['neck', Gear.Type.Necklace],
  ['ring', Gear.Type.Ring],
  ['boot', Gear.Type.Boot]
]);
const SET_MAPPING: ReadonlyMap<string, Gear.Set> = new Map([
  ['SpeedSet', Gear.Set.Speed],
  ['HitSet', Gear.Set.Hit],
  ['CriticalSet', Gear.Set.Critical],
  ['DefenseSet', Gear.Set.Defense],
  ['HealthSet', Gear.Set.Health],
  ['AttackSet', Gear.Set.Attack],
  ['CounterSet', Gear.Set.Counter],
  ['LifestealSet', Gear.Set.LifeSteal],
  ['DestructionSet', Gear.Set.Destruction],
  ['ResistSet', Gear.Set.Resist],
  ['RageSet', Gear.Set.Rage],
  ['ImmunitySet', Gear.Set.Immunity],
  ['UnitySet', Gear.Set.Unity],
  ['RevengeSet', Gear.Set.Revenge],
  ['InjurySet', Gear.Set.Injury],
  ['PenetrationSet', Gear.Set.Penetration]
]);
const GRADE_MAPPING: ReadonlyMap<string, Gear.Grade> = new Map([
  ['Epic', Gear.Grade.EPIC],
  ['Heroic', Gear.Grade.HERO],
  ['Rare', Gear.Grade.RARE],
  ['3', Gear.Grade.GOOD],
  ['4', Gear.Grade.NORMAL]
]);
const STAT_MAPPING: ReadonlyMap<string, Gear.Stat> = new Map([
  ['AttackPercent', Gear.Stat.ATKP],
  ['Attack', Gear.Stat.ATK],
  ['Speed', Gear.Stat.SPD],
  ['CriticalHitChancePercent', Gear.Stat.CRI],
  ['CriticalHitDamagePercent', Gear.Stat.CDMG],
  ['HealthPercent', Gear.Stat.HPP],
  ['Health', Gear.Stat.HP],
  ['DefensePercent', Gear.Stat.DEFP],
  ['Defense', Gear.Stat.DEF],
  ['EffectivenessPercent', Gear.Stat.EFF],
  ['EffectResistancePercent', Gear.Stat.RES]
]);

export function convert(item: any): Gear.Gear {
  let gear: ImportGear = item;
  let result = new Gear.Gear(
    `${gear.ingameId}`,
    TYPE_MAPPING.get(gear.type)!,
    SET_MAPPING.get(gear.set)!,
    GRADE_MAPPING.get(gear.rank)!.name,
    gear.level,
    gear.enhance,
    STAT_MAPPING.get(gear.main.type)?.value!
  );
  [gear.main, ...gear.substats].forEach(it => {
    let stat = STAT_MAPPING.get(it.type);
    if (stat != undefined) {
      Vue.set(result, stat.value, it.value);
    }
  });
  gearService.assignScore(result);
  return result;
}

// function covertStatValue(stat: Gear.Stat, value: number): number {
//   if (
//     stat == Gear.Stat.ATKP ||
//     stat == Gear.Stat.HPP ||
//     stat == Gear.Stat.DEFP ||
//     stat == Gear.Stat.CRI ||
//     stat == Gear.Stat.CDMG ||
//     stat == Gear.Stat.EFF ||
//     stat == Gear.Stat.RES
//   ) {
//     return Math.round(value * 100);
//   }
//   return value;
// }
