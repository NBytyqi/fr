import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class LocalSocket extends Socket {

  // TEST TEST TEST for local socket
  constructor() {
    super({ url: window.location.origin, options: {} });

    this.startReceivingServerTime();
  }

  private serverTS = null;
  private serverTSDiff = null;

  private startReceivingServerTime() {
    this.fromEvent('ts').subscribe((ts: any) => {
      this.serverTS = ts;
      this.serverTSDiff = Date.now() - ts;
      // console.log(`Drift from server: ${this.serverTSDiff}ms`);
    });
  }



  getServerNow(): number {
      return Date.now() - (this.serverTSDiff || 0);
  }

  getServerDate(): Date {
    return new Date(this.getServerNow());
  }

}
