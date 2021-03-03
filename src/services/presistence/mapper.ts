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
      hero: {
        id: profile.hero.id
      },
      filter: {
        sets: profile.filter.sets.map(x => x as Gear.Set),
        necklaces: profile.filter.necklaces.map(x => Gear.Stat.getInstance(x)),
        rings: profile.filter.rings.map(x => Gear.Stat.getInstance(x)),
        boots: profile.filter.boots.map(x => Gear.Stat.getInstance(x)),
        maxSize: profile.filter.maxSize,
        enhanceMode: profile.filter.enhanceMode,
        equippedMode: profile.filter.equippedMode
      },
      stat: {
        hp: { min: profile.stat.hp.min, max: profile.stat.hp.max },
        def: { min: profile.stat.def.min, max: profile.stat.def.max },
        atk: { min: profile.stat.atk.min, max: profile.stat.atk.max },
        cri: { min: profile.stat.cri.min, max: profile.stat.cri.max },
        cdmg: { min: profile.stat.cdmg.min, max: profile.stat.cdmg.max },
        spd: { min: profile.stat.spd.min, max: profile.stat.spd.max },
        eff: { min: profile.stat.eff.min, max: profile.stat.eff.max },
        res: { min: profile.stat.res.min, max: profile.stat.res.max },
        ehp: { min: profile.stat.ehp.min, max: profile.stat.ehp.max },
        damage: { min: profile.stat.damage.min, max: profile.stat.damage.max }
      },
      evaluation: {
        forcedSets: profile.evaluation.forcedSets.map(x => x as Gear.Set),
        limit: profile.evaluation.limit,
        brokenSet: profile.evaluation.brokenSet,
        lv85: profile.evaluation.lv85
      }
    };
  }

  static toProfileEntity(profile: OptimizationProfile): OptimizationProfileEntity {
    return {
      id: profile.id,
      hero: {
        id: profile.hero.id
      },
      filter: {
        sets: profile.filter.sets,
        necklaces: profile.filter.necklaces.map(x => x.value),
        rings: profile.filter.rings.map(x => x.value),
        boots: profile.filter.boots.map(x => x.value),
        maxSize: profile.filter.maxSize,
        enhanceMode: profile.filter.enhanceMode,
        equippedMode: profile.filter.equippedMode
      },
      stat: {
        hp: { min: profile.stat.hp.min, max: profile.stat.hp.max },
        def: { min: profile.stat.def.min, max: profile.stat.def.max },
        atk: { min: profile.stat.atk.min, max: profile.stat.atk.max },
        cri: { min: profile.stat.cri.min, max: profile.stat.cri.max },
        cdmg: { min: profile.stat.cdmg.min, max: profile.stat.cdmg.max },
        spd: { min: profile.stat.spd.min, max: profile.stat.spd.max },
        eff: { min: profile.stat.eff.min, max: profile.stat.eff.max },
        res: { min: profile.stat.res.min, max: profile.stat.res.max },
        ehp: { min: profile.stat.ehp.min, max: profile.stat.ehp.max },
        damage: { min: profile.stat.damage.min, max: profile.stat.damage.max }
      },
      evaluation: {
        forcedSets: profile.evaluation.forcedSets.map(x => x as Gear.Set),
        limit: profile.evaluation.limit,
        brokenSet: profile.evaluation.brokenSet,
        lv85: profile.evaluation.lv85
      }
    };
  }
}
