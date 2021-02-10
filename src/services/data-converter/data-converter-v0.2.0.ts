import { PersistentData, VuexData } from '@/models/persistence';
import { DataConverter } from '.';
import { V_0_2_0 as Past } from '@/models/deprecated/model-v0.2.0';
import { Gear as Target } from '@/models';

// namespace Target {
//   export type VuexData = VuexData;
//   export type Gear = Gear.Gear;
// }

/**
 * convert vuex data from v0.2.0 to v0.2.1
 */
export class DataConverter_0_2_0 implements DataConverter {
  readonly TARGET_VERSION = '0.2.1';

  convert(data: PersistentData): PersistentData {
    const past = data as Past.VuexData;
    console.log('convert::past =', past);
    const result: VuexData = {
      version: this.TARGET_VERSION,
      gears: this.convertGears(past.gears),
      profiles: past.profiles
    };

    return result;
  }

  convertGears(pastGears: Past.Gear[]): Target.Gear[] {
    const result: Target.Gear[] = [];
    for (let i = 0; i < pastGears.length; i++) {
      const pastGear = pastGears[i];
      let newGear = new Target.Gear(
        pastGear.id,
        pastGear.type,
        pastGear.set,
        pastGear.grade.name,
        pastGear.level,
        pastGear.enhance,
        pastGear.main.value
      );
      newGear = Object.assign(newGear, pastGear);
      newGear.locked = false;
      newGear.equippedHero = '';
      result.push(newGear);
    }
    console.log('convertGears::result =', result);
    return result;
  }
}
