import { VuexData } from '@/models/persistence';

interface PersistenceService {
  persist(data: VuexData): void;
  load(): VuexData;
}

class DefaultPersistenceService implements PersistenceService {
  persist(data: VuexData): void {
    throw new Error('Method not implemented.');
  }
  load(): VuexData {
    throw new Error('Method not implemented.');
  }
}

export const persistenceService = new DefaultPersistenceService();
