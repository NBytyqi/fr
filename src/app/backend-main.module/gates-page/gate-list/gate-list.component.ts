import { LocalSocket } from './../../../shared/modules/data-service/services/local-socket.service';
import { GateApi } from './../../../shared/modules/data-service/GateApi.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Gate } from 'app/shared/modules/data-service/gate';
import { takeUntil } from 'rxjs/operators';
import { Subject, interval } from 'rxjs';

@Component({
  selector: 'app-gate-list',
  templateUrl: './gate-list.component.html',
  styleUrls: ['./gate-list.component.css']
})
export class GateListComponent implements OnInit, OnDestroy {
  public onDestroy = new Subject();
  public gates: Array<Gate> = [];
  public events = [];

  public gettingEvents = false;

  constructor(public gateApi: GateApi, private socket: LocalSocket) { }

  ngOnInit() {
    this.getGates();

    interval(5000).pipe(takeUntil(this.onDestroy)).subscribe(val => {
      if (!this.gettingEvents) {
        this.getEvents();
      }
    });

  }

  ngOnDestroy() {
    this.onDestroy.next();
    this.onDestroy.complete();
  }


  async getGates() {
    this.gates = await this.gateApi.getItems().toPromise();
    await this.getEvents();

    for (const gate of this.gates) {
      this.socket.fromEvent('pl_event_update').pipe(takeUntil(this.onDestroy)).subscribe((data: any) => {
        // got new image data, update the local status
        // console.log(data);
        const idx = this.events.findIndex(item => item.gateId === data.event.gateId);

        if (idx > -1) {
          if (data.event && data.event.complete) {
            this.events.splice(idx, 1); // complete, remove it
          } else {
            this.events.splice(idx, 1, data.event); // replace with new status
          }
        } else {
          if (!data.event.complete) {
            this.events.push(data.event);
          }
        }
      });
    }

    this.socket.fromEvent('connect').subscribe(() => {
      this.getEvents();
    });
  }

  async getEvents() {
    try {
      this.gettingEvents = true;
      this.events = await this.gateApi.getCurrentEvents().toPromise();

      for (const event of this.events) {


      }
    } catch (error) {
      console.log(error);
    } finally {
      this.gettingEvents = false;
    }

  }

  eventOf(gate) {
    return this.events.find(item => item.gateId === gate.id);
  }




}
