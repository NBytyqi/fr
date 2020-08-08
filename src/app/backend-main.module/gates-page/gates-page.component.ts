import { LocalSocket } from './../../shared/modules/data-service/services/local-socket.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-gates-page',
  templateUrl: './gates-page.component.html',
  styleUrls: ['./gates-page.component.css']
})
export class GatesPageComponent implements OnInit, OnDestroy {


  public onDestroy = new Subject();

  constructor(private socket: LocalSocket) { }

  ngOnInit() {
  }


  ngOnDestroy() {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

  // event types
  // pl_event_update                           every change
  // pl_event_caronsensor / pl_event_new       start
  // pl_event_caronsensor                      car is detected
  // pl_event_caroffsensor                     car leaves sensor
  // pl_event_gateclosed                       gate is closed
  // pl_event_gateopened                       gate is opened
  // pl_event_complete                         all finished


  // check this when the page first loads
  getInitialStatuses() {

  }
}
