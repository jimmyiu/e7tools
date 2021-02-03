import { Gear } from '@/models/gear';

// TODO: refactor
export class GearOptimizer {
  static COMBINATION_HARD_LIMIT = 1000000;
  // static COMBINATION_HARD_LIMIT = 5000000;
  // static COMBINATION_HARD_LIMIT = 2;
  static OPTIMIZE_RESULT_HARD_LIMIT = 100000;
  static REPORT_PROGRESS_COUNT = GearOptimizer.COMBINATION_HARD_LIMIT / 10;

  static optimize(
    store: Gear.GearStore,
    criteria: Gear.GearOptimizerCriteria,
    progressCallback: (x: number) => void = (x: number) => { }
  ): Gear.GearCombination[] {
    let count = 0;
    let time = Date.now();
    const result: Gear.GearCombination[] = [];
    const builder = new Gear.GearCombinationBuilder();
    for (let i1 = 0; i1 < store.weapons.length; i1++) {
      builder.weapon(store.weapons[i1]);
      for (let i2 = 0; i2 < store.helmets.length; i2++) {
        builder.helmet(store.helmets[i2]);
        for (let i3 = 0; i3 < store.armors.length; i3++) {
          builder.armor(store.armors[i3]);
          for (let i4 = 0; i4 < store.necklaces.length; i4++) {
            builder.necklace(store.necklaces[i4]);
            for (let i5 = 0; i5 < store.rings.length; i5++) {
              builder.ring(store.rings[i5]);
              for (let i6 = 0; i6 < store.boots.length; i6++) {
                builder.boot(store.boots[i6]);
                // let combination = new Gear.GearCombination(tmp);
                // let combination = new Gear.GearCombination([
                //   store.weapons[i1],
                //   store.helmets[i2],
                //   store.armors[i3],
                //   store.necklaces[i4],
                //   store.rings[i5],
                //   store.boots[i6]
                // ]);
                let combination = builder.build();
                if (++count % GearOptimizer.REPORT_PROGRESS_COUNT == 0) {
                  console.log('optimize::count =', count, ', result.length =', result.length);
                  progressCallback(count);
                  if (count >= GearOptimizer.COMBINATION_HARD_LIMIT) {
                    console.log('optimize::hit combination hard limit');
                    console.log('processing time =', (Date.now() - time) / 1000, 'seconds');
                    return result;
                  }
                }
                if (
                  GearOptimizer.assert(combination.ability.spd, criteria.spd) &&
                  GearOptimizer.assert(combination.ability.cri, criteria.cri) &&
                  GearOptimizer.assert(combination.ability.cdmg, criteria.cdmg)
                ) {
                  result.push(combination);
                }
                if (result.length >= GearOptimizer.OPTIMIZE_RESULT_HARD_LIMIT) {
                  console.log('optimize::hit combination hard limit, result.length =', result.length);
                  console.log('processing time =', (Date.now() - time) / 1000, 'seconds');
                  return result;
                }
              }
            }
          }
        }
      }
    }
    console.log('processing time =', (Date.now() - time) / 1000, 'seconds');
    return result;
  }

  static assert(ability: number | undefined, range: Gear.Range) {
    if (!range.min && !range.max) {
      // no assertion required
      return true;
    } else if (ability == undefined) {
      // assertion required, but ability value absent
      return false;
    }
    // const min = range.min ? ability >= range.min : true;
    // const max = range.max ? ability <= range.max : true;
    return (range.min ? ability >= range.min : true) && (range.max ? ability <= range.max : true);
  }
}

// class OptimizeService {
// convert(item: any): Gear.Gear {
//   let gear: ImportGear = item;
//   let result = new Gear.Gear(`i-${gear.ID}`);
//   result.type = TYPE_MAPPING.get(gear.Type);
//   result.set = SET_MAPPING.get(gear.Set);
//   result.grade = GRADE_MAPPING.get(gear.Grade);
//   result.level = gear.Ilvl;
//   result.enhance = gear.Enhance;
//   result.main = STAT_MAPPING.get(gear.Main.Name);
//   [gear.Main, ...gear.SubStats].forEach(it => {
//     let stat = STAT_MAPPING.get(it.Name);
//     if (stat != undefined) {
//       Vue.set(result, stat.value, this.covertStatValue(stat, it.Value));
//     }
//   });
//   result.score = GearService.calculateScore(result);
//   result.defScore = GearService.calculateDefScore(result);
//   result.offScore = GearService.calculateOffScore(result);
//   return result;
// }
// covertStatValue(stat: Gear.Stat, value: number): number {
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
// }
// export default new OptimizeService();