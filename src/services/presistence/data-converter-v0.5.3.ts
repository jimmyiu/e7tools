import { BasePersistentData, PersistentData } from '@/models/persistence';
import { V_0_5_2 as Past } from '@/models/persistence/persistence-v0.5.2';
import { V_0_5_3 as Now } from '@/models/persistence/persistence-v0.5.3';
import { DataConverter } from './data-converter';

export class DataConverter_0_5_3 implements DataConverter {
  convert(data: BasePersistentData): BasePersistentData {
    console.log(data);
    const pastData = data as Past.PersistentData;
    const result: Now.PersistentData = {
      version: '0.5.3',
      gears: pastData.gears,
      profiles: pastData.profiles,
      heros: this.createHeros(pastData.heros),
      suits: pastData.suits
    };
    console.log('convert::result =', result);
    return result;
  }

  private createHeros(pastData: Past.HeroEntity[]): Now.HeroEntity[] {
    const result: Now.HeroEntity[] = [];
    for (let i = 0; i < pastData.length; i++) {
      const hero = pastData[i];
      const item = {
        ...hero
      };
      delete (item as any).tier;
      result.push(item);
    }
    return result;
  }
}
