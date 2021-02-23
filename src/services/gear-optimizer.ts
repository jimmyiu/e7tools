import { Gear, HeroAbility, EquippedHero, OptimizationProfile, Hero } from '@/models';
import { OptimizationResult } from '@/models/optimizer';
import { gearService, heroService, SuitBuilder } from '.';

export interface GearOptimizer {
  store: Gear.GearStore;
  profile: OptimizationProfile;
  hero: Hero;
  progressCallback: (x: GearOptimizerProgress) => void;

  optimize: () => OptimizationResult[];
}

export type GearOptimizerProgress = {
  evaluated: number;
  proceeded: number;
  found: number;
  processTime: number;
};

export class DefaultGearOptimizer implements GearOptimizer {
  static OPTIMIZE_RESULT_LIMIT = 20000;
  reportProgressCount: number;
  startTime: number;
  result: EquippedHero[] = [];
  progress: GearOptimizerProgress = {
    evaluated: 0,
    proceeded: 0,
    found: 0,
    processTime: 0
  };

  constructor(
    public readonly store: Gear.GearStore,
    public readonly profile: OptimizationProfile,
    public readonly hero: Hero,
    public readonly progressCallback: (x: GearOptimizerProgress) => void
  ) {
    this.reportProgressCount = Math.ceil(this.profile.evaluation.limit / 10);
    this.startTime = Date.now();
  }

  reportProgress() {
    this.progress.found = this.result.length;
    this.progress.processTime = (Date.now() - this.startTime) / 1000;
    this.progressCallback(this.progress);
  }

  optimize(): OptimizationResult[] {
    console.log('optimize::start');
    console.log('optimize::profile =', this.profile);
    this.performOptimize();
    this.reportProgress();
    console.log('optimize::processing time =', (Date.now() - this.startTime) / 1000, 'seconds');
    return this.toResult(this.result);
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

  evaluationFilter() {
    let forcedSet = (builder: SuitBuilder) => true;
    if (this.profile.evaluation.forcedSets.length > 0) {
      const target: Partial<Record<Gear.Set, number>> = {};
      // TODO: currently assumed input sets is make sense
      for (let i = 0; i < this.profile.evaluation.forcedSets.length; i++) {
        const set = this.profile.evaluation.forcedSets[i];
        switch (set) {
          case Gear.Set.Speed:
          case Gear.Set.Attack:
          case Gear.Set.Destruction:
          case Gear.Set.LifeSteal:
          case Gear.Set.Counter:
          case Gear.Set.Rage:
          case Gear.Set.Revenge:
          case Gear.Set.Injury:
            target[set] = target[set] ?? 4;
            break;
          default:
            target[set] = (target[set] ?? 0) + 2;
            break;
        }
      }
      forcedSet = (builder: SuitBuilder) => builder.assertTargetSets(target);
    }

    let brokenSet = (builder: SuitBuilder) => true;
    if (!this.profile.evaluation.brokenSet) {
      brokenSet = (builder: SuitBuilder) => !builder.isBrokenSet();
    }

    return (builder: SuitBuilder) => {
      return forcedSet(builder) && brokenSet(builder); // && forcedSet(builder);
    };
  }

  postEvaluationFilter() {
    let lv85 = (hero: EquippedHero) => true;
    if (this.profile.evaluation.lv85) {
      lv85 = (hero: EquippedHero) => {
        return (
          hero.suit.weapon?.level == 85 ||
          hero.suit.helmet?.level == 85 ||
          hero.suit.armor?.level == 85 ||
          hero.suit.necklace?.level == 85 ||
          hero.suit.ring?.level == 85 ||
          hero.suit.boot?.level == 85
        );
      };
    }
    return (hero: EquippedHero) => {
      return lv85(hero);
    };
  }

  equippedHeroFilter() {
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

    return (hero: EquippedHero) => {
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

  toResult(heros: EquippedHero[]): OptimizationResult[] {
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
        dms: hero.dms,
        rating: gearService.calculateSuitRating(hero, this.hero, this.profile.filter.rating.point),
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

  performOptimize(): EquippedHero[] {
    this.result = [];
    this.startTime = Date.now();
    this.reportProgress();
    //
    const builder = new SuitBuilder();
    console.log('this.profile.hero.bonusAbility =', this.profile.hero.bonusAbility);
    builder.bonus(this.profile.hero.bonusAbility);
    const equippedHeroFilter = this.equippedHeroFilter();
    const evaluationFilter = this.evaluationFilter();
    const postEvaluationFilter = this.postEvaluationFilter();
    for (let i1 = 0, n1 = this.store.weapons.length; i1 < n1; i1++) {
      builder.weapon(this.store.weapons[i1]);
      for (let i2 = 0, n2 = this.store.helmets.length; i2 < n2; i2++) {
        builder.helmet(this.store.helmets[i2]);
        for (let i3 = 0, n3 = this.store.armors.length; i3 < n3; i3++) {
          builder.armor(this.store.armors[i3]);
          if (!evaluationFilter(builder)) {
            this.progress.proceeded += this.store.necklaces.length * this.store.rings.length * this.store.boots.length;
            continue;
          }
          for (let i4 = 0, n4 = this.store.necklaces.length; i4 < n4; i4++) {
            builder.necklace(this.store.necklaces[i4]);
            if (!evaluationFilter(builder)) {
              this.progress.proceeded += this.store.rings.length * this.store.boots.length;
              continue;
            }
            for (let i5 = 0, n5 = this.store.rings.length; i5 < n5; i5++) {
              builder.ring(this.store.rings[i5]);
              if (!evaluationFilter(builder)) {
                this.progress.proceeded += this.store.boots.length;
                continue;
              }
              for (let i6 = 0, n6 = this.store.boots.length; i6 < n6; i6++) {
                builder.boot(this.store.boots[i6]);
                if (++this.progress.proceeded && !evaluationFilter(builder)) {
                  continue;
                }
                const equippedHero = heroService.equip(this.hero, builder.build());
                if (postEvaluationFilter(equippedHero) && equippedHeroFilter(equippedHero)) {
                  this.result.push(equippedHero);
                  if (this.result.length >= DefaultGearOptimizer.OPTIMIZE_RESULT_LIMIT) {
                    console.log(
                      'optimize::hit result limit, proceeded =',
                      this.progress.proceeded,
                      ', result.length =',
                      this.result.length
                    );
                    return this.result;
                  }
                }

                if (++this.progress.evaluated % this.reportProgressCount == 0) {
                  console.log(
                    'optimize::proceeded =',
                    this.progress.proceeded,
                    ',evaluated =',
                    this.progress.evaluated,
                    ',result.length =',
                    this.result.length
                  );
                  // this.progressCallback(Math.trunc((100 * count) / DefaultGearOptimizer.COMBINATION_HARD_LIMIT));
                  this.reportProgress();

                  // hard limit check
                  if (this.progress.evaluated >= this.profile.evaluation.limit) {
                    console.log('optimize::hit evaluation hard limit');
                    return this.result;
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
    return this.result;
  }
}
