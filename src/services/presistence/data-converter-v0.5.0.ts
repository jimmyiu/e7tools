import { BasePersistentData, PersistentData } from '@/models/persistence';
import { V_0_4_0 } from '@/models/persistence/persistence-v0.4.0';
import { V_0_5_0 } from '@/models/persistence/persistence-v0.5.0';
import { DataConverter } from './data-converter';

export class DataConverter_0_5_0 implements DataConverter {
  convert(data: BasePersistentData): BasePersistentData {
    console.log(data);
    const pastData = data as V_0_4_0.PersistentData;
    const result: V_0_5_0.PersistentData = {
      version: '0.5.0',
      gears: pastData.gears,
      profiles: pastData.profiles,
      heros: this.convertHeros(pastData.heros, pastData.profiles)
    };
    console.log('convert::result =', result);
    return result;
  }

  private findProfile(profiles: V_0_4_0.OptimizationProfileEntity[], heroId: string) {
    return profiles.find(x => x.hero.id == heroId);
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
        abilityRating: profile
          ? profile.filter.rating.point
          : {
            hp: 1,
            def: 1,
            atk: 1,
            cri: 1,
            cdmg: 1,
            spd: 1,
            eff: 1,
            res: 1
          }
      });
    }
    return result;
  }
}
