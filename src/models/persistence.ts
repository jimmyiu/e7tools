import { Gear } from './gear';
import { E7db } from './e7db';

export type VuexData = {
  version: string;
  gears: Array<Gear.Gear>;
};

export type E7dbData = {
  date: number;
  heros: Array<E7db.Hero>;
};
