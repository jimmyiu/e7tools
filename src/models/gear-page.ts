import { ObjectUtils } from '@/services';
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

export type GearActionCardModel = {
  filter: GearPageFilter;
  gearId: string;
};

export const emptyGearStatFilter: () => GearStatFilter = () => {
  return {
    hpp: undefined,
    hp: undefined,
    defp: undefined,
    def: undefined,
    atkp: undefined,
    atk: undefined,
    cri: undefined,
    cdmg: undefined,
    spd: undefined,
    eff: undefined,
    res: undefined,
    score: undefined,
    defScore: undefined,
    offScore: undefined
  };
};

export const emptyGearPageFilter: () => GearPageFilter = () => {
  return {
    type: undefined,
    sets: [],
    levelMode: Gear.LevelFilterMode.ALL,
    enhanceMode: Gear.EnhanceModeFilter.ALL,
    equippedMode: FilterMode.ALL,
    applyToMain: false,
    minStat: emptyGearStatFilter(),
    sortingColumn: 'level',
    sortingOrder: SortingOrder.DESCENDING
  };
};

// (to: GearPageFilter, from: GearPageFilter) => void
export const assignGearPageFilter = (to: GearPageFilter, from: GearPageFilter) => {
  to.type = from.type;
  to.sets.splice(0, to.sets.length, ...from.sets);
  to.levelMode = from.levelMode;
  to.enhanceMode = from.enhanceMode;
  to.equippedMode = from.equippedMode;
  to.applyToMain = from.applyToMain;
  assignGearStatFilter(to.minStat, from.minStat);
  to.sortingColumn = from.sortingColumn;
  to.sortingOrder = from.sortingOrder;
};

export const assignGearStatFilter = (to: GearStatFilter, from: GearStatFilter) => {
  ObjectUtils.assignGearAbility(to, from);
  to.score = from.score;
  to.offScore = from.offScore;
  to.defScore = from.defScore;
};
