import { BasePersistentData, PersistentData } from '@/models/persistence';
import { V_0_3_2 } from '@/models/persistence/persistence-v0.3.2';
import { V_0_4_0 } from '@/models/persistence/persistence-v0.4.0';
import { DataConverter } from './data-converter';

export class DataConverter_0_4_0 implements DataConverter {
  convert(data: BasePersistentData): BasePersistentData {
    console.log(data);
    const pastData = data as V_0_3_2.PersistentData;
    const result: V_0_4_0.PersistentData = {
      version: '0.4.0',
      gears: pastData.gears,
      profiles: this.convertProfiles(pastData.profiles),
      heros: pastData.heros
    };
    console.log('convert::result =', result);
    return result;
  }

  private convertProfiles(profiles: V_0_3_2.OptimizationProfileEntity[]): V_0_4_0.OptimizationProfileEntity[] {
    const result: V_0_4_0.OptimizationProfileEntity[] = [];
    for (let i = 0; i < profiles.length; i++) {
      const past: V_0_3_2.OptimizationProfileEntity = profiles[i];
      result.push({
        id: i.toString(),
        hero: {
          id: past.heroId,
          bonusAbility: {
            hpp: undefined,
            hp: undefined,
            defp: undefined,
            def: undefined,
            atkp: undefined,
            atk: undefined,
            cri: undefined,
            cdmg: undefined,
            spd: undefined,
            eff: undefined,
            res: undefined
          }
        },
        filter: {
          sets: past.filter.sets,
          necklaces: past.filter.necklaces,
          rings: past.filter.rings,
          boots: past.filter.boots,
          enhanceMode: past.filter.enhanceMode,
          locked: past.filter.locked,
          equipped: past.filter.equipped,
          score: 0,
          rating: {
            point: {
              hp: 1,
              def: 1,
              atk: 1,
              cri: 1,
              cdmg: 1,
              spd: 1,
              eff: 1,
              res: 1
            },
            threshold: 100
          }
        },
        stat: past.stat,
        evaluation: past.combination
      });
    }
    return result;
  }
}
