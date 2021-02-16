import { BasePersistentData, PersistentData } from '@/models/persistence';
import { V_0_2_1 } from '@/models/persistence/persistence-v0.2.1';
import { V_0_3_0 } from '@/models/persistence/persistence-v0.3.0';
import { DataConverter } from './data-converter';

export class DataConverter_0_2_1 implements DataConverter {
  convert(data: BasePersistentData): PersistentData {
    console.log(data);
    const pastData = data as V_0_2_1.PersistentData;
    const result: V_0_3_0.PersistentData = {
      version: '0.3.0',
      gears: [],
      profiles: [],
      heros: this.getHeros()
    };
    if (pastData.gears && pastData.gears.length > 0) {
      for (let i = 0; i < pastData.gears.length; i++) {
        result.gears.push(this.convertGear(pastData.gears[i]));
      }
    }
    if (pastData.profiles && pastData.profiles.length > 0) {
      for (let i = 0; i < pastData.profiles.length; i++) {
        result.profiles.push(this.convertProfile(pastData.profiles[i]));
      }
    }
    console.log('convert::result =', result);
    return result;
  }

  /**
   * At v0.2.1 heros data are stored in another local storage
   */
  private getHeros(): V_0_3_0.HeroEntity[] {
    const json = localStorage.getItem('vuex.e7db');
    if (json) {
      const e7db: V_0_2_1.E7dbData = JSON.parse(json);
      if (e7db.heros) {
        return e7db.heros;
      }
    }
    return [];
  }

  private convertGear(past: V_0_2_1.Gear): V_0_3_0.GearEntity {
    return {
      id: past.id,
      type: past.type,
      set: past.set,
      level: past.level,
      enhance: past.enhance,
      hpp: past.hpp,
      hp: past.hp,
      defp: past.defp,
      def: past.def,
      atkp: past.atkp,
      atk: past.atk,
      cri: past.cri,
      cdmg: past.cdmg,
      spd: past.spd,
      eff: past.eff,
      res: past.res,
      locked: past.locked,
      equippedHero: past.equippedHero,
      grade: past.grade.name,
      main: past.main.value
    };
  }

  private convertProfile(past: V_0_2_1.OptimizationProfile): V_0_3_0.OptimizationProfileEntity {
    return {
      id: past.id,
      heroId: past.hero.id,
      filter: {
        sets: past.filter.sets.map(x => x.toString()),
        enhanceMode: past.filter.enhanceMode,
        necklaces: past.filter.boots.map(x => x.value),
        rings: past.filter.boots.map(x => x.value),
        boots: past.filter.boots.map(x => x.value),
        equipped: past.filter.equipped,
        locked: past.filter.locked
      },
      stat: {
        hp: Object.assign({}, past.stat.hp),
        def: Object.assign({}, past.stat.def),
        atk: Object.assign({}, past.stat.atk),
        cri: Object.assign({}, past.stat.cri),
        cdmg: Object.assign({}, past.stat.cdmg),
        spd: Object.assign({}, past.stat.spd),
        eff: Object.assign({}, past.stat.eff),
        res: Object.assign({}, past.stat.res),
        ehp: Object.assign({}, past.stat.ehp),
        damage: Object.assign({}, past.stat.damage)
      },
      combination: {
        forcedSets: past.combination.forcedSets
      }
    };
  }
}
