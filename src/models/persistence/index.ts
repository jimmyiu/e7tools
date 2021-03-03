import { V_0_5_0 as Current } from './persistence-v0.5.0';

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
