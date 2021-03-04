import { Constants, Gear, Hero, OptimizationProfile, VuexData } from '@/models';
import { BaseEntity, HeroEntity, PersistentData, PersistentDataKey } from '@/models/persistence';
import { HeroSuit } from '@/models/suit';
import { DataUpgrader } from '.';
import { GearMapper, HeroSuitMapper, OptimizationPorfileMapper } from './mapper';

export interface PersistenceService {
  /**
   * init
   */
  init(): void;
  /**
   * Persist the data to persistent storage
   * @param key the key in the PersistentData
   * @param data the data
   */
  save(data: BaseEntity): void;

  /**
   * Remove the data from persistent storage
   * @param data
   */
  remove(data: BaseEntity): void;

  replaceAll(data: any[]): void;
  /**
   * @param key the key in the PersistentData
   * @param index the index in the array
   * @param data the data
   */
  // persist(key: string, index: number, data: any): void;
  /**
   * Load the persistent data from persistent storage
   */
  getVuexData(): VuexData;
}

export class DefaultPersistenceService implements PersistenceService {
  private _data: PersistentData;

  constructor() {
    this._data = {
      version: Constants.CURRENT_PERSISTENT_DATA_VERSION,
      gears: [],
      heros: [],
      profiles: [],
      suits: []
    };
  }

  replaceAll(data: any[]): void {
    // throw new Error('Method not implemented.');
    console.log('replaceAll::data =', data);
    if (data && data.length > 0 && data[0]) {
      const key = this.typeof(data[0]);
      console.log('replaceAll::key =', key);
      if (key == 'gears') {
        this._data.gears = (data as Gear.Gear[]).map((x: Gear.Gear) => GearMapper.toGearEntity(x));
      } else if (key == 'profiles') {
        this._data.profiles = (data as OptimizationProfile[]).map(x => OptimizationPorfileMapper.toProfileEntity(x));
      } else if (key == 'heros') {
        this._data.heros = Object.assign([], data);
      } else if (key == 'suits') {
        this._data.suits = (data as HeroSuit[]).map(x => HeroSuitMapper.toEntity(x));
      }
    }
    localStorage.setItem(Constants.KEY_VUEXDATA, JSON.stringify(this._data));
  }

  remove(data: BaseEntity): void {
    if (data && data.id) {
      this.removeEntity(this.typeof(data), data.id);
    }
  }

  save(data: any): void {
    // TODO: better check object type logic
    console.log('save::data = ', data);
    if (data && data.id) {
      const key = this.typeof(data);
      console.log('save::key = ', key);
      let entity: BaseEntity = data;
      if (key == 'gears') {
        entity = GearMapper.toGearEntity(data);
      } else if (key == 'profiles') {
        entity = OptimizationPorfileMapper.toProfileEntity(data);
      } else if (key == 'suits') {
        entity = HeroSuitMapper.toEntity(data);
      }
      this.persistEntity(key, entity);
    }
  }

  getVuexData(): VuexData {
    return {
      gears: this._data.gears.map(x => GearMapper.toGear(x)),
      profiles: this._data.profiles.map(x => OptimizationPorfileMapper.toProfile(x)),
      heros: this._data.heros,
      suits: this._data.suits.map(x => HeroSuitMapper.toObject(x)),
      state: {
        lastSelectedHeroId: Constants.DEFAULT_HERO_ID
      }
    };
  }

  init() {
    console.log('init::start');
    let data = JSON.parse(localStorage.getItem(Constants.KEY_VUEXDATA)!!);
    if (data && (data as PersistentData).version) {
      if ((data as PersistentData).version == Constants.CURRENT_PERSISTENT_DATA_VERSION) {
        console.log('load::data is in current version');
      } else {
        console.log(`load::require data upgrade, current version = ${data.version}`);
        data = DataUpgrader.upgrade(data);
      }
      this._data = data;
    } else {
      console.log('init::no valid persistent data found');
    }
  }

  private typeof(data: any): PersistentDataKey {
    if (data instanceof Gear.Gear) {
      return 'gears';
    } else if ((data as OptimizationProfile).filter != undefined) {
      return 'profiles';
    } else if ((data as HeroEntity).icon != undefined) {
      return 'heros';
    } else if ((data as HeroSuit).heroSuitId != undefined) {
      return 'suits';
    }
    throw new Error('invalid datHeroSuita type');
  }

  private persistEntity(key: keyof Omit<PersistentData, 'version'>, entity: BaseEntity) {
    if (entity && entity.id) {
      const array: BaseEntity[] = this._data[key];
      const index = array.findIndex((x: BaseEntity) => x.id == entity.id);
      if (index >= 0) {
        array.splice(index, 1, entity);
      } else {
        array.push(Object.assign({}, entity));
      }
      localStorage.setItem(Constants.KEY_VUEXDATA, JSON.stringify(this._data));
    }
  }

  private removeEntity(key: keyof Omit<PersistentData, 'version'>, id: string) {
    if (id) {
      const array: BaseEntity[] = this._data[key];
      const index = array.findIndex((x: BaseEntity) => x.id == id);
      if (index >= 0) {
        array.splice(index, 1);
        localStorage.setItem(Constants.KEY_VUEXDATA, JSON.stringify(this._data));
      }
    }
  }
}
