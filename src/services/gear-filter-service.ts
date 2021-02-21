import { Gear } from '@/models';
import { noop } from 'vue-class-component/lib/util';

type Filter = (it: Gear.Gear) => boolean;
const noopFilter: Filter = (it: Gear.Gear) => true;

// TODO: refactor hero id
export function filter(gears: Gear.Gear[], filter: Gear.GearFilter, params: { heroId: string }) {
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
