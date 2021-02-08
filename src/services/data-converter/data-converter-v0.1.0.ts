import { PersistentData, VuexData } from '@/models/persistence';
import { DataConverter } from '.';
import { V_0_1_0 as Past } from '@/models/deprecated/model-v0.1.0';

/**
 * convert vuex data from v0.1.0 to v0.2.0
 */
export class DataConverter_0_1_0 implements DataConverter {
  convert(data: PersistentData): VuexData {
    const pass = data as Past.VuexData;
    console.log('convert::pass =', pass);
    throw new Error('Method not implemented.');
  }
}
