import { Gear } from '@/models/gear';
import Stat = Gear.Stat;
const STAT_AVERAGE = {
  atk: 1060,
  hp: 5558,
  spd: 108,
  def: 611
};
class GearService {
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
      if ([Stat.HPP, Stat.DEFP, Stat.RES].includes(k)) {
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
        // } else if (Stat.SPD == k) {
        //   score += (v || 0) * 2;
      } else if (Stat.ATK == k) {
        score += Math.trunc(((v || 0) / STAT_AVERAGE.atk) * 100);
      }
    });
    return score;
  }
}
export default new GearService();
