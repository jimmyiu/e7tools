import { Gear, FilterMode } from '.';
import { GearAbility, SortingOrder } from './common';

export type GearStatFilter = GearAbility & {
  score?: number;
  offScore?: number;
  defScore?: number;
};

export type SortingColumn = keyof GearStatFilter | 'level';

export type GearPageFilter = {
  sets: Gear.Set[];
  type?: Gear.Type;
  levelMode: Gear.LevelFilterMode;
  enhanceMode: Gear.EnhanceModeFilter;
  equippedMode: FilterMode;
  // stat section
  applyToMain: boolean;
  minStat: GearStatFilter;
  sortingColumn?: SortingColumn;
  sortingOrder: SortingOrder;
};
