import { Gear } from '@/models/gear';
import Stat = Gear.Stat;
const STAT_AVERAGE = {
  atk: 1060,
  hp: 5558,
  spd: 108,
  def: 611
};
class GearService {
  applyFilter(gears: Gear.Gear[], filter: Gear.GearFilter) {
    type Filter = (it: Gear.Gear) => boolean;
    const defaultFilter: Filter = (it: Gear.Gear) => true;
    // prepare set filter
    let set = defaultFilter;
    if (filter.sets.length > 0) {
      set = (it: Gear.Gear) => filter.sets.indexOf(it.set!) >= 0;
    }
    // prepare enhance filter
    let enhance = defaultFilter;
    if (filter.enhanceMode == Gear.EnhanceModeFilter.LESS_THAN_15) {
      enhance = (it: Gear.Gear) => it.enhance! < 15;
    } else if (filter.enhanceMode == Gear.EnhanceModeFilter.ONLY_15) {
      enhance = (it: Gear.Gear) => it.enhance! == 15;
    }
    let necklace = defaultFilter;
    if (filter.necklaces.length > 0) {
      const necklaceValues = filter.necklaces.map(x => x.value);
      necklace = (it: Gear.Gear) => it.type! != Gear.Type.Necklace || necklaceValues.indexOf(it.main!.value) >= 0;
    }
    let ring = defaultFilter;
    if (filter.rings.length > 0) {
      const ringValues = filter.rings.map(x => x.value);
      ring = (it: Gear.Gear) => it.type! != Gear.Type.Ring || ringValues.indexOf(it.main!.value) >= 0;
    }
    let boot = defaultFilter;
    if (filter.boots.length > 0) {
      const bootValues = filter.boots.map(x => x.value);
      boot = (it: Gear.Gear) => it.type! != Gear.Type.Boot || bootValues.indexOf(it.main!.value) >= 0;
    }
    return gears.filter(it => {
      return set(it) && enhance(it) && necklace(it) && ring(it) && boot(it);
    });
  }
  mergeGears(original: Gear.Gear[], extra: Gear.Gear[]) {
    let map = new Map<String, Gear.Gear>();
    if (original) {
      original.forEach(it => map.set(it.id, it));
    }
    if (extra) {
      extra.forEach(it => map.set(it.id, it));
    }
    return Array.from(map.values());
  }

  assignScore(gear: Gear.Gear) {
    gear.score = this.calculateScore(gear);
    gear.offScore = this.calculateOffScore(gear);
    gear.defScore = this.calculateDefScore(gear);
  }

  calculateScore(gear: Gear.Gear) {
    let stats = gear.getStatMap();
    stats.delete(gear.main!!);
    let score = 0;
    stats.forEach((v: number | undefined, k: Stat) => {
      if ([Stat.HPP, Stat.DEFP, Stat.ATKP, Stat.CDMG, Stat.EFF, Stat.RES].includes(k)) {
        score += v || 0;
      } else if (Stat.CRI == k) {
        score += (v || 0) * 1.5;
      } else if (Stat.SPD == k) {
        score += (v || 0) * 2;
      } else if (Stat.HP == k) {
        score += Math.trunc(((v || 0) / STAT_AVERAGE.hp) * 100);
      } else if (Stat.DEF == k) {
        score += Math.trunc(((v || 0) / STAT_AVERAGE.def) * 100);
      } else if (Stat.ATK == k) {
        score += Math.trunc(((v || 0) / STAT_AVERAGE.atk) * 100);
      }
    });
    return score;
  }

  calculateDefScore(gear: Gear.Gear) {
    let stats = gear.getStatMap();
    stats.delete(gear.main!!);
    let score = 0;
    stats.forEach((v: number | undefined, k: Stat) => {
      if ([Stat.HPP, Stat.DEFP].includes(k)) {
        score += v || 0;
        // } else if (Stat.SPD == k) {
        //   score += (v || 0) * 2;
      } else if (Stat.HP == k) {
        score += Math.trunc(((v || 0) / STAT_AVERAGE.hp) * 100);
      } else if (Stat.DEF == k) {
        score += Math.trunc(((v || 0) / STAT_AVERAGE.def) * 100);
      }
    });
    return score;
  }
  calculateOffScore(gear: Gear.Gear) {
    let stats = gear.getStatMap();
    stats.delete(gear.main!!);
    let score = 0;
    stats.forEach((v: number | undefined, k: Stat) => {
      if ([Stat.ATKP, Stat.CDMG].includes(k)) {
        score += v || 0;
      } else if (Stat.CRI == k) {
        score += (v || 0) * 1.5;
      } else if (Stat.ATK == k) {
        score += Math.trunc(((v || 0) / STAT_AVERAGE.atk) * 100);
      }
    });
    return score;
  }

  calculateStatistics(gears: Gear.Gear[]) {
    let max = new Map<String, Array<number>>();
    max.set('score', []);
    max.set('offScore', []);
    max.set('defScore', []);
    Object.values(Gear.Stat).forEach((stat: Gear.Stat) => {
      max.set(stat.value, []);
    });

    if (gears && gears.length > 0) {
      gears.forEach((gear: Gear.Gear) => {
        for (const [key, value] of gear.getStatMap().entries()) {
          if (gear.main != key && value && value > 0) {
            max.get(key.value)!!.push(value);
          }
        }
        for (const [key, value] of gear.getScoreMap().entries()) {
          max.get(key)!!.push(value);
        }
      });
    }

    for (const key of max.keys()) {
      max.get(key)!!.sort((a, b) => b - a);
    }

    return {
      hpp: this.analysis(max.get('hpp')!!),
      hp: this.analysis(max.get('hp')!!),
      defp: this.analysis(max.get('defp')!!),
      def: this.analysis(max.get('def')!!),
      atkp: this.analysis(max.get('atkp')!!),
      atk: this.analysis(max.get('atk')!!),
      cri: this.analysis(max.get('cri')!!),
      cdmg: this.analysis(max.get('cdmg')!!),
      spd: this.analysis(max.get('spd')!!),
      eff: this.analysis(max.get('eff')!!),
      res: this.analysis(max.get('res')!!),
      score: this.analysis(max.get('score')!!),
      offScore: this.analysis(max.get('offScore')!!),
      defScore: this.analysis(max.get('defScore')!!)
    };
  }

  analysis(values: number[]) {
    if (values && values.length > 0) {
      return {
        max: values[0],
        third: values[Math.trunc(values.length * 0.25)]
      };
    }
    return {
      max: 0,
      third: 0
    };
  }
}
export default new GearService();
