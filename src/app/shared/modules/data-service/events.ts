import { Recording } from './recording';
import { Snapshot } from './snapshot';
import { User } from './User';
import { Gate } from 'app/shared/modules/data-service/gate';
import { Camera } from './camera';
import { Validate, IsNotEmpty, Min, Max, IsOptional } from 'class-validator';
import { plainToClassFromExist } from 'class-transformer';

export class Events {

  static formOps = [];


  public id: string;
  public status: string;
  public type: string;
  public plate: string;
  public isBlacklisted: boolean;
  public isOverride: boolean;
  public startDate: Date;
  public endDate: Date;
  public carOnSensor: Date;
  public carOffSensor: Date;
  public gateOpened: Date;
  public gateClosed: Date;
  public duration: 0;
  public sensorDuration: 0;
  public gateOpenDuration: 0;
  public searchString: string;
  public complete: false;
  public isApproved: false;
  public isDenied: false;
  public isDeniedAndBlacklisted: false;
  public isPendingAction: true;

  public recordingId: string;
  public recording: Recording;
  public gateId: string;
  public gate: Gate;
  public userId: string;
  public user: User;
  public snapshotId: string;




  public snapshot: Snapshot;
  public cameraId: string;
  public camera: Camera;

  // constructor(plate?: string, id?: string) {
  //   this.plate = plate;
  //   this.id = id;
  // }

  constructor(data?: any) {
    plainToClassFromExist(this, data);
  }

  toString() {
    const arr: string[] = [];
    if (arr.length === 0 && this.plate) {
      arr.push(this.plate);
    }
    return arr.join(' ');
  }

}
