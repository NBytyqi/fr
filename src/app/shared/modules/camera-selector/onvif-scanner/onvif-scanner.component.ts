import { LoggerService } from 'app/shared/modules/data-service/logger.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CameraApi } from '../../data-service/CameraApi.service';

@Component({
  selector: 'app-onvif-scanner',
  templateUrl: './onvif-scanner.component.html',
  styleUrls: ['./onvif-scanner.component.css']
})
export class OnvifScannerComponent implements OnInit {

  loading = false;
  scanning = false;
  onvifCameras = [];
  selectedOnvifCameras = [];
  cameras = [];
  hasScanned = false;

  @Output() cancelClick = new EventEmitter();
  @Output() addClick = new EventEmitter();

  constructor(private cameraApi: CameraApi, private logger: LoggerService) { }

  ngOnInit() {
  }

  clear() {
    // reset back to default state
    this.selectedOnvifCameras = [];
    this.onvifCameras = [];
    this.loading = false;
    this.scanning = false;
    this.hasScanned = false;
  }

  async scanForCameras() {
    this.scanning = true;
    this.hasScanned = true;
    try {

      const result = await this.cameraApi.scanOnvifCameras().toPromise();
      this.onvifCameras = (<any>result).missingCams;

      this.onvifCameras = this.onvifCameras.map(item => {
        return { label: item.hostname, value: item };
      });
    } catch (error) {
      this.logger.error(error);
    } finally {
      this.scanning = false;
    }

  }

  async getCameras() {
    this.loading = true;
    try {
      this.cameras = await this.cameraApi.getItems().toPromise();
    } catch (error) {
      this.logger.error(error);
    } finally {
      this.loading = false;
    }
  }

  async addSelected() {
    this.addClick.emit(this.selectedOnvifCameras);

  }

  cancel() {
    this.cancelClick.emit();
  }

}
