// import { GearSet, GearType } from '@/models/enum';

export interface Campaign {
  id?: string;
  name: string;
  type: string;
  quota: number;
  status: string;
}

export class Hero {
  _id: string = '';
  name: string = '';
}

// export * from '@/models/enum.ts';
export { Gear } from './gear';
