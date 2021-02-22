import { V_0_4_0 as Current } from './persistence-v0.4.0';

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
