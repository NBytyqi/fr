import { Subject } from 'rxjs';
import { GateApi } from './../../../shared/modules/data-service/GateApi.service';
import { Gate } from './../../../shared/modules/data-service/gate';
import { Component, OnInit, Output, EventEmitter, Input, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-gate-test-dialog',
  templateUrl: './gate-test-dialog.component.html',
  styleUrls: ['./gate-test-dialog.component.css']
})
export class GateTestDialogComponent implements OnInit, OnDestroy {

  public onDestroySubject = new Subject();
  @Input() gate: Gate;

  private _visible = false;
  @Output() visibleChange = new EventEmitter<boolean>();
  @Input()
  get visible() {
    return this._visible;
  }
  set visible(val) {
    this._visible = val;

    if (val) {
      if (this.gate) {
        this.onGetStatus(this.gate);
      }

    }
    this.visibleChange.emit(this._visible);
  }

  modbusStatus;
  refreshtimer;

  constructor(private gateApi: GateApi) { }

  ngOnInit() {
    this.refreshtimer = setInterval(() => {
      if (this.gate) {
        this.updateSatus();
      }
    }, 1000);
  }

  ngOnDestroy() {
    this.onDestroySubject.next();
    this.onDestroySubject.complete();
    if (this.refreshtimer) {
      clearInterval(this.refreshtimer);
    }

  }

  onCancelClick() {
    this.visible = false;
  }

  async onGetStatus(data) {
    await this.updateSatus();

  }

  async updateSatus() {
    if (this.gate && this.gate.id) {
      const status = await this.gateApi.getModBusStatus(this.gate.id).toPromise();
      this.modbusStatus = status;
    }

  }

  async onTestOpen() {
    await this.gateApi.openGate(this.gate.id).toPromise();
    await this.updateSatus();

  }

  async onTestClose() {
    await this.gateApi.closeGate(this.gate.id).toPromise();
    await this.updateSatus();
  }

  async onCarOnSensor() {
    await this.gateApi.simCarOnSensor(this.gate.id).toPromise();
    await this.updateSatus();
  }

  async onCarOffSensor() {
    await this.gateApi.simCarOffSensor(this.gate.id).toPromise();
    await this.updateSatus();
  }

}
