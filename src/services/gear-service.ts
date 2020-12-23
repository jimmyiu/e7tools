import { Gear } from '@/models/gear';

// // import { GearType, GearSet } from '@/models';

// function getGearSetImgUrl(set: GearSet) {
//   return require(`@/assets/img/gear/set/${set.toLowerCase()}.png`);
// }

// function getGearTypeImgUrl(type: GearType) {
//   return require(`@/assets/img/gear/${type.toLowerCase()}.png`);
// }

// // export default GearService;

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
}
export default new GearService();
