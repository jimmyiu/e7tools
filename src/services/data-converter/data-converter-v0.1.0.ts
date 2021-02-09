import { PersistentData, VuexData } from '@/models/persistence';
import { DataConverter } from '.';
import { V_0_1_0 as Past } from '@/models/deprecated/model-v0.1.0';
import { Gear } from '@/models';

/**
 * convert vuex data from v0.1.0 to v0.2.0
 */
export class DataConverter_0_1_0 implements DataConverter {
  readonly TARGET_VERSION = '0.2.0';

  convert(data: PersistentData): VuexData {
    const past = data as Past.VuexData;
    console.log('convert::past =', past);
    const result: VuexData = {
      version: this.TARGET_VERSION,
      gears: []
    };
    for (let i = 0; i < past.gears.length; i++) {
      const pastGear = past.gears[i];
      let newGear = new Gear.Gear(
        pastGear.id,
        pastGear.type,
        pastGear.set,
        pastGear.grade,
        pastGear.level,
        pastGear.enhance,
        pastGear.main
      );
      newGear = Object.assign(newGear, pastGear);
      newGear.locked = false;
      newGear.equippedHero = '';
      result.gears.push(newGear);
    }
    console.log('convert::result =', result);
    return result;
  }
}
