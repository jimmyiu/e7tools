import { HeroAbility } from '@/models';
import { Gear } from '@/models/gear';
import Stat = Gear.Stat;
const STAT_AVERAGE: HeroAbility = {
  hp: 5610,
  def: 623,
  atk: 1077,
  cri: 0,
  cdmg: 0,
  spd: 0,
  eff: 0,
  res: 0
};

export function mergeGears(original: Gear.Gear[], extra: Gear.Gear[]) {
  let map = new Map<String, Gear.Gear>();
  if (original) {
    original.forEach(it => map.set(it.id, it));
  }
  if (extra) {
    extra.forEach(it => map.set(it.id, it));
  }
  return Array.from(map.values());
}

export function calculateScores(hero: HeroAbility, gear: Gear.Gear): Gear.GearScore {
  return {
    score: calculateScore(hero, gear),
    offScore: calculateOffScore(hero, gear),
    defScore: calculateDefScore(hero, gear)
  };
}

export function assignScore(gear: Gear.Gear) {
  gear.score = calculateScore(STAT_AVERAGE, gear);
  gear.offScore = calculateOffScore(STAT_AVERAGE, gear);
  gear.defScore = calculateDefScore(STAT_AVERAGE, gear);
}

function determineScore(hero: HeroAbility, stat: Gear.Stat, value?: number) {
  if (value == undefined) {
    return 0;
  }
  if ([Stat.HPP, Stat.DEFP, Stat.ATKP, Stat.EFF, Stat.RES].includes(stat)) {
    return value;
  } else if (Stat.CRI == stat) {
    return (value * 16) / 10;
  } else if (Stat.SPD == stat) {
    return value * 2;
  } else if (Stat.CDMG == stat) {
    return value * (8 / 7);
  } else if (Stat.HP == stat) {
    return Math.round((value / hero.hp) * 1000) / 10;
  } else if (Stat.DEF == stat) {
    return Math.round((value / hero.def) * 1000) / 10;
  } else if (Stat.ATK == stat) {
    return Math.round((value / hero.atk) * 1000) / 10;
  }
  return 0;
}

function calculateScore(hero: HeroAbility, gear: Gear.Gear) {
  let stats = gear.getStatMap();
  stats.delete(gear.main!!);
  let score = 0;
  stats.forEach((value: number | undefined, stat: Stat) => {
    score += determineScore(hero, stat, value);
  });
  return Math.round(score * 10) / 10;
}

function calculateDefScore(hero: HeroAbility, gear: Gear.Gear) {
  let stats = gear.getStatMap();
  stats.delete(gear.main!!);
  let score = 0;
  stats.forEach((v: number | undefined, k: Stat) => {
    if ([Stat.HPP, Stat.HP, Stat.DEFP, Stat.DEF, Stat.SPD, Stat.RES].includes(k)) {
      score += determineScore(hero, k, v);
    }
  });
  return Math.round(score * 10) / 10;
}
function calculateOffScore(hero: HeroAbility, gear: Gear.Gear) {
  let stats = gear.getStatMap();
  stats.delete(gear.main!!);
  let score = 0;
  stats.forEach((v: number | undefined, k: Stat) => {
    if ([Stat.ATKP, Stat.ATK, Stat.CRI, Stat.CDMG, Stat.SPD, Stat.EFF].includes(k)) {
      score += determineScore(hero, k, v);
    }
  });
  return Math.round(score * 10) / 10;
}

export function calculateSuitRating(equippedHero: HeroAbility, hero: HeroAbility, rating: HeroAbility) {
  let score = 0;
  if (rating && equippedHero && hero) {
    score += (equippedHero.hp / hero.hp - 1) * 100 * rating.hp;
    score += (equippedHero.def / hero.def - 1) * 100 * rating.def;
    score += (equippedHero.atk / hero.atk - 1) * 100 * rating.atk;
    score += (Math.min(equippedHero.cri, 100) - hero.cri) * 1.6 * rating.cri;
    score += (Math.min(equippedHero.cdmg, 350) - hero.cdmg) * (8 / 7) * rating.cdmg;
    score += (equippedHero.spd - hero.spd) * 2 * rating.spd;
    score += (equippedHero.eff - hero.eff) * rating.eff;
    score += (equippedHero.res - hero.res) * rating.res;
  }
  return Math.round(10 * score) / 10;
}

export function calculateStatistics(gears: Gear.Gear[]) {
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
    hpp: analysis(max.get('hpp')!!),
    hp: analysis(max.get('hp')!!),
    defp: analysis(max.get('defp')!!),
    def: analysis(max.get('def')!!),
    atkp: analysis(max.get('atkp')!!),
    atk: analysis(max.get('atk')!!),
    cri: analysis(max.get('cri')!!),
    cdmg: analysis(max.get('cdmg')!!),
    spd: analysis(max.get('spd')!!),
    eff: analysis(max.get('eff')!!),
    res: analysis(max.get('res')!!),
    score: analysis(max.get('score')!!),
    offScore: analysis(max.get('offScore')!!),
    defScore: analysis(max.get('defScore')!!)
  };
}

function analysis(values: number[]) {
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
// }
// export default new GearService();
