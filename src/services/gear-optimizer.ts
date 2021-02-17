import { Gear, HeroAbility, EquipedHero, OptimizationProfile, Hero } from '@/models';
import { OptimizationResult } from '@/models/optimizer';
import { heroService, SuitBuilder } from '.';
import GearCombinationService from '@/services/gear-combination-service';

export interface IGearOptimizer {
  store: Gear.GearStore;
  profile: OptimizationProfile;
  hero: Hero;
  progressCallback: (x: number) => void;

  optimize: () => OptimizationResult[];
}

export class DefaultGearOptimizer implements IGearOptimizer {
  static OPTIMIZE_RESULT_LIMIT = 20000;
  reportProgressCount: number;

  constructor(
    public readonly store: Gear.GearStore,
    public readonly profile: OptimizationProfile,
    public readonly hero: Hero,
    public readonly progressCallback: (x: number) => void
  ) {
    this.reportProgressCount = Math.ceil(this.profile.combination.limit / 10);
  }

  optimize(): OptimizationResult[] {
    console.log('optimize::start');
    console.log('optimize::profile =', this.profile);
    let start = Date.now();
    this.progressCallback(1);
    const result: EquipedHero[] = this.performOptimize();
    this.progressCallback(0);
    console.log('optimize::processing time =', (Date.now() - start) / 1000, 'seconds');
    return this.toResult(result);
  }

  minFilter(stat: string) {
    if ((this.profile.stat as any)[stat]!.min) {
      return (ability: HeroAbility) => (ability as any)[stat] >= (this.profile.stat as any)[stat].min!;
    }
    return (ability: HeroAbility) => true;
  }

  maxFilter(stat: string) {
    if ((this.profile.stat as any)[stat]!.max) {
      return (ability: HeroAbility) => (ability as any)[stat] <= (this.profile.stat as any)[stat].max!;
    }
    return (ability: HeroAbility) => true;
  }

  combinationFilter() {
    if (this.profile.combination.forcedSets.length == 0) {
      return (sets: SuitBuilder, emptySlot: number) => true;
    }
    const target: any = {};
    // TODO: currently assumed input sets is make sense
    for (let i = 0; i < this.profile.combination.forcedSets.length; i++) {
      const set = this.profile.combination.forcedSets[i];
      switch (set) {
        case Gear.Set.Speed:
        case Gear.Set.Attack:
        case Gear.Set.Destruction:
          target[set] = target[set] ?? 4;
          break;
        default:
          target[set] = (target[set] ?? 0) + 2;
          break;
      }
    }
    return (builder: SuitBuilder, emptySlot: number) => {
      return builder.assertTargetSets(target, emptySlot);
    };
  }

  equipedHeroFilter() {
    let hpMin = this.minFilter(Gear.Stat.HP.value);
    let hpMax = this.maxFilter(Gear.Stat.HP.value);
    let defMin = this.minFilter(Gear.Stat.DEF.value);
    let defMax = this.maxFilter(Gear.Stat.DEF.value);
    let atkMin = this.minFilter(Gear.Stat.ATK.value);
    let atkMax = this.maxFilter(Gear.Stat.ATK.value);
    let criMin = this.minFilter(Gear.Stat.CRI.value);
    let criMax = this.maxFilter(Gear.Stat.CRI.value);
    let cdmgMin = this.minFilter(Gear.Stat.CDMG.value);
    let cdmgMax = this.maxFilter(Gear.Stat.CDMG.value);
    let spdMin = this.minFilter(Gear.Stat.SPD.value);
    let spdMax = this.maxFilter(Gear.Stat.SPD.value);
    let effMin = this.minFilter(Gear.Stat.EFF.value);
    let effMax = this.maxFilter(Gear.Stat.EFF.value);
    let resMin = this.minFilter(Gear.Stat.RES.value);
    let resMax = this.maxFilter(Gear.Stat.RES.value);
    let ehpMin = this.minFilter('ehp');
    let damageMin = this.minFilter('damage');

    return (hero: EquipedHero) => {
      return (
        spdMin(hero) &&
        spdMax(hero) &&
        criMin(hero) &&
        criMax(hero) &&
        hpMin(hero) &&
        hpMax(hero) &&
        defMin(hero) &&
        defMax(hero) &&
        atkMin(hero) &&
        atkMax(hero) &&
        cdmgMin(hero) &&
        cdmgMax(hero) &&
        effMin(hero) &&
        effMax(hero) &&
        resMin(hero) &&
        resMax(hero) &&
        ehpMin(hero) &&
        damageMin(hero)
      );
    };
  }

  toResult(heros: EquipedHero[]): OptimizationResult[] {
    const result: OptimizationResult[] = [];
    for (let i = 0; i < heros.length; i++) {
      const hero = heros[i];
      result.push({
        id: i,
        hp: hero.hp,
        def: hero.def,
        atk: hero.atk,
        cri: hero.cri,
        cdmg: hero.cdmg,
        spd: hero.spd,
        eff: hero.eff,
        res: hero.res,
        ehp: hero.ehp,
        damage: hero.damage,
        sets: hero.suit.sets,
        weaponId: hero.suit.weapon ? hero.suit.weapon.id : undefined,
        helmetId: hero.suit.helmet ? hero.suit.helmet.id : undefined,
        armorId: hero.suit.armor ? hero.suit.armor.id : undefined,
        necklaceId: hero.suit.necklace ? hero.suit.necklace.id : undefined,
        ringId: hero.suit.ring ? hero.suit.ring.id : undefined,
        bootId: hero.suit.boot ? hero.suit.boot.id : undefined
      });
    }
    return result;
  }

  performOptimize(): EquipedHero[] {
    let actualCount = 0;
    let count = 0;
    const result: EquipedHero[] = [];
    const builder = new SuitBuilder();
    const equipedHeroFilter = this.equipedHeroFilter();
    const combinationFilter = this.combinationFilter();
    for (let i1 = 0, n1 = this.store.weapons.length; i1 < n1; i1++) {
      builder.weapon(this.store.weapons[i1]);
      for (let i2 = 0, n2 = this.store.helmets.length; i2 < n2; i2++) {
        builder.helmet(this.store.helmets[i2]);
        for (let i3 = 0, n3 = this.store.armors.length; i3 < n3; i3++) {
          builder.armor(this.store.armors[i3]);
          if (!combinationFilter(builder, 3)) {
            actualCount += this.store.necklaces.length * this.store.rings.length * this.store.boots.length;
            continue;
          }
          for (let i4 = 0, n4 = this.store.necklaces.length; i4 < n4; i4++) {
            builder.necklace(this.store.necklaces[i4]);
            if (!combinationFilter(builder, 2)) {
              actualCount += this.store.rings.length * this.store.boots.length;
              continue;
            }
            for (let i5 = 0, n5 = this.store.rings.length; i5 < n5; i5++) {
              builder.ring(this.store.rings[i5]);
              if (!combinationFilter(builder, 1)) {
                actualCount += this.store.boots.length;
                continue;
              }
              for (let i6 = 0, n6 = this.store.boots.length; i6 < n6; i6++) {
                builder.boot(this.store.boots[i6]);
                if (++actualCount && !combinationFilter(builder, 0)) {
                  continue;
                }

                // let combination = builder.build();
                // const equipedHero = GearCombinationService.apply(builder.build(), this.hero);
                const equipedHero = heroService.equip(this.hero, builder.build());
                if (equipedHeroFilter(equipedHero)) {
                  result.push(equipedHero);
                  if (result.length >= DefaultGearOptimizer.OPTIMIZE_RESULT_LIMIT) {
                    console.log(
                      'optimize::hit result limit, actualCount =',
                      actualCount,
                      ', result.length =',
                      result.length
                    );
                    return result;
                  }
                }

                if (++count % this.reportProgressCount == 0) {
                  console.log(
                    'optimize::actualCount =',
                    actualCount,
                    ',count =',
                    count,
                    ',result.length =',
                    result.length
                  );
                  // this.progressCallback(Math.trunc((100 * count) / DefaultGearOptimizer.COMBINATION_HARD_LIMIT));
                  this.progressCallback(count);

                  // hard limit check
                  if (count >= this.profile.combination.limit) {
                    console.log('optimize::hit calculation hard limit');
                    return result;
                  }
                }
              }
              builder.boot(undefined);
            }
            builder.ring(undefined);
          }
          builder.necklace(undefined);
        }
        builder.armor(undefined);
      }
      builder.helmet(undefined);
    }
    return result;
  }
}

// export class FastGearOptimizer implements IGearOptimizer {
//   static COMBINATION_HARD_LIMIT = 20000000;
//   // static COMBINATION_HARD_LIMIT = 10;
//   static OPTIMIZE_RESULT_LIMIT = 10000;
//   static REPORT_PROGRESS_COUNT = FastGearOptimizer.COMBINATION_HARD_LIMIT / 10;

//   constructor(
//     public readonly store: Gear.GearStore,
//     public readonly profile: OptimizationProfile,
//     public readonly hero: Hero,
//     public readonly progressCallback: (x: number) => void
//   ) { }

//   optimize(): OptimizationResult[] {
//     console.log('optimize::start');
//     console.log('optimize::profile =', this.profile);
//     let start = Date.now();
//     this.progressCallback(1);
//     const result: EquipedHero[] = this.performOptimize();
//     this.progressCallback(0);
//     console.log('optimize::processing time =', (Date.now() - start) / 1000, 'seconds');
//     return this.toResult(result);
//   }

//   minFilter(stat: string) {
//     if ((this.profile.stat as any)[stat]!.min) {
//       return (ability: HeroAbility) => (ability as any)[stat] >= (this.profile.stat as any)[stat].min!;
//     }
//     return (ability: HeroAbility) => true;
//   }

//   maxFilter(stat: string) {
//     if ((this.profile.stat as any)[stat]!.max) {
//       return (ability: HeroAbility) => (ability as any)[stat] <= (this.profile.stat as any)[stat].max!;
//     }
//     return (ability: HeroAbility) => true;
//   }

//   combinationFilter() {
//     if (this.profile.combination.forcedSets.length == 0) {
//       return (sets: Gear.GearCombinationBuilder, emptySlot: number) => true;
//     }
//     const target: any = {};
//     // TODO: currently assumed input sets is make sense
//     for (let i = 0; i < this.profile.combination.forcedSets.length; i++) {
//       const set = this.profile.combination.forcedSets[i];
//       switch (set) {
//         case Gear.Set.Speed:
//         case Gear.Set.Attack:
//         case Gear.Set.Destruction:
//           target[set] = target[set] ?? 4;
//           break;
//         default:
//           target[set] = (target[set] ?? 0) + 2;
//           break;
//       }
//     }
//     return (builder: Gear.GearCombinationBuilder, emptySlot: number) => {
//       return builder._sets.isPossible(target, emptySlot);
//     };
//   }

//   equipedHeroFilter() {
//     let hpMin = this.minFilter(Gear.Stat.HP.value);
//     let hpMax = this.maxFilter(Gear.Stat.HP.value);
//     let defMin = this.minFilter(Gear.Stat.DEF.value);
//     let defMax = this.maxFilter(Gear.Stat.DEF.value);
//     let atkMin = this.minFilter(Gear.Stat.ATK.value);
//     let atkMax = this.maxFilter(Gear.Stat.ATK.value);
//     let criMin = this.minFilter(Gear.Stat.CRI.value);
//     let criMax = this.maxFilter(Gear.Stat.CRI.value);
//     let cdmgMin = this.minFilter(Gear.Stat.CDMG.value);
//     let cdmgMax = this.maxFilter(Gear.Stat.CDMG.value);
//     let spdMin = this.minFilter(Gear.Stat.SPD.value);
//     let spdMax = this.maxFilter(Gear.Stat.SPD.value);
//     let effMin = this.minFilter(Gear.Stat.EFF.value);
//     let effMax = this.maxFilter(Gear.Stat.EFF.value);
//     let resMin = this.minFilter(Gear.Stat.RES.value);
//     let resMax = this.maxFilter(Gear.Stat.RES.value);
//     let ehpMin = this.minFilter('ehp');
//     let damageMin = this.minFilter('damage');

//     return (hero: EquipedHero) => {
//       return (
//         spdMin(hero) &&
//         spdMax(hero) &&
//         criMin(hero) &&
//         criMax(hero) &&
//         hpMin(hero) &&
//         hpMax(hero) &&
//         defMin(hero) &&
//         defMax(hero) &&
//         atkMin(hero) &&
//         atkMax(hero) &&
//         cdmgMin(hero) &&
//         cdmgMax(hero) &&
//         effMin(hero) &&
//         effMax(hero) &&
//         resMin(hero) &&
//         resMax(hero) &&
//         ehpMin(hero) &&
//         damageMin(hero)
//       );
//     };
//   }

//   toResult(heros: EquipedHero[]): OptimizationResult[] {
//     const result: OptimizationResult[] = [];
//     for (let i = 0; i < heros.length; i++) {
//       const hero = heros[i];
//       result.push({
//         id: i,
//         hp: hero.hp,
//         def: hero.def,
//         atk: hero.atk,
//         cri: hero.cri,
//         cdmg: hero.cdmg,
//         spd: hero.spd,
//         eff: hero.eff,
//         res: hero.res,
//         ehp: hero.ehp,
//         damage: hero.damage,
//         sets: hero.combination.sets,
//         weaponId: hero.combination.weapon.id,
//         helmetId: hero.combination.helmet.id,
//         armorId: hero.combination.armor.id,
//         necklaceId: hero.combination.necklace.id,
//         ringId: hero.combination.ring.id,
//         bootId: hero.combination.boot.id
//       });
//     }
//     return result;
//   }

//   performOptimize(): EquipedHero[] {
//     let actualCount = 0;
//     let count = 0;
//     const result: EquipedHero[] = [];
//     const builder = new Gear.GearCombinationBuilder();
//     const equipedHeroFilter = this.equipedHeroFilter();
//     const combinationFilter = this.combinationFilter();
//     for (let i1 = 0, n1 = this.store.weapons.length; i1 < n1; i1++) {
//       builder.weapon(this.store.weapons[i1]);
//       for (let i2 = 0, n2 = this.store.helmets.length; i2 < n2; i2++) {
//         builder.helmet(this.store.helmets[i2]);
//         for (let i3 = 0, n3 = this.store.armors.length; i3 < n3; i3++) {
//           builder.armor(this.store.armors[i3]);
//           if (!combinationFilter(builder, 3)) {
//             actualCount += this.store.necklaces.length * this.store.rings.length * this.store.boots.length;
//             continue;
//           }
//           for (let i4 = 0, n4 = this.store.necklaces.length; i4 < n4; i4++) {
//             builder.necklace(this.store.necklaces[i4]);
//             if (!combinationFilter(builder, 2)) {
//               actualCount += this.store.rings.length * this.store.boots.length;
//               continue;
//             }
//             for (let i5 = 0, n5 = this.store.rings.length; i5 < n5; i5++) {
//               builder.ring(this.store.rings[i5]);
//               if (!combinationFilter(builder, 1)) {
//                 actualCount += this.store.boots.length;
//                 continue;
//               }
//               for (let i6 = 0, n6 = this.store.boots.length; i6 < n6; i6++) {
//                 builder.boot(this.store.boots[i6]);
//                 if (++actualCount && !combinationFilter(builder, 0)) {
//                   continue;
//                 }

//                 // let combination = builder.build();
//                 const equipedHero = GearCombinationService.apply(builder.build(count), this.hero);
//                 if (equipedHeroFilter(equipedHero)) {
//                   result.push(equipedHero);
//                   if (result.length >= FastGearOptimizer.OPTIMIZE_RESULT_LIMIT) {
//                     console.log(
//                       'optimize::hit result limit, actualCount =',
//                       actualCount,
//                       ', result.length =',
//                       result.length
//                     );
//                     return result;
//                   }
//                 }

//                 if (++count % FastGearOptimizer.REPORT_PROGRESS_COUNT == 0) {
//                   console.log(
//                     'optimize::actualCount =',
//                     actualCount,
//                     ',count =',
//                     count,
//                     ',result.length =',
//                     result.length
//                   );
//                   // this.progressCallback(Math.trunc((100 * count) / DefaultGearOptimizer.COMBINATION_HARD_LIMIT));
//                   this.progressCallback(count);

//                   // hard limit check
//                   if (count >= FastGearOptimizer.COMBINATION_HARD_LIMIT) {
//                     console.log('optimize::hit combination hard limit');
//                     return result;
//                   }
//                 }
//               }
//             }
//           }
//         }
//       }
//     }
//     return result;
//   }
// }
