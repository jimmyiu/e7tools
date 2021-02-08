import { Gear } from './gear';
import { Hero } from './hero';

export type PersistentData = {
  version: string;
};

export type VuexData = PersistentData & {
  gears: Array<Gear.Gear>;
};

export type E7dbData = {
  date: number;
  heros: Array<Hero>;
};
