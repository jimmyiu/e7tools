import { Gear, HeroAbility } from '@/models';
import { noop } from 'vue-class-component/lib/util';

type Filter = (it: Gear.Gear) => boolean;
const noopFilter: Filter = (it: Gear.Gear) => true;

// TODO: refactor hero id
export function filter(
  gears: Gear.Gear[],
  filter: Gear.GearFilter,
  params: { heroId: string; heroAbility: HeroAbility }
) {
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
  let locked = noopFilter;
  if (!filter.locked) {
    locked = (it: Gear.Gear) => !it.locked;
  }
  let equiped = noopFilter;
  if (!filter.equipped) {
    if (params.heroId) {
      equiped = (it: Gear.Gear) => it.equippedHero == '' || it.equippedHero == params.heroId;
    } else {
      equiped = (it: Gear.Gear) => it.equippedHero == '';
    }
  }
  let score = noopFilter;
  if (filter.score > 0) {
    score = (it: Gear.Gear) => it.score >= filter.score;
  }
  return gears.filter(it => {
    return locked(it) && equiped(it) && set(it) && enhance(it) && necklace(it) && ring(it) && boot(it) && score(it);
  });
}

export function createGearStore(
  gears: Gear.Gear[],
  filterCondition: Gear.GearFilter,
  params: { heroId: string; heroAbility: HeroAbility }
) {
  const store = new Gear.GearStore(filter(gears, filterCondition, params));
  if (filterCondition.rating.threshold < 100 && params.heroId) {
    console.log(`createGearStore::threshold = ${filterCondition.rating.threshold}`);
    [Gear.Type.Weapon, Gear.Type.Helmet, Gear.Type.Armor, Gear.Type.Necklace, Gear.Type.Ring, Gear.Type.Boot].forEach(
      type => {
        const foo = store.getGearsByType(type);
        const removeCount = Math.trunc(foo.length * (1 - filterCondition.rating.threshold / 100));
        console.log(
          `createGearStore::type = ${type}, original length = ${foo.length} will be removed ${removeCount} items`
        );
        if (removeCount > 0) {
          foo.sort((a, b) =>
            calculateRating(a, filterCondition.rating.point, params.heroAbility) >
              calculateRating(b, filterCondition.rating.point, params.heroAbility)
              ? -1
              : 1
          );
          foo.splice(foo.length - removeCount, removeCount);
        }
        console.log(`createGearStore::new size = ${foo.length}`);
      }
    );
  }
  return store;
}

function calculateRating(gear: Gear.Gear, points: HeroAbility, ability: HeroAbility) {
  let result = 0;
  result += points.hp * (gear.hpp ?? 0) + (gear.hp ?? 0) / ability.hp;
  result += points.def * (gear.defp ?? 0) + (gear.def ?? 0) / ability.def;
  result += points.atk * (gear.atkp ?? 0) + (gear.atk ?? 0) / ability.atk;
  result += points.cri * (gear.cri ?? 0) * 1.6;
  result += (points.cdmg * (gear.cdmg ?? 0) * 8) / 7;
  result += points.spd * (gear.spd ?? 0) * 2;
  result += points.eff * (gear.eff ?? 0);
  result += points.res * (gear.res ?? 0);
  return Math.round(result * 10) / 10;
}
