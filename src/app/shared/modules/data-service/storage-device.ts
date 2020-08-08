export class StorageDevice {
  public id: number;
  public name: string;
  public active: boolean;
  public isPrimary: boolean;
  public uuid: string;
  public devicePath: string;
  public mountPoint: string;
  public type: string;
  public fsType: string;
  public label: string;
  public size: number;
  public used: number;
  public available: number;
  public usedPercent: number;
  public parentDrive: string;
}
