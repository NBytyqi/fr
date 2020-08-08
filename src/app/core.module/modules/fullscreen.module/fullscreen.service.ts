

import { EventEmitter, Injectable, OnInit } from '@angular/core';
import * as screenfull from 'screenfull';
import { LoggerService } from 'app/shared/modules/data-service/logger.service';


@Injectable()
export class FullscreenService implements OnInit {

  public onFullScreenEnter = new EventEmitter<boolean>(true);
  public onFullScreenExit = new EventEmitter<boolean>(true);

  public sflib: any = screenfull;

  constructor(private logger: LoggerService) {

  }

  ngOnInit() {

    this.sflib.onchange(() => {
      if (this.sflib.isFullscreen) {
        this.onFullScreenEnter.emit(true);
      } else {
        this.onFullScreenExit.emit(false);
      }
      this.logger.info(`(fullscreen directive) Fullscreen mode changed to: ${this.sflib.isFullscreen}`);
    });
  }

  setFullScreen(value) {
    if (this.sflib.enabled) {
      if (!this.sflib.isFullscreen && value) {
        this.sflib.request();
      } else if (this.sflib.isFullscreen && !value) {
        this.sflib.exit();
      }
    }

  }

  setFullScreenOnElement(el, value) {
    if (this.sflib.enabled) {
      if (!this.sflib.isFullscreen && value) {
        this.sflib.request(el);
      } else if (this.sflib.isFullscreen && !value) {
        this.sflib.exit();
      }
    }

  }

  toggleFullscreen() {
    if (this.sflib.enabled) {
      if (!this.sflib.isFullscreen) {
        this.sflib.request();
      } else {
        this.sflib.exit();
      }
    }
  }

  toggleFullScreenOnElement(el) {
    if (this.sflib.enabled) {
      if (!this.sflib.isFullscreen) {
        this.sflib.request(el);
      } else {
        this.sflib.exit();
      }
    }
  }

  goFullScreen() {
    if (this.sflib.enabled) {
      this.sflib.request();
    }
  }

  exitFullScreen() {
    if (this.sflib.enabled) {
      this.sflib.exit();
    }
  }

  isFullScreen(): boolean {
    if (this.sflib.enabled) {
      return this.sflib.isFullscreen;
    }
  }


  goFullScreenOnElement(el) {
    if (this.sflib.enabled) {
      this.sflib.request(el);
    }
  }


}
