import { Hero } from '@/models';
import axios from 'axios';

class E7dbDataHandler {
  async retrieveHeros(): Promise<Array<Hero>> {
    console.log('retrieveHeros::start');
    let result: Hero[] = [];
    let response = await axios.get('https://api.epicsevendb.com/hero');

    let heros: any[] = response.data.results.filter((x: any) => !['raqueas', 'straze', 'rande'].includes(x._id));
    // let heros: any[] = response.data.results.filter((x: any) => ['alencia', 'bellona', 'cerise'].includes(x._id));
    return await Promise.all(
      heros.map(async x => {
        return this.createE7dbHero(x, await this.retrieveHero(x._id));
      })
    );
  }

  async retrieveHero(id: string): Promise<Hero> {
    const response = await axios.get(`https://api.epicsevendb.com/hero/${id}`);
    // console.log('retrieveHero::detail =', response.data.results[0]);
    return response.data.results[0];
  }

  createE7dbHero(overview: any, detail: any): Hero {
    return {
      id: overview._id,
      name: overview.name,
      icon: overview.assets.icon,
      rarity: detail.rarity,
      attribute: detail.attribute,
      role: detail.role,
      hp: detail.calculatedStatus.lv60SixStarFullyAwakened.hp,
      def: detail.calculatedStatus.lv60SixStarFullyAwakened.def,
      atk: detail.calculatedStatus.lv60SixStarFullyAwakened.atk,
      // cri: detail.calculatedStatus.lv60SixStarFullyAwakened.chc,
      // cdmg: detail.calculatedStatus.lv60SixStarFullyAwakened.chd,
      cri: Math.trunc(detail.calculatedStatus.lv60SixStarFullyAwakened.chc * 100),
      cdmg: Math.trunc(detail.calculatedStatus.lv60SixStarFullyAwakened.chd * 100),
      spd: detail.calculatedStatus.lv60SixStarFullyAwakened.spd,
      // eff: detail.calculatedStatus.lv60SixStarFullyAwakened.eff,
      // res: detail.calculatedStatus.lv60SixStarFullyAwakened.efr
      eff: Math.trunc(detail.calculatedStatus.lv60SixStarFullyAwakened.eff * 100),
      res: Math.trunc(detail.calculatedStatus.lv60SixStarFullyAwakened.efr * 100)
    };
  }
}

export default new E7dbDataHandler();
