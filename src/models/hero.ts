export class Hero {
  public constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly icon: string,
    public readonly hp: number,
    public readonly def: number,
    public readonly atk: number,
    public readonly cri: number,
    public readonly cdmg: number,
    public readonly spd: number,
    public readonly eff: number,
    public readonly res: number
  ) { }
}
