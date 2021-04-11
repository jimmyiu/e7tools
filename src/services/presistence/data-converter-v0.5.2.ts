import { BasePersistentData, PersistentData } from '@/models/persistence';
import { V_0_5_1 } from '@/models/persistence/persistence-v0.5.1';
import { V_0_5_2 } from '@/models/persistence/persistence-v0.5.2';
import { DataConverter } from './data-converter';

export class DataConverter_0_5_2 implements DataConverter {
  convert(data: BasePersistentData): BasePersistentData {
    console.log(data);
    const pastData = data as V_0_5_1.PersistentData;
    const result: V_0_5_2.PersistentData = {
      version: '0.5.2',
      gears: pastData.gears,
      profiles: this.createProfiles(pastData.profiles),
      heros: this.createHeros(pastData.heros),
      suits: pastData.suits
    };
    console.log('convert::result =', result);
    return result;
  }

  private createHeros(pastData: V_0_5_1.HeroEntity[]): V_0_5_2.HeroEntity[] {
    const result: V_0_5_2.HeroEntity[] = [];
    for (let i = 0; i < pastData.length; i++) {
      const hero = pastData[i];
      result.push({
        ...hero,
        order: hero.tier > 0 ? hero.tier : 0
      });
    }
    return result;
  }

  private createProfiles(pastData: V_0_5_1.OptimizationProfileEntity[]): V_0_5_2.OptimizationProfileEntity[] {
    const result: V_0_5_2.OptimizationProfileEntity[] = [];
    for (let i = 0; i < pastData.length; i++) {
      const profile = pastData[i];
      const item = {
        ...profile
      };
      if (profile.filter.equippedMode == 3) {
        item.filter.equippedMode = 2;
      } else if (item.filter.equippedMode == 2) {
        item.filter.equippedMode = 1;
      }
      result.push(item);
    }
    return result;
  }
}
