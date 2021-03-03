import { BasePersistentData, PersistentData } from '@/models/persistence';
import { V_0_5_0 } from '@/models/persistence/persistence-v0.5.0';
import { V_0_5_1 } from '@/models/persistence/persistence-v0.5.1';
import { SuitBuilder } from '..';
import { DataConverter } from './data-converter';

export class DataConverter_0_5_1 implements DataConverter {
  convert(data: BasePersistentData): BasePersistentData {
    console.log(data);
    const pastData = data as V_0_5_0.PersistentData;
    const result: V_0_5_1.PersistentData = {
      version: '0.5.1',
      gears: pastData.gears,
      profiles: pastData.profiles,
      heros: pastData.heros,
      suits: this.createSuits(pastData)
    };
    console.log('convert::result =', result);
    return result;
  }

  private createSuits(pastData: V_0_5_0.PersistentData): V_0_5_1.SuitEntity[] {
    const result: V_0_5_1.SuitEntity[] = [];
    for (let i = 0; i < pastData.profiles.length; i++) {
      const heroId = pastData.profiles[i].hero.id;
      const hero = pastData.heros.find(x => x.id == heroId);
      const gears = pastData.gears.filter(x => x.equippedHero == heroId);
      if (hero && gears && gears.length > 0) {
        result.push({
          id: hero.id,
          weaponId: gears.find(x => x.type == 'Weapon')?.id,
          armorId: gears.find(x => x.type == 'Armor')?.id,
          helmetId: gears.find(x => x.type == 'Helmet')?.id,
          necklaceId: gears.find(x => x.type == 'Necklace')?.id,
          ringId: gears.find(x => x.type == 'Ring')?.id,
          bootId: gears.find(x => x.type == 'Boot')?.id
        });
      }
    }
    return result;
  }
}
