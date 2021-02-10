import { PersistentData, VuexData } from '@/models/persistence';
import { DataConverter } from '.';
import { V_0_1_0 as Past } from '@/models/deprecated/model-v0.1.0';
import { V_0_2_0 as Target } from '@/models/deprecated/model-v0.2.0';
// import { Gear } from '@/models';

/**
 * convert vuex data from v0.1.0 to v0.2.0
 */
export class DataConverter_0_1_0 implements DataConverter {
  readonly TARGET_VERSION = '0.2.0';

  convert(data: PersistentData): PersistentData {
    const past = data as Past.VuexData;
    console.log('convert::past =', past);
    const result: Target.VuexData = {
      version: this.TARGET_VERSION,
      gears: [],
      profiles: []
    };
    for (let i = 0; i < past.gears.length; i++) {
      const pastGear = past.gears[i];
      let newGear = new Target.Gear(
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

  // convertStat(input: V_0_1_0.Stat): Gear.Stat {
  //   switch (input.value) {
  //     case V_0_1_0.Stat.HPP.value:
  //       return Gear.Stat.HPP;
  //     case V_0_1_0.Stat.HP.value:
  //       return Gear.Stat.HP;
  //     case V_0_1_0.Stat.DEFP.value:
  //       return Gear.Stat.DEFP;
  //     case V_0_1_0.Stat.DEF.value:
  //       return Gear.Stat.DEF;
  //     case V_0_1_0.Stat.ATKP.value:
  //       return Gear.Stat.ATKP;
  //     case V_0_1_0.Stat.ATK.value:
  //       return Gear.Stat.ATK;
  //     case V_0_1_0.Stat.CRI.value:
  //       return Gear.Stat.CRI;
  //     case V_0_1_0.Stat.CDMG.value:
  //       return Gear.Stat.CDMG;
  //     case V_0_1_0.Stat.SPD.value:
  //       return Gear.Stat.SPD;
  //     case V_0_1_0.Stat.EFF.value:
  //       return Gear.Stat.EFF;
  //     case V_0_1_0.Stat.RES.value:
  //       return Gear.Stat.RES;
  //   }
  //   console.error('convertStat::fail to convert stat=', input);
  //   throw new Error('convertStat::fail to convert stat=' + input.value);
  // }
}
