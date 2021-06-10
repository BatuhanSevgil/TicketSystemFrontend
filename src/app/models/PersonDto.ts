export class PersonDto {
  public personId: number;
  public realName: string;
  public authTime: Date;
  public authExpireTime: Date;
  public departments: Array<number>;
}
