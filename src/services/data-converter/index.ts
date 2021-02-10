import { Constants } from '@/models';
import { PersistentData, VuexData } from '@/models/persistence';
import { DataConverter_0_1_0 } from './data-converter-v0.1.0';
import { DataConverter_0_2_0 } from './data-converter-v0.2.0';

export interface DataConverter {
  convert(data: PersistentData): PersistentData;
}

export class DataConverterFactory {
  static getDataConverter(version: string): DataConverter {
    switch (version) {
      case '0.1.0':
        return new DataConverter_0_1_0();
      case '0.2.0':
        return new DataConverter_0_2_0();
    }

    throw new Error('Invalid version number');
  }
}

export class DataUpgrader {
  static upgrade(data: PersistentData): VuexData {
    let result = Object.assign({}, data);
    while (result.version != Constants.CURRENT_PERSISTENT_DATA_VERSION) {
      result = DataConverterFactory.getDataConverter(result.version).convert(result);
    }
    return result as VuexData;
  }
}
