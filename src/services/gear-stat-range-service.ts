import { Gear } from '@/models/gear';

// class GearStatRangeService {
export function getMain(type: Gear.Type, stat: Gear.Stat, level: number, enhance: number) {
  if (type == Gear.Type.Weapon) {
    return getWeaponMain(level, enhance);
  } else if (type == Gear.Type.Helmet) {
    return getHelmetMain(level, enhance);
  } else if (type == Gear.Type.Armor) {
    return getArmorMain(level, enhance);
  } else if (stat != undefined) {
    return getRightMain(stat, level, enhance);
  }
  return 0;
}

function getRightMain(stat: Gear.Stat, level: number, enhance: number) {
  if (level >= 75 && level <= 85) {
    if (stat.value == Gear.Stat.CDMG.value) {
      return [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 65][enhance - 1];
    } else if (stat.value == Gear.Stat.CRI.value) {
      return [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 55][enhance - 1];
    } else if (stat.value == Gear.Stat.SPD.value) {
      return [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 40][enhance - 1];
    } else if (stat.value == Gear.Stat.HP.value) {
      return [0, 0, 0, 0, 0, 0, 0, 0, 1512, 0, 0, 1944, 0, 0, 2700][enhance - 1];
    } else if (stat.value == Gear.Stat.DEF.value) {
      return [0, 0, 0, 0, 0, 0, 0, 0, 168, 0, 0, 0, 0, 0, 300][enhance - 1];
    }
    return [0, 0, 0, 0, 0, 0, 0, 0, 34, 0, 0, 43, 0, 0, 60][enhance - 1];
  } else if (level == 90) {
    if (stat.value == Gear.Stat.CDMG.value) {
      return [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 70][enhance - 1];
    } else if (stat.value == Gear.Stat.SPD.value) {
      return [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 45][enhance - 1];
    } else if (stat.value == Gear.Stat.ATK.value) {
      return [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 525][enhance - 1];
    } else if (stat.value == Gear.Stat.HP.value) {
      return [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2835][enhance - 1];
    } else if (stat.value == Gear.Stat.DEF.value) {
      return [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 310][enhance - 1];
    }
    return [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 65][enhance - 1];
  } else if (level == 88) {
    if (stat.value == Gear.Stat.CDMG.value) {
      return [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 70][enhance - 1];
    } else if (stat.value == Gear.Stat.SPD.value) {
      return [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 45][enhance - 1];
    } else if (stat.value == Gear.Stat.ATK.value) {
      return [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 525][enhance - 1];
    }
    return [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 65][enhance - 1];
  } else if (level < 75) {
    if (stat.value == Gear.Stat.CDMG.value) {
      return [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 55][enhance - 1];
    } else if (stat.value == Gear.Stat.SPD.value) {
      return [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 35][enhance - 1];
    } else if (stat.value == Gear.Stat.CRI.value) {
      return [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 45][enhance - 1];
    }
    return [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 50][enhance - 1];
  }
  return 0;
}

function getWeaponMain(level: number, enhance: number) {
  if (level == 90) {
    return [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 525][enhance - 1];
  } else if (level == 88) {
    return [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 515][enhance - 1];
  } else if (level == 85) {
    return [0, 0, 0, 0, 0, 0, 0, 0, 280, 0, 0, 0, 0, 0, 500][enhance - 1];
  } else if (level == 78) {
    return [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 475][enhance - 1];
  } else if (level == 75) {
    return [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 465][enhance - 1];
  } else if (level == 70) {
    return [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 440][enhance - 1];
  }
  return 0;
}

function getHelmetMain(level: number, enhance: number) {
  if (level == 90) {
    return [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2835][enhance - 1];
  } else if (level == 88) {
    return [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2765][enhance - 1];
  } else if (level == 85) {
    return [0, 0, 0, 0, 0, 0, 0, 0, 1512, 0, 0, 1944, 0, 0, 2700][enhance - 1];
  } else if (level == 78) {
    return [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2565][enhance - 1];
  } else if (level == 75) {
    return [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2495][enhance - 1];
  } else if (level == 70) {
    return [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2360][enhance - 1];
  }
  return 0;
}

function getArmorMain(level: number, enhance: number) {
  if (level == 90) {
    return [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 310][enhance - 1];
  } else if (level == 88) {
    return [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 310][enhance - 1];
  } else if (level == 85) {
    return [0, 0, 0, 0, 0, 132, 144, 0, 168, 0, 0, 216, 0, 252, 300][enhance - 1];
  } else if (level == 78) {
    return [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 285][enhance - 1];
  } else if (level == 75) {
    return [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 275][enhance - 1];
  } else if (level == 70) {
    return [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 260][enhance - 1];
  }
  return 0;
}
// export default new GearStatRangeService();
