import { BasePersistentData, PersistentData } from '@/models/persistence';
import { V_0_4_0 } from '@/models/persistence/persistence-v0.4.0';
import { V_0_5_0 } from '@/models/persistence/persistence-v0.5.0';
import { ConstantService } from '..';
import { DataConverter } from './data-converter';

export class DataConverter_0_5_0 implements DataConverter {
  convert(data: BasePersistentData): BasePersistentData {
    console.log(data);
    const pastData = data as V_0_4_0.PersistentData;
    const result: V_0_5_0.PersistentData = {
      version: '0.5.0',
      gears: pastData.gears,
      profiles: this.convertProfiles(pastData.profiles),
      heros: this.convertHeros(pastData.heros, pastData.profiles)
    };
    console.log('convert::result =', result);
    return result;
  }

  private convertProfiles(profiles: V_0_4_0.OptimizationProfileEntity[]): V_0_5_0.OptimizationProfileEntity[] {
    const result: V_0_5_0.OptimizationProfileEntity[] = [];
    for (let i = 0; i < profiles.length; i++) {
      const past: V_0_4_0.OptimizationProfileEntity = profiles[i];
      result.push({
        id: past.id,
        hero: {
          id: past.hero.id
        },
        stat: past.stat,
        filter: {
          sets: past.filter.sets,
          necklaces: past.filter.necklaces,
          rings: past.filter.rings,
          boots: past.filter.boots,
          maxSize: past.filter.rating.threshold < 100 ? past.filter.rating.minSize : 0,
          enhanceMode: past.filter.enhanceMode,
          equippedMode: past.filter.equipped ? 0 : 3
        },
        evaluation: past.evaluation
      });
    }
    return result;
  }

  private convertHeros(
    heros: V_0_4_0.HeroEntity[],
    profiles: V_0_4_0.OptimizationProfileEntity[]
  ): V_0_5_0.HeroEntity[] {
    const result: V_0_5_0.HeroEntity[] = [];
    for (let i = 0; i < heros.length; i++) {
      const past: V_0_4_0.HeroEntity = heros[i];
      const profile = this.findProfile(profiles, past.id);
      result.push({
        ...past,
        tier: 0,
        bonusAbility: profile ? profile.hero.bonusAbility : {},
        abilityRating: profile ? profile.filter.rating.point : ConstantService.emptyHeroAbility()
      });
    }
    return result;
  }

  private findProfile(profiles: V_0_4_0.OptimizationProfileEntity[], heroId: string) {
    return profiles.find(x => x.hero.id == heroId);
  }
}
