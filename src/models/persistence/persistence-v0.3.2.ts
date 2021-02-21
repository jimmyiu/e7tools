import { BasePersistentData, BaseEntity } from '.';
import { HeroAbility, Range } from '@/models/common';
export namespace V_0_3_2 {
  export type PersistentData = BasePersistentData & {
    gears: GearEntity[];
    profiles: OptimizationProfileEntity[];
    heros: HeroEntity[];
  };
  export type PersistentDataKey = keyof Omit<PersistentData, keyof BasePersistentData>;

  export type HeroEntity = BaseEntity &
    HeroAbility & {
      name: string;
      icon: string;
      rarity: number;
      attribute: string;
      role: string;
    };

  export type GearEntity = BaseEntity & {
    type: string;
    set: string;
    level: number;
    enhance: number;
    //
    hpp?: number;
    hp?: number;
    defp?: number;
    def?: number;
    atkp?: number;
    atk?: number;
    cri?: number;
    cdmg?: number;
    spd?: number;
    eff?: number;
    res?: number;
    // v0.2.0
    locked: boolean;
    equippedHero: string;
    // v0.2.1
    grade: string;
    main: string;
  };

  export type OptimizationProfileEntity = BaseEntity & {
    heroId: string;
    filter: {
      sets: string[];
      enhanceMode: number;
      necklaces: string[];
      rings: string[];
      boots: string[];
      locked: boolean;
      equipped: boolean;
      score: number;
    };
    stat: {
      hp: Range;
      def: Range;
      atk: Range;
      cri: Range;
      cdmg: Range;
      spd: Range;
      eff: Range;
      res: Range;
      ehp: Range;
      damage: Range;
    };
    combination: {
      forcedSets: string[];
      limit: number;
      brokenSet: boolean;
    };
  };

  // export type SettingEntity = BaseEntity & {
  //   optimizationCalculationLimit: number;
  //   optimizationResultLimit: number;
  // };
}
