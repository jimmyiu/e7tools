import { Gear } from './gear';
import { Hero } from './hero';

export type VuexData = {
  version: string;
  gears: Array<Gear.Gear>;
};

export type E7dbData = {
  date: number;
  heros: Array<Hero>;
};
