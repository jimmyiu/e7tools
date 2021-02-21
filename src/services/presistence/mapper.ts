import { Gear, Hero, OptimizationProfile } from '@/models';
import { GearEntity, HeroEntity, OptimizationProfileEntity } from '@/models/persistence';
import { gearService } from '@/services';

export class GearMapper {
  static toGear(gear: GearEntity): Gear.Gear {
    const result = new Gear.Gear(
      gear.id,
      gear.type as Gear.Type,
      gear.set as Gear.Set,
      gear.grade,
      gear.level,
      gear.enhance,
      gear.main
    );
    result.hpp = gear.hpp;
    result.hp = gear.hp;
    result.defp = gear.defp;
    result.def = gear.def;
    result.atkp = gear.atkp;
    result.atk = gear.atk;
    result.cri = gear.cri;
    result.cdmg = gear.cdmg;
    result.spd = gear.spd;
    result.eff = gear.eff;
    result.res = gear.res;
    // v0.2.0
    result.locked = gear.locked;
    result.equippedHero = gear.equippedHero;
    gearService.assignScore(result);
    return result;
  }

  static toGearEntity(gear: Gear.Gear): GearEntity {
    return {
      id: gear.id,
      type: gear.type,
      set: gear.set,
      grade: gear.grade.name,
      level: gear.level,
      enhance: gear.enhance,
      main: gear.main.value,
      hpp: gear.hpp,
      hp: gear.hp,
      defp: gear.defp,
      def: gear.def,
      atkp: gear.atkp,
      atk: gear.atk,
      cri: gear.cri,
      cdmg: gear.cdmg,
      spd: gear.spd,
      eff: gear.eff,
      res: gear.res,
      locked: gear.locked,
      equippedHero: gear.equippedHero
    };
  }
}

export class OptimizationPorfileMapper {
  static toProfile(profile: OptimizationProfileEntity): OptimizationProfile {
    return {
      id: profile.id,
      heroId: profile.heroId,
      filter: {
        sets: profile.filter.sets.map(x => x as Gear.Set),
        enhanceMode: profile.filter.enhanceMode,
        locked: profile.filter.locked,
        equipped: profile.filter.equipped,
        score: profile.filter.score,
        necklaces: profile.filter.necklaces.map(x => Gear.Stat.getInstance(x)),
        rings: profile.filter.rings.map(x => Gear.Stat.getInstance(x)),
        boots: profile.filter.boots.map(x => Gear.Stat.getInstance(x))
      },
      stat: profile.stat,
      combination: {
        forcedSets: profile.combination.forcedSets.map(x => x as Gear.Set),
        limit: profile.combination.limit,
        brokenSet: profile.combination.brokenSet
      }
    };
  }

  static toProfileEntity(profile: OptimizationProfile): OptimizationProfileEntity {
    return {
      id: profile.id,
      heroId: profile.heroId,
      filter: {
        sets: profile.filter.sets,
        enhanceMode: profile.filter.enhanceMode,
        locked: profile.filter.locked,
        equipped: profile.filter.equipped,
        score: profile.filter.score,
        necklaces: profile.filter.necklaces.map(x => x.value),
        rings: profile.filter.rings.map(x => x.value),
        boots: profile.filter.boots.map(x => x.value)
      },
      stat: profile.stat,
      combination: {
        forcedSets: profile.combination.forcedSets.map(x => x as Gear.Set),
        limit: profile.combination.limit,
        brokenSet: profile.combination.brokenSet
      }
    };
  }
}
