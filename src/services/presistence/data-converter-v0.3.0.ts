import { BasePersistentData, PersistentData } from '@/models/persistence';
import { V_0_3_0 } from '@/models/persistence/persistence-v0.3.0';
import { V_0_3_1 } from '@/models/persistence/persistence-v0.3.1';
import { DataConverter } from './data-converter';

export class DataConverter_0_3_0 implements DataConverter {
  convert(data: BasePersistentData): PersistentData {
    console.log(data);
    const pastData = data as V_0_3_0.PersistentData;
    const result: V_0_3_1.PersistentData = {
      version: '0.3.1',
      gears: pastData.gears,
      profiles: this.convertProfiles(pastData.profiles),
      heros: pastData.heros
    };
    console.log('convert::result =', result);
    return result;
  }

  private convertProfiles(profiles: V_0_3_0.OptimizationProfileEntity[]): V_0_3_1.OptimizationProfileEntity[] {
    const result: V_0_3_1.OptimizationProfileEntity[] = [];
    for (let i = 0; i < profiles.length; i++) {
      const past: V_0_3_0.OptimizationProfileEntity = profiles[i];
      result.push({
        id: i.toString(),
        heroId: past.heroId,
        filter: past.filter,
        stat: past.stat,
        combination: {
          forcedSets: past.combination.forcedSets,
          limit: 20000000
        }
      });
    }
    return result;
  }
}
