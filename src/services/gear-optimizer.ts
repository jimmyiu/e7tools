// import { Vue } from 'vue-property-decorator';
import { Gear } from '@/models/gear';
// import GearService from './gear-service';

export class GearOptimizer {
  // static COMBINATION_HARD_LIMIT = 10000000;
  static COMBINATION_HARD_LIMIT = 5000000;
  // static COMBINATION_HARD_LIMIT = 2;
  static OPTIMIZE_RESULT_HARD_LIMIT = 500000;

  // static HARD_LIMIT = 1000000;
  // weapons: Gear.Gear[] = [];
  // helmets: Gear.Gear[] = [];
  // armors: Gear.Gear[] = [];
  // necklaces: Gear.Gear[] = [];
  // rings: Gear.Gear[] = [];
  // boots: Gear.Gear[] = [];

  // constructor(store: Gear.GearStore) {
  //   gears
  //     .filter(it => {
  //       let set = filter.sets.length == 0 || filter.sets.indexOf(it.set!) >= 0;
  //       return set;
  //     })
  //     .forEach(x => {
  //       switch (x.type) {
  //         case Gear.Type.Weapon:
  //           this.weapons.push(x);
  //           break;
  //         case Gear.Type.Helmet:
  //           this.helmets.push(x);
  //           break;
  //         case Gear.Type.Armor:
  //           this.armors.push(x);
  //           break;
  //         case Gear.Type.Necklace:
  //           this.necklaces.push(x);
  //           break;
  //         case Gear.Type.Ring:
  //           this.rings.push(x);
  //           break;
  //         case Gear.Type.Boot:
  //           this.boots.push(x);
  //           break;
  //       }
  //     });
  // }

  static optimize(
    store: Gear.GearStore,
    criteria: Gear.GearOptimizerCriteria,
    progressCallback: (x: number) => void
  ): Gear.GearCombination[] {
    let count = 0;
    const result: Gear.GearCombination[] = [];
    // const tmp = Array<Gear.Gear>(6);
    for (let i1 = 0; i1 < store.weapons.length; i1++) {
      // tmp[0] = store.weapons[i1];
      for (let i2 = 0; i2 < store.helmets.length; i2++) {
        // tmp[1] = store.helmets[i2];
        for (let i3 = 0; i3 < store.armors.length; i3++) {
          // tmp[2] = store.armors[i3];
          for (let i4 = 0; i4 < store.necklaces.length; i4++) {
            // tmp[3] = store.necklaces[i4];
            for (let i5 = 0; i5 < store.rings.length; i5++) {
              // tmp[4] = store.rings[i5];
              for (let i6 = 0; i6 < store.boots.length; i6++) {
                // tmp[5] = store.boots[i6];
                // let combination = new Gear.GearCombination(tmp);
                let combination = new Gear.GearCombination([
                  store.weapons[i1],
                  store.helmets[i2],
                  store.armors[i3],
                  store.necklaces[i4],
                  store.rings[i5],
                  store.boots[i6]
                ]);
                if (++count % 1000000 == 0) {
                  console.log('optimize::count =', count, ', result.length =', result.length);
                  // progressCallback(count);
                  if (count >= GearOptimizer.COMBINATION_HARD_LIMIT) {
                    console.log('optimize::hit combination hard limit');
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
                  return result;
                }
              }
            }
          }
        }
      }
    }
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
