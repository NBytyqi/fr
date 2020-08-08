import { AuthService } from 'app/shared/modules/data-service/auth.service';
import { LocalSocket } from './../../../shared/modules/data-service/services/local-socket.service';
import { Subject } from 'rxjs';
import { Events } from './../../../shared/modules/data-service/events';

import { LoggerService } from './../../../shared/modules/data-service/logger.service';
import { DomSanitizer } from '@angular/platform-browser';
import { CameraApi } from './../../../shared/modules/data-service/CameraApi.service';
import { Gate } from './../../../shared/modules/data-service/gate';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { GateApi } from 'app/shared/modules/data-service/GateApi.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-gate-item',
  templateUrl: './gate-item.component.html',
  styleUrls: ['./gate-item.component.css']
})
export class GateItemComponent implements OnInit, OnDestroy {
  public onDestroy = new Subject();
  @Input() gate: Gate;
  @Input() event: Events;

  latestImage;
  loading = false;

  constructor(
    private gateApi: GateApi,
    private cameraApi: CameraApi,
    private domSanitizer: DomSanitizer,
    private logger: LoggerService,
    private socket: LocalSocket,
    public authService: AuthService
    ) { }

  ngOnInit() {
    this.getLatestSnapshot(null, this.gate.camera);

    this.socket.fromEvent('snapshot_live_' + this.gate.camera.id).pipe(takeUntil(this.onDestroy)).subscribe((data: any) => {
      const base64URL = 'data:image/jpeg;base64,' + btoa(String.fromCharCode(...new Uint8Array(data.imgBuf)));
      this.latestImage = this.domSanitizer.bypassSecurityTrustResourceUrl(base64URL);
    });
  }

  ngOnDestroy() {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

  async getLatestSnapshot(event, cam) {
    if (cam) {
      this.loading = true;
      try {
        const lastImg: any = await this.cameraApi.getLatestImage(cam.id).toPromise();
        const base64URL = 'data:image/jpeg;base64,' + btoa(String.fromCharCode(...new Uint8Array(lastImg.img.data)));
        this.latestImage = this.domSanitizer.bypassSecurityTrustResourceUrl(base64URL);
      } catch (error) {
        this.logger.error(error);
      } finally {
        this.loading = false;
      }
    }
  }

  lastCheck;
  laststr;
  getDuration() {
    if (event && !this.lastCheck || Date.now() - this.lastCheck > 700) {
     this.laststr = this.msToHMS(Date.now() - Date.parse(this.event.startDate as any as string));
    }
    return this.laststr;
  }
  msToHMS(duration: number) {

    // tslint:disable-next-line:radix
    const milliseconds = parseInt(<any>((duration % 1000) / 100));
    // tslint:disable-next-line:radix
    let seconds = parseInt(<any>((duration / 1000) % 60));
    // tslint:disable-next-line:radix
    let minutes = parseInt(<any>((duration / (1000 * 60)) % 60));
    // tslint:disable-next-line:radix
    let hours = parseInt(<any>((duration / (1000 * 60 * 60)) % 24));

    hours = <any>(((hours < 10) ? '0' + hours : hours));
    minutes = <any>((minutes < 10) ? '0' + minutes : minutes);
    seconds = <any>((seconds < 10) ? '0' + seconds : seconds);

    return hours + ':' + minutes + ':' + seconds;
  }

  async approve() {
    try {
      await this.gateApi.approve(this.gate.id).toPromise();
    } catch (error) {

    }

  }

  async deny() {
    try {
      await this.gateApi.deny(this.gate.id).toPromise();
    } catch (error) {

    }
  }

  async block() {
    try {
      await this.gateApi.denyAndBlacklist(this.gate.id).toPromise();
    } catch (error) {

    }
  }

  async override() {
    try {
      await this.gateApi.override(this.gate.id).toPromise();
    } catch (error) {

    }
  }

}
