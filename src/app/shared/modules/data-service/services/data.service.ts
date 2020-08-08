import { LoggerService } from './../logger.service';
import { Injectable, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../User';
import { RealTime } from './RealTime.service';
import { UserApi } from '../UserApi.service';



@Injectable()
export class DataService {
  public realtimeConnectionChange$: BehaviorSubject<{
    status: string,
    connected: boolean,
    connecting: boolean,
    authenticated: boolean
  }> = new BehaviorSubject({
    status: 'disconnected',
    connected: false,
    connecting: false,
    authenticated: false
  }); // start with not connected status
  public currentUserChange$: BehaviorSubject<User> = new BehaviorSubject(null);
  public currentUser: User = null; // dummy starting user info so binding to values in components will work
  public impersonationUser: User;
  public isImpersonatingUser: Boolean;
  public userRole: string;
  public effectiveRole: string;
  public childRole: string;
  public effectiveChildRole: string;
  public realtimeStarted = false;

  public isLoadingUser = false;
  public userLoadComplete = new EventEmitter<User>();


  // realtime refs

  private userFilter = {
    include: ['roles', 'profile', {
      relation: 'parentUser',
      scope: {
        fields: ['profile', 'roles'],
        include: [, {
          relation: 'roles',
        }, 'profile']
      }
    }
    ]
  };

  constructor(
    public logger: LoggerService,
    public realTime: RealTime,
    public userApi: UserApi
  ) {

    // start realtime connection
    // this.createRealtimeRefs();

  }
  async connectRealtime() {
    if (!this.realtimeStarted) {
      await this.realTime.connect();
      this.realtimeStarted = true;
    }
  }

  async disconnectRealtime() {
    this.realtimeStarted = false;

    if (this.realTime.isConnected()) {
      await this.realTime.disconnect();

    }
    this.realtimeConnectionChange$.next({ status: 'disconnected', connected: false, connecting: false, authenticated: false });
  }


  getCurrentUser(): User {
    // return impsersonated user, or return actual user
    // if (!this.currentUser.id) {
    //   await this.setCurrentUser(); // set if empty
    // }

    return this.currentUser;
  }

  async setCurrentUser(): Promise<User> {
    this.isLoadingUser = true;

    try {

      this.currentUser = await this.userApi.getCurrent();


    } catch (error) {
      this.logger.error('could not set current user!', error);
      throw error; // rethrow
    } finally {
      this.isLoadingUser = false;
      this.userLoadComplete.emit(this.currentUser);
      return this.currentUser;
    }
  }




}
