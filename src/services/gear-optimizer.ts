import { Gear, Gear2, Range, HeroAbility, EquipedHero, OptimizationProfile, OptimizationResult } from '@/models';
import GearCombinationService from './gear-combination-service';

export interface IGearOptimizer {
  store: Gear.GearStore;
  profile: OptimizationProfile;
  progressCallback: (x: number) => void;

  optimize: () => EquipedHero[];
}

export class DefaultGearOptimizer implements IGearOptimizer {
  static COMBINATION_HARD_LIMIT = 10000000;
  // static COMBINATION_HARD_LIMIT = 10;
  static OPTIMIZE_RESULT_HARD_LIMIT = 30000;
  static REPORT_PROGRESS_COUNT = DefaultGearOptimizer.COMBINATION_HARD_LIMIT / 10;

  constructor(
    public readonly store: Gear.GearStore,
    public readonly profile: OptimizationProfile,
    public readonly progressCallback: (x: number) => void
  ) { }

  optimize(): EquipedHero[] {
    console.log('optimize::start');
    console.log('optimize::hero =', this.profile.hero);
    let start = Date.now();
    // this.evaluate(result, builder, Object.values(Gear.Type));
    this.progressCallback(0);
    const result: EquipedHero[] = this.performOptimize();
    this.progressCallback(100);
    console.log('optimize::processing time =', (Date.now() - start) / 1000, 'seconds');
    return result;
  }

  minFilter(stat: string) {
    if ((this.profile.criteria as any)[stat]!.min) {
      return (ability: HeroAbility) => (ability as any)[stat] >= (this.profile.criteria as any)[stat].min!;
    }
    return (ability: HeroAbility) => true;
  }
  maxFilter(stat: string) {
    if ((this.profile.criteria as any)[stat]!.max) {
      return (ability: HeroAbility) => (ability as any)[stat] <= (this.profile.criteria as any)[stat].max!;
    }
    return (ability: HeroAbility) => true;
  }

  heroAbilityFilter() {
    // type Filter = (ability: HeroAbility) => boolean;

    let atkMin = this.minFilter(Gear.Stat.ATK.value);
    let atkMax = this.maxFilter(Gear.Stat.ATK.value);
    let spdMin = this.minFilter(Gear.Stat.SPD.value);
    let criMin = this.minFilter(Gear.Stat.CRI.value);
    let criMax = this.maxFilter(Gear.Stat.CRI.value);

    let cdmgMin = this.minFilter(Gear.Stat.CDMG.value);
    let cdmgMax = this.maxFilter(Gear.Stat.CDMG.value);

    let ehpMin = this.minFilter('ehp');
    let damageMin = this.minFilter('damage');
    return (ability: EquipedHero) => {
      return (
        spdMin(ability) &&
        criMin(ability) &&
        criMax(ability) &&
        atkMin(ability) &&
        atkMax(ability) &&
        cdmgMin(ability) &&
        cdmgMax(ability) &&
        ehpMin(ability) &&
        damageMin(ability)
      );
    };
  }

  performOptimize(): EquipedHero[] {
    let count = 0;
    const result: EquipedHero[] = [];
    const builder = new Gear2.GearCombinationBuilder();
    const filter = this.heroAbilityFilter();
    for (let i1 = 0; i1 < this.store.weapons.length; i1++) {
      builder.weapon(this.store.weapons[i1]);
      for (let i2 = 0; i2 < this.store.helmets.length; i2++) {
        builder.helmet(this.store.helmets[i2]);
        for (let i3 = 0; i3 < this.store.armors.length; i3++) {
          builder.armor(this.store.armors[i3]);
          for (let i4 = 0; i4 < this.store.necklaces.length; i4++) {
            builder.necklace(this.store.necklaces[i4]);
            for (let i5 = 0; i5 < this.store.rings.length; i5++) {
              builder.ring(this.store.rings[i5]);
              for (let i6 = 0; i6 < this.store.boots.length; i6++) {
                builder.boot(this.store.boots[i6]);

                if (++count % DefaultGearOptimizer.REPORT_PROGRESS_COUNT == 0) {
                  console.log('optimize::count =', count, ', result.length =', result.length);
                  // this.progressCallback(Math.trunc((100 * count) / DefaultGearOptimizer.COMBINATION_HARD_LIMIT));
                  this.progressCallback(count);
                  if (count++ >= DefaultGearOptimizer.COMBINATION_HARD_LIMIT) {
                    console.log('optimize::hit combination hard limit');
                    return result;
                  }
                }

                let combination = builder.build();
                const equipedHero = GearCombinationService.apply(combination, this.profile.hero);
                if (filter(equipedHero)) {
                  result.push(equipedHero);
                  if (result.length >= DefaultGearOptimizer.OPTIMIZE_RESULT_HARD_LIMIT) {
                    console.log('optimize::hit combination hard limit, result.length =', result.length);
                    return result;
                  }
                }
              }
            }
          }
        }
      }
    }
    return result;
  }

  // evaluate(result: Gear.GearCombination[], builder: Gear.GearCombinationBuilder, types: Gear.Type[]) {
  //   if (types.length == 0) {
  //     let combination = builder.build();

  //     if (result.length >= GearOptimizer.OPTIMIZE_RESULT_HARD_LIMIT) {
  //       console.log('optimize::hit combination hard limit, result.length =', result.length);
  //       console.log('processing time =', (Date.now() - time) / 1000, 'seconds');
  //       return result;
  //     }
  //   } else {
  //     const gears: Gear.Gear[] = this.store.getGearsByType(types[0]);
  //     for (let i = 0; i < gears.length; i++) {
  //       builder.set(types[0], gears[i]);
  //       this.evaluate(result, builder, types.slice(1));
  //     }
  //   }
  // }
}
