import { LoggerService } from 'app/shared/modules/data-service/logger.service';
import { ConfirmationService } from 'primeng/api';
import { GateApi } from './../../shared/modules/data-service/GateApi.service';
import { Component, OnInit } from '@angular/core';
import { Gate } from 'app/shared/modules/data-service/gate';

@Component({
  selector: 'app-gate-settings-page',
  templateUrl: './gate-settings-page.component.html',
  styleUrls: ['./gate-settings-page.component.css']
})
export class GateSettingsPageComponent implements OnInit {

  public gates: Array<Gate> = [];
  selectedItem: Gate;
  loading = false;
  showGateTestDialog = false;

  cols: any[];

  ///////////////////////////////////
  // options form editor
  showEditor = false;
  formTitle = '';
  formModel = Gate;
  showFormReset = false;
  showFormDelete = false;
  showFormClear = false;
  showFormCancel = false;
  showFormSpinner = false;
  // end options for form editor
  /////////////////////////////////

  constructor(private gateApi: GateApi, private confirmationService: ConfirmationService, private logger: LoggerService) { }

  ngOnInit() {

    this.cols = [
      { field: 'name', header: 'Name' },
      { field: 'description', header: 'Descr' },
      { field: 'type', header: 'Type' },
      { field: 'camera', header: 'Camera IP' },
      { field: 'modbus_ipaddress', header: 'Modbus Host' },
      { field: 'modbus_read_coiladdress', header: 'MB Sensor Address' },
      { field: 'modbus_write_coiladdress', header: 'MB Output Address' },

    ];

    this.getGates();
  }


  async getGates() {
    this.loading = true;
    try {
      this.gates = await this.gateApi.getItems().toPromise();
    } catch (error) {
      this.logger.error(error);
    } finally {
      this.loading = false;
    }
  }

  async edit(data) {
    this.showFormClear = false;
    this.showFormCancel = true;
    this.showFormReset = true;
    this.showFormDelete = true;
    this.formTitle = `Edit Gate ${data.name}`;
    this.selectedItem = data;
    this.showEditor = true;
  }

  async save(data) {


  }

  async delete(data) {


  }

  async add() {
    this.showFormClear = false;
    this.showFormCancel = true;
    this.showFormReset = true;
    this.showFormDelete = false;
    this.formTitle = 'Add new Gate';
    this.selectedItem = new Gate();
    this.showEditor = true;
  }

  async test(data) {
    this.selectedItem = data;
    this.showGateTestDialog = true;
  }

  //////////////////////////////////
  // form operations
  onResetClicked(data) {

  }

  onClearClicked(data) {

  }

  async onSaveClicked(data) {
    this.showFormSpinner = true;
    try {
      if (!data.id) {
        await this.gateApi.createItem(data).toPromise();
      } else {
        await this.gateApi.saveItem(data).toPromise();
      }

      // update item in list
      this.getGates();
    } catch (error) {
      this.logger.error(error);
    } finally {
      this.showFormSpinner = false;
      this.showEditor = false;
    }
  }

  onCancelClicked(data) {
    this.showEditor = false;
  }

  async onDeleteClicked(data) {
    this.showFormSpinner = true;
    try {
      await this.gateApi.deleteItem(data.id).toPromise();

      // update item in list
      this.getGates();
    } catch (error) {

    } finally {
      this.showFormSpinner = false;
      this.showEditor = false;
    }
  }
  //////////////////////////////////

}
