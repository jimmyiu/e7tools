import { V_0_5_1 as Current } from './persistence-v0.5.1';

export type BasePersistentData = {
  version: string;
};

export type BaseEntity = {
  id: string;
};

export type GearEntity = Current.GearEntity;
export type OptimizationProfileEntity = Current.OptimizationProfileEntity;
export type HeroEntity = Current.HeroEntity;
export type SuitEntity = Current.SuitEntity;
export type PersistentData = Current.PersistentData;
export type PersistentDataKey = Current.PersistentDataKey;
