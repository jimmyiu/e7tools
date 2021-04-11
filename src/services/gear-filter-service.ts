import { Gear, Hero } from '@/models';
import { OptimizationFilter, OptimizationFilterEquippedMode } from '@/models/optimizer';
import { HeroService } from '.';

type Filter = (it: Gear.Gear) => boolean;
const noopFilter: Filter = (it: Gear.Gear) => true;

// TODO: refactor hero id
function filter(gears: Gear.Gear[], filter: OptimizationFilter, params: { hero: Hero; heros: Hero[] }) {
  type Filter = (it: Gear.Gear) => boolean;
  // console.log('filter::filter =', filter);

  // prepare set filter
  let set = noopFilter;
  if (filter.sets.length > 0) {
    set = (it: Gear.Gear) => filter.sets.indexOf(it.set!) >= 0;
  }
  // prepare enhance filter
  let enhance = noopFilter;
  if (filter.enhanceMode == Gear.EnhanceModeFilter.LESS_THAN_15) {
    enhance = (it: Gear.Gear) => it.enhance! < 15;
  } else if (filter.enhanceMode == Gear.EnhanceModeFilter.ONLY_15) {
    enhance = (it: Gear.Gear) => it.enhance! == 15;
  }
  let necklace = noopFilter;
  if (filter.necklaces.length > 0) {
    const necklaceValues = filter.necklaces.map(x => x.value);
    necklace = (it: Gear.Gear) => it.type! != Gear.Type.Necklace || necklaceValues.indexOf(it.main!.value) >= 0;
  }
  let ring = noopFilter;
  if (filter.rings.length > 0) {
    const ringValues = filter.rings.map(x => x.value);
    ring = (it: Gear.Gear) => it.type! != Gear.Type.Ring || ringValues.indexOf(it.main!.value) >= 0;
  }
  let boot = noopFilter;
  if (filter.boots.length > 0) {
    const bootValues = filter.boots.map(x => x.value);
    boot = (it: Gear.Gear) => it.type! != Gear.Type.Boot || bootValues.indexOf(it.main!.value) >= 0;
  }
  let equiped = noopFilter;
  if (filter.equippedMode) {
    const getGearOrder = (gear: Gear.Gear) => {
      if (gear.equippedHero) {
        const hero = params.heros.find(x => x.id == gear.equippedHero);
        return hero ? hero.order : 0;
      }
      return 0;
    };
    if (filter.equippedMode == OptimizationFilterEquippedMode.NONE) {
      equiped = (it: Gear.Gear) => it.equippedHero == '' || it.equippedHero == params.hero.id;
    } else if (filter.equippedMode == OptimizationFilterEquippedMode.LOWER_ORDER) {
      equiped = (it: Gear.Gear) => {
        const order = getGearOrder(it);
        return (
          it.equippedHero == '' ||
          it.equippedHero == params.hero.id ||
          order == 0 ||
          (params.hero.order > 0 && order > params.hero.order)
        );
      };
    }
  }
  return gears.filter(it => {
    return equiped(it) && set(it) && enhance(it) && necklace(it) && ring(it) && boot(it);
  });
}

export function createGearStore(
  gears: Gear.Gear[],
  filterCondition: OptimizationFilter,
  params: { hero: Hero; heros: Hero[] }
) {
  const store = new Gear.GearStore(filter(gears, filterCondition, params));
  if (filterCondition.maxSize > 0 && params.hero) {
    console.log(`createGearStore::maxSize = ${filterCondition.maxSize}, heroId = ${params.hero.id}`);
    [Gear.Type.Weapon, Gear.Type.Helmet, Gear.Type.Armor, Gear.Type.Necklace, Gear.Type.Ring, Gear.Type.Boot].forEach(
      type => {
        const foo = store.getGearsByType(type);
        let removeCount = foo.length <= filterCondition.maxSize ? 0 : foo.length - filterCondition.maxSize;
        console.log(
          `createGearStore::type = ${type}, original length = ${foo.length} will be removed ${removeCount} items`
        );
        if (removeCount > 0) {
          foo.sort((a, b) => (calculateRating(a, params.hero!) > calculateRating(b, params.hero!) ? -1 : 1));
          foo.splice(foo.length - removeCount, removeCount);
        }
        console.log(`createGearStore::new size = ${foo.length}`);
      }
    );
  }
  return store;
}

function calculateRating(gear: Gear.Gear, hero: Hero) {
  let result = 0;
  result += hero.abilityRating.hp * (gear.hpp ?? 0) + (gear.hp ?? 0) / hero.hp;
  result += hero.abilityRating.def * (gear.defp ?? 0) + (gear.def ?? 0) / hero.def;
  result += hero.abilityRating.atk * (gear.atkp ?? 0) + (gear.atk ?? 0) / hero.atk;
  result += hero.abilityRating.cri * (gear.cri ?? 0) * 1.6;
  result += (hero.abilityRating.cdmg * (gear.cdmg ?? 0) * 8) / 7;
  result += hero.abilityRating.spd * (gear.spd ?? 0) * 2;
  result += hero.abilityRating.eff * (gear.eff ?? 0);
  result += hero.abilityRating.res * (gear.res ?? 0);
  return Math.round(result * 10) / 10;
}
