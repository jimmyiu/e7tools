import { Gear } from '..';
import { GearAbility } from '../common';

export type GearForm = GearAbility & {
  type?: Gear.Type;
  set?: Gear.Set;
  grade: Gear.Grade;
  level: number;
  enhance: number;
  statInputs: Array<Gear.StatInput>;
};

export type GearFormMode = 'new' | 'copy' | 'edit';
