import { BasePersistentData, PersistentData } from '@/models/persistence';
import { V_0_3_0 } from '@/models/persistence/persistence-v0.3.0';
import { V_0_3_1 } from '@/models/persistence/persistence-v0.3.1';
import { V_0_3_2 } from '@/models/persistence/persistence-v0.3.2';
import { DataConverter } from './data-converter';

export class DataConverter_0_3_0 implements DataConverter {
  convert(data: BasePersistentData): BasePersistentData {
    console.log(data);
    const pastData = data as V_0_3_0.PersistentData;
    const result: V_0_3_2.PersistentData = {
      version: '0.3.2',
      gears: pastData.gears,
      profiles: this.convertProfiles(pastData.profiles),
      heros: this.convertHeros(pastData.heros)
    };
    console.log('convert::result =', result);
    return result;
  }

  private convertHeros(heros: V_0_3_0.HeroEntity[]): V_0_3_2.HeroEntity[] {
    const result: V_0_3_2.HeroEntity[] = [];
    for (let i = 0; i < heros.length; i++) {
      const past = heros[i];
      result.push({
        ...past,
        attribute: '',
        role: '',
        rarity: 0
      });
    }
    return result;
  }

  private convertProfiles(profiles: V_0_3_0.OptimizationProfileEntity[]): V_0_3_2.OptimizationProfileEntity[] {
    const result: V_0_3_2.OptimizationProfileEntity[] = [];
    for (let i = 0; i < profiles.length; i++) {
      const past: V_0_3_0.OptimizationProfileEntity = profiles[i];
      result.push({
        id: i.toString(),
        heroId: past.heroId,
        filter: {
          sets: past.filter.sets,
          necklaces: past.filter.necklaces,
          rings: past.filter.rings,
          boots: past.filter.boots,
          enhanceMode: past.filter.enhanceMode,
          locked: past.filter.locked,
          equipped: past.filter.equipped,
          score: 0
        },
        stat: past.stat,
        combination: {
          forcedSets: past.combination.forcedSets,
          limit: (past as V_0_3_1.OptimizationProfileEntity).combination.limit ?? 20000000,
          brokenSet: false
        }
      });
    }
    return result;
  }
}
