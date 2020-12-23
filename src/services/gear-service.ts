import { Gear } from '@/models/gear';
import Stat = Gear.Stat;

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
      }
    });
    return score;
  }
}
export default new GearService();
