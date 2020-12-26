// export * from '@/models/enum.ts';

export type IBuilder<T> = {
  [k in keyof T]: (arg: T[k]) => IBuilder<T>;
} & { build(): T };

export { Gear } from './gear';
export { Hero } from './hero';
