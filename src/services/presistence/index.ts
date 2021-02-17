import { DataConverterFactory, DataUpgrader } from './data-converter';
import { DefaultPersistenceService } from './persistence-service';

export { DataConverterFactory, DataUpgrader };
export const persistenceService = new DefaultPersistenceService();
persistenceService.init();
