import { Gear } from '@/models';

type Filter = (it: Gear.Gear) => boolean;

class GearFilterService {
  private noopFilter: Filter = (it: Gear.Gear) => true;

  public filter(gears: Gear.Gear[], filter: Gear.GearFilter) {
    type Filter = (it: Gear.Gear) => boolean;
    // console.log('filter::filter =', filter);

    // prepare set filter
    let set = this.noopFilter;
    if (filter.sets.length > 0) {
      set = (it: Gear.Gear) => filter.sets.indexOf(it.set!) >= 0;
    }
    // prepare enhance filter
    let enhance = this.noopFilter;
    if (filter.enhanceMode == Gear.EnhanceModeFilter.LESS_THAN_15) {
      enhance = (it: Gear.Gear) => it.enhance! < 15;
    } else if (filter.enhanceMode == Gear.EnhanceModeFilter.ONLY_15) {
      enhance = (it: Gear.Gear) => it.enhance! == 15;
    }
    let necklace = this.noopFilter;
    if (filter.necklaces.length > 0) {
      const necklaceValues = filter.necklaces.map(x => x.value);
      necklace = (it: Gear.Gear) => it.type! != Gear.Type.Necklace || necklaceValues.indexOf(it.main!.value) >= 0;
    }
    let ring = this.noopFilter;
    if (filter.rings.length > 0) {
      const ringValues = filter.rings.map(x => x.value);
      ring = (it: Gear.Gear) => it.type! != Gear.Type.Ring || ringValues.indexOf(it.main!.value) >= 0;
    }
    let boot = this.noopFilter;
    if (filter.boots.length > 0) {
      const bootValues = filter.boots.map(x => x.value);
      boot = (it: Gear.Gear) => it.type! != Gear.Type.Boot || bootValues.indexOf(it.main!.value) >= 0;
    }
    let locked = this.noopFilter;
    if (!filter.locked) {
      locked = (it: Gear.Gear) => !it.locked;
    }
    let equiped = this.noopFilter;
    if (!filter.equipped) {
      equiped = (it: Gear.Gear) => it.equippedHero == '';
    }
    return gears.filter(it => {
      return locked(it) && equiped(it) && set(it) && enhance(it) && necklace(it) && ring(it) && boot(it);
    });
  }
}

export default new GearFilterService();
