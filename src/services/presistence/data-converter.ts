import { Constants } from '@/models';
import { BasePersistentData } from '@/models/persistence';
import { DataConverter_0_2_1 } from './data-converter-v0.2.1';
import { DataConverter_0_3_0 } from './data-converter-v0.3.0';

export interface DataConverter {
  convert(data: BasePersistentData): BasePersistentData;
}

export class DataConverterFactory {
  static getDataConverter(version: string): DataConverter {
    switch (version) {
      case '0.2.1':
        return new DataConverter_0_2_1();
      case '0.3.0':
      case '0.3.1':
        return new DataConverter_0_3_0();
    }
    throw new Error('Invalid version number');
  }
}

export class DataUpgrader {
  static upgrade(data: BasePersistentData): BasePersistentData {
    let result = Object.assign({}, data);
    while (result.version != Constants.CURRENT_PERSISTENT_DATA_VERSION) {
      result = DataConverterFactory.getDataConverter(result.version).convert(result);
    }
    return result;
  }
}
