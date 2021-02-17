import { V_0_3_1 as Current } from './persistence-v0.3.1';

export type BasePersistentData = {
  version: string;
};

export type BaseEntity = {
  id: string;
};

export type GearEntity = Current.GearEntity;
export type OptimizationProfileEntity = Current.OptimizationProfileEntity;
export type HeroEntity = Current.HeroEntity;
export type PersistentData = Current.PersistentData;
export type PersistentDataKey = Current.PersistentDataKey;
