import { AuthService } from 'app/shared/modules/data-service/auth.service';
import { DomSanitizer } from '@angular/platform-browser';
import { HlsPlayerComponent } from './../hls-player/hls-player.component';
import { OnvifScannerComponent } from './onvif-scanner/onvif-scanner.component';
import { LoggerService } from 'app/shared/modules/data-service/logger.service';
import { Camera } from './../data-service/camera';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CameraApi } from '../data-service/CameraApi.service';

@Component({
  selector: 'app-camera-selector',
  templateUrl: './camera-selector.component.html',
  styleUrls: ['./camera-selector.component.css']
})
export class CameraSelectorComponent implements OnInit {
  public cameras: Array<Camera> = [];
  selectedItem: Camera;
  loading = false;
  showOnvifScanner = false;
  showLiveStreamDialog = false;
  liveStreamUrl = '';
  liveStreamCam: Camera;
  latestImage;
  @ViewChild('onvifScanner', { static: true }) onvifScanner: OnvifScannerComponent;
  @ViewChild('hlsPlayer', { static: true }) hlsPlayer: HlsPlayerComponent;
  @ViewChild('latestImageOL', { static: true }) latestImageOL;

  cols: any[];

  ///////////////////////////////////
  // options form editor
  showEditor = false;
  formTitle = '';
  formModel = Camera;
  showFormReset = false;
  showFormDelete = false;
  showFormClear = false;
  showFormCancel = false;
  showFormSpinner = false;
  // end options for form editor
  /////////////////////////////////

  constructor(private cameraApi: CameraApi, private logger: LoggerService, private domSanitizer: DomSanitizer, public authService: AuthService) { }

  ngOnInit() {

    this.cols = [
      { field: 'active', header: '' },
      { field: 'name', header: 'Camera Name' },
      { field: 'mac', header: 'MAC' },
      { field: 'IPv4', header: 'IP' },
      { field: 'username', header: 'User/Pass' },
      // { field: 'onvifPort', header: 'ONVIF Port' },
      { field: 'stream1Width', header: 'Stream 1' },
      { field: 'stream2Width', header: 'Stream 2' },
      { field: 'addMethod', header: 'Source' },
    ];

    this.getCameras();
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

  async scanForCameras() {
    this.showOnvifScanner = true;
    if (this.onvifScanner) {
      this.onvifScanner.clear(); // reset view
      this.onvifScanner.scanForCameras(); // start scan
    }

  }

  async getLatestSnapshot(event, cam) {
    if (cam) {
      try {
        const lastImg: any = await this.cameraApi.getLatestImage(cam.id).toPromise();
        const base64URL = 'data:image/jpeg;base64,' + btoa(String.fromCharCode(...new Uint8Array(lastImg.img.data)));
        this.latestImage = this.domSanitizer.bypassSecurityTrustResourceUrl(base64URL);
        this.latestImageOL.toggle(event); // open panel relative to click
      } catch (error) {
        this.logger.error(error);
      } finally {
        this.loading = false;
      }
    }
  }

  async add(onvifCams) {
    if (onvifCams && onvifCams.length) {
      // add these cameras and refresh
      try {
        this.showFormSpinner = true;

        const newCamas = await this.cameraApi.installCamerasFromOnvifSearch(onvifCams).toPromise();

        this.refresh();

        this.showOnvifScanner = false;
      } catch (error) {
        this.logger.error(error);
      } finally {
        this.showFormSpinner = false;
      }
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
        await this.cameraApi.createItem(data).toPromise();
      } else {
        await this.cameraApi.saveItem(data).toPromise();
      }

      // update item in list
      this.getCameras();
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
      await this.cameraApi.deleteItem(data.id).toPromise();

      // update item in list
      this.getCameras();
    } catch (error) {

    } finally {
      this.showFormSpinner = false;
      this.showEditor = false;
    }
  }
  //////////////////////////////////

  async refresh() {
    await this.getCameras();
  }

  onCancelOnvifScannerDialog() {
    this.showOnvifScanner = false;
  }

  openLiveStream(cam: Camera, streamUrl: string) {
    if (streamUrl) {
      this.liveStreamUrl = streamUrl + '?token=' + this.authService.token;
      this.liveStreamCam = cam;
      this.showLiveStreamDialog = true;
      if (this.hlsPlayer) {
        setTimeout(() => {
          this.hlsPlayer.play();
        }, 0);

      }
    }
  }

  liveStreamDialogClosed(event) {
    if (this.hlsPlayer) {
      this.hlsPlayer.stop();
    }
  }

}
