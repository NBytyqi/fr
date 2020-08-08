import { Validate, IsNotEmpty, Min, Max, IsOptional } from 'class-validator';
import { plainToClassFromExist } from 'class-transformer';

export class Camera {

  static formOps = [
    // {field: 'id', title: 'Id', type: 'text_input', placeholder: 'Enter ID', newOnly: true},
    {field: 'active', title: 'Enabled', type: 'checkbox', placeholder: ''},
    {field: 'name', title: 'Camera Name', type: 'text_input', placeholder: ''},
    {field: 'username', title: 'Username', type: 'text_input', placeholder: ''},
    {field: 'password', title: 'Password', type: 'text_input', placeholder: ''}
  ];


  public id: string;
  public active: boolean;
  @IsNotEmpty()
  public name: string;
  public cameraNum: number;
  public mac: string;
  public IPv4: string;
  public onvifPort: number;
  @IsNotEmpty()
  public username: string;
  @IsOptional()
  public password: string;
  public lastConnection: Date;
  public stream1: string;
  public stream2: string;
  public stream3: string;
  public snapshotUri: string;
  public isDhcp: boolean;
  public stream1Width: number;
  public stream1Height: number;
  public stream1Settings: Object;
  public stream1HasAudio: boolean;
  public stream2Width: number;
  public stream2Height: number;
  public stream2Settings: Object;
  public stream2HasAudio: boolean;
  public stream3Width: number;
  public stream3Height: number;
  public stream3Settings: Object;
  public stream3HasAudio: boolean;
  public isRecording: boolean;
  public isStalled: boolean;
  public pid: string;
  public hlsUrlStream1: string;
  public hlsUrlStream2: string;
  public hlsUrlStream3: string;
  public unexpectedStops: number;
  public addMethod: string;


  constructor(data?: any) {
    plainToClassFromExist(this, data);
  }

  toString() {
    const arr: string[] = [];
    if (arr.length === 0 && this.name) {
      arr.push(this.name);
    }
    return arr.join(' ');
  }
}
