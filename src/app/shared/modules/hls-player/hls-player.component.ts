import { AuthService } from 'app/shared/modules/data-service/auth.service';
import { GlobalPropertiesService } from './../global-properties/services/global-properties.service';
import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter, OnDestroy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { Subject, Subscription, fromEvent, of } from 'rxjs';
import { AnimationService, AnimationBuilder } from 'css-animator';
import { takeUntil, mergeMap, timeout } from 'rxjs/operators';
import { environment } from 'environments/environment';
import * as Hls from 'hls.js';
import * as PinchZoom from 'pinch-zoom-js';
import JSMpegWritableSource from './jsmpeg-writable-source';
import { LocalSocket } from '../data-service/services/local-socket.service';


declare var JSMpeg;

@Component({
  selector: 'app-hls-player',
  templateUrl: './hls-player.component.html',
  styleUrls: ['./hls-player.component.css']
})
export class HlsPlayerComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input() liveStreamUrl;

  onDestroy = new Subject();


  @Input() type = 'hlsjs'; // hlsjs

  // input "cam"
  @Input() camVal;
  @Output() camChange = new EventEmitter();
  @Input()
  get cam() {
    return this.camVal;
  }
  set cam(cam) {

    // initial values
    if (cam !== this.camVal) {
      this.trackingData = {
        trackings: [],
        previousTracks: []
      };

     // this.playCam(cam);
    }
    this.camVal = cam;

  }
  public pz;
  public hls;
  public currentZoom = 1;
  public loading = false;
  public playing = false;
  public programStartDateTime;
  public lastVideoPTS;
  public currentFragStartPTS;
  public realVidTime;
  public realVidTimeStr;
  public tsUpdateInterval;

  public ttl = 0;
  public ttlSubject = new Subject();
  public ttlObs = this.ttlSubject.asObservable;

  // buttons
  public muted = true;
  public showAi = true;
  public aiActivated = true;

  public serverTime = this.socket.getServerNow();


  public playWhenReady = false;
  public currentState = 'Loading';
  public now = this.socket.getServerNow();
  public math = Math;

  // zoom factor for showing detection boxes over video
  public zoomFactor = { width: 1, height: 1 };
  public dragOffset = { x: 0, y: 0 };
  public dragging = false;


  public stallDetectSubject = new Subject();
  public stallDetectSub;

  public trackingData = {
    trackings: [],
    previousTracks: []
  };

  // popover
  public selctedAiObject;


  @ViewChild('video', { static: false }) video;
  // @ViewChild('videocanvas', { static: false }) videoCanvas;
  public videoCanvas;
  @ViewChild('zoombox', { static: false }) zoomBox;
  private animator: AnimationBuilder;

  constructor(
    private animationService: AnimationService,
    private gps: GlobalPropertiesService,
    private socket: LocalSocket,
    private changeDetectorRef: ChangeDetectorRef,
    private authService: AuthService) { }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.onDestroy.next();

    if (this.hls) {
      this.hls.destroy();
    }

    if (this.stallDetectSub) {
      this.stallDetectSub.unsubscribe();
    }

    this.destroyHLS();
  }

  ngAfterViewInit(): void {
    if (this.video && this.muted) {
      this.video.nativeElement.muted = true;
    }

    // enable pinch zoom on video
    this.pz = new PinchZoom.default(this.zoomBox.nativeElement, {
      draggableUnzoomed: false,
      minZoom: 1,
      maxZoom: 20,
      onZoomStart: (object, event) => {
        // Do something on zoom start
        // You can use any Pinchzoom method by calling object.method()
      },
      onZoomEnd: (object, event) => {
        // Do something on zoom end
        this.calcZoomFactor();
        this.dragOffset = this.pz.offset;
      },
      onZoomUpdate: (object, event) => {
        this.currentZoom = parseFloat(this.pz.zoomFactor.toFixed(2));
        this.calcZoomFactor();
        this.dragOffset = this.pz.offset;
      },
      onDragStart: (object, event) => {
        this.dragOffset = this.pz.offset;
        this.dragging = true;

      },
      onDragEnd: (object, event) => {
        this.dragOffset = this.pz.offset;
        this.dragging = false;
      },
      onDragUpdate: (object, event) => {
        this.dragOffset = this.pz.offset;
      }
    });

    if (this.cam !== null && this.cam !== undefined && this.playWhenReady && !this.gps.isIOS()) {
     // this.playCam(this.cam);
    }

    // update scales on window resize
    fromEvent(window, 'resize').pipe(takeUntil(this.onDestroy)).subscribe(event => {
      this.calcZoomFactor();

    });

    this.playWhenReady = false;

  }

  touchstarttest(event) {

  }

  videoPlaying(event) {
    // this.animator.setType('fadeInLeftBig').show(this.video.nativeElement);
    this.loading = false;
    this.playing = true;
    this.currentState = 'Playing';
  }

  videoClicked(event) {
    // if (!this.playing) {
    //   this.playCam(this.cam);
    // }
  }

  async stop() {
    if (this.hls) {
      try {
        this.liveStreamUrl = null;
        this.hls.destroy();

        // this.video.nativeElement.pause();
        this.video.nativeElement.muted = this.muted;
        Object.keys(Hls.Events).forEach((key) => {
          this.hls.off(Hls.Events[key]);
        });
        this.hls.detachMedia();
        if (this.hls.streamController.fragCurrent) {
          this.hls.stopLoad();
        }

        await new Promise(resolve => setTimeout(resolve, 20));

      } catch (error) {
        console.log('Error destroying hls stream', error);
      }

    }

    if (this.stallDetectSub) {
      this.stallDetectSub.unsubscribe();
    }
  }


  play() {
    if (!this.liveStreamUrl) {
      return;
    }

    if (this.stallDetectSub) {
      this.stallDetectSub.unsubscribe();
    }

    this.stallDetectSub = this.stallDetectSubject.pipe(timeout(10000)).subscribe(() => {

    }, (error) => {
      setTimeout(() => {
        console.log('Camera stall detected');
        this.play();
      }, 0);
    });


    this.programStartDateTime = null; // reset the program start date

    if (this.type === 'jsmpeg') {
      this.playViaJSMpeg('', 640, 480);
    }

    if (this.type === 'hlsjs') {
      if (Hls.isSupported() && this.gps.isIOS() || !environment.production) {
        this.playViaHLSJS();
      } else {
        this.playViaNative();
      }

    }


    // update ttl and video time
    if (!this.tsUpdateInterval) {
      this.tsUpdateInterval = setInterval(() => {
        if (this.gps.isIOS() && environment.production) {
          if (this.video.nativeElement.getStartDate && this.isValidDate(this.video.nativeElement.getStartDate())) {
            this.programStartDateTime = this.video.nativeElement.getStartDate();
          } else {
            this.programStartDateTime = null;
            return;
          }
        }


        if (this.programStartDateTime) {
          const oldVidTimeStr = this.realVidTimeStr;
          const now = this.socket.getServerNow();
          const videoCurrentPTS = this.video.nativeElement.currentTime * 1000;
          const diff = videoCurrentPTS - (this.lastVideoPTS || 0) - this.ptsAtProgramTime;
          this.realVidTime = new Date(this.programStartDateTime.getTime() + videoCurrentPTS - (diff) + 350);
          this.realVidTimeStr = this.realVidTime.toLocaleTimeString();
          const newTTL = (now - this.realVidTime.getTime());

          this.ttl = newTTL;

          this.lastVideoPTS = videoCurrentPTS;

          if (oldVidTimeStr !== this.realVidTimeStr) {
            this.stallDetectSubject.next();  // ping stall detector
          }
        }

      }, 100);
    }

  }

  isValidDate(d) {
    return d instanceof Date && !isNaN(d as any);
  }

  public sub;
  public livePlayer;
  public ptsAtProgramTime = 0;
  public wallClockAtProgramTime;

  playViaJSMpeg(id, width, height) {

    if (this.sub) {
      this.sub.unsubscribe();
    }

    if (this.videoCanvas && !this.videoCanvas.nativeElement) {
      // cleanup
      const ele = this.videoCanvas.nativeElement ? this.videoCanvas.nativeElement : this.videoCanvas;
      let gl = ele.getContext('webgl');
      if (gl) {

        const numTextureUnits = gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS);
        for (let unit = 0; unit < numTextureUnits; ++unit) {
          gl.activeTexture(gl.TEXTURE0 + unit);
          gl.bindTexture(gl.TEXTURE_2D, null);
          gl.bindTexture(gl.TEXTURE_CUBE_MAP, null);
        }
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
        gl.bindRenderbuffer(gl.RENDERBUFFER, null);
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);


        const buf = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buf);
        const numAttributes = gl.getParameter(gl.MAX_VERTEX_ATTRIBS);
        for (let attrib = 0; attrib < numAttributes; ++attrib) {
          gl.vertexAttribPointer(attrib, 1, gl.FLOAT, false, 0, 0);
        }

        gl.canvas.width = 1;
        gl.canvas.height = 1;
      }
      for (const key of Object.keys(ele)) {
        ele[key] = null;
      }
      this.zoomBox.nativeElement.removeChild(this.videoCanvas);


      this.videoCanvas = null;
      gl = null;
    }

    if (this.livePlayer) {
      this.livePlayer.destroy();

      for (const key of Object.keys(this.livePlayer)) {
        this.livePlayer[key] = null;
      }
      this.livePlayer = null;
    }

    // create new canvas
    this.playWhenReady = true;
    this.videoCanvas = document.createElement('canvas');
    this.videoCanvas.classList.add('videocanvas');
    this.zoomBox.nativeElement.appendChild(this.videoCanvas);

    this.changeDetectorRef.detectChanges();



    this.loading = true;
    this.currentState = 'Loading';



    this.livePlayer = new JSMpeg.Player(null, {
      width: width,
      height: height,
      loop: false,
      audio: false,
      autoPlay: false,
      disableWebAssembly: false,
      disableGl: false,
      progressive: false,
      videoBufferSize: 1024 * 1024,
      audioBufferSize: 256000,
      source: (JSMpegWritableSource as any).default,
      canvas: this.videoCanvas.nativeElement ? this.videoCanvas.nativeElement : this.videoCanvas,
      onStalled: (player) => { console.log('stall..'); },
      onPlay: (player) => { console.log('playing!'); },
      // onVideoDecode: (decoder, time) => { console.log(time); }
    });


    this.sub = this.socket.fromEvent(`livets:${id}`).pipe(takeUntil(this.onDestroy)).subscribe(async (data: any) => {
      try {
        for (const buf of data.vd) {
          await new Promise(resolve => setTimeout(resolve, 10));
          this.livePlayer.source.write(buf);
        }

      } catch (error) {

      }

      this.serverTime = data.ts + 500; // give 10ms for transfer time

      this.realVidTime = new Date(data.ts);
      this.realVidTimeStr = this.realVidTime.toLocaleTimeString();
      this.ttl = (this.serverTime - data.ts + 100) / 1000;

      if (this.loading) {

        this.calcZoomFactor();
        this.loading = false;
        this.playing = true;
        this.currentState = 'Playing';
      }

      data = null;
    });

    this.livePlayer.play();
  }

  playViaNative() {

    if (!this.video) {
      this.playWhenReady = true;
      return;
    }

    const loadedMetaData = () => {
      this.video.nativeElement.play();
      this.calcZoomFactor();

      if (this.gps.isIOS()) {
        this.programStartDateTime = this.video.nativeElement.getStartDate();
      }
    };

    if (this.video.nativeElement.canPlayType('application/vnd.apple.mpegurl')) {
      this.video.nativeElement.removeEventListener('loadedmetadata', loadedMetaData);
      this.video.nativeElement.src = this.liveStreamUrl;
      this.video.nativeElement.addEventListener('loadedmetadata', loadedMetaData);
    }
  }

  async destroyHLS() {
    if (this.hls) {
      try {
        this.video.nativeElement.pause();
        this.video.nativeElement.muted = this.muted;
        Object.keys(Hls.Events).forEach((key) => {
          this.hls.off(Hls.Events[key]);
        });
        this.hls.detachMedia();
        if (this.hls.streamController.fragCurrent) {
          this.hls.stopLoad();
        }

        await new Promise(resolve => setTimeout(resolve, 20));
        this.hls.destroy();
      } catch (error) {
        console.log('Error destroying hls stream', error);
      }

    }
  }

  async playViaHLSJS() {
    try {

      if (!this.video) {
        this.playWhenReady = true;
        return;
      }

      if (this.hls) {
          await this.destroyHLS();
      }

      if (this.pz) {
        // reset zoom
        this.pz.scaleTo(1, this.pz.initialOffset);
        this.pz.resetOffset();
        this.pz.update();
      }

      this.playing = false;

      // only show the loading indicator if it takes longer then 1 sec to load
      setTimeout(() => {
        if (!this.playing) {
          this.loading = true;
          this.currentState = 'Loading';
        }
      }, 2000);

      this.hls = new Hls({
        xhrSetup: (xhr, url) => {
          xhr.withCredentials = true; // do send cookies
          if (url.indexOf('token=?') === -1) {
            xhr.setRequestHeader('authorization', 'Bearer ' + this.authService.token);
          }
        },
        // liveSyncDuration: .5,
        // liveMaxLatencyDuration: 10,
        // manifestLoadingTimeOut: 5000,
        // manifestLoadingMaxRetry: Infinity,
        // manifestLoadingRetryDelay: 1000,
        // manifestLoadingMaxRetryTimeout: Infinity,
        // levelLoadingTimeOut: 5000,
        // levelLoadingMaxRetry: Infinity,
        // levelLoadingRetryDelay: 1000,
        // levelLoadingMaxRetryTimeout: Infinity,
        // fragLoadingTimeOut: 20000,
        // fragLoadingMaxRetry: Infinity,
        // fragLoadingRetryDelay: 1000,
        // nudgeMaxRetry: 100,
        // appendErrorMaxRetry: 25,
        // maxFragLookUpTolerance: .04
      });


      this.hls.attachMedia(this.video.nativeElement);
      this.hls.loadSource(this.liveStreamUrl);



      this.video.nativeElement.play();


      this.hls.on(Hls.Events.LEVEL_LOADED, (event, data) => {
        if (!this.programStartDateTime && data.details.fragments && data.details.fragments.length) {
          // const diff = ((this.video.nativeElement.currentTime * 1000) - (this.ptsAtProgramTime || 0));
          this.programStartDateTime = new Date(data.details.fragments[0].programDateTime);
          this.ptsAtProgramTime = this.video.nativeElement.currentTime * 1000;
          this.wallClockAtProgramTime = this.socket.getServerNow();
        }
      });


      this.hls.on(Hls.Events.FRAG_CHANGED, (event, data) => {
        // if (!this.programStartDateTime) {
        //   const diff = ((this.video.nativeElement.currentTime * 1000) - (this.ptsAtProgramTime || 0));
        //   this.programStartDateTime = new Date(data.frag.programDateTime - diff);
        //   this.ptsAtProgramTime = this.video.nativeElement.currentTime * 1000;
        //   this.wallClockAtProgramTime = Date.now();
        // }
        this.stallDetectSubject.next();  // ping stall detector
      });


      this.hls.on(Hls.Events.ERROR, (event, data) => {
        if (data.fatal) {
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              // try to recover network error
              this.hls.off(Hls.Events.ERROR);
              console.log('fatal network error encountered, try to recover: ', data.reason);
              setTimeout(() => {
                this.play();
                // this.hls.startLoad();

              }, 1000);

              break;
            case Hls.ErrorTypes.MEDIA_ERROR:
              console.log('fatal media error encountered, try to recover');

              setTimeout(() => {
                this.play();
                // this.hls.recoverMediaError();
              }, 1000);
              break;
            default:
              setTimeout(() => {
                this.play();
                // this.hls.startLoad();
              }, 1000);
              break;
          }
        }
      });



    } catch (error) {
      console.log(error);
    }

  }

  calcZoomFactor() {

    if (this.cam && this.zoomBox) {
      const videoWidth = this.zoomBox.nativeElement.clientWidth;
      const videoHeight = this.zoomBox.nativeElement.clientHeight;
      this.zoomFactor = { width: videoWidth / this.cam.stream2Width, height: videoHeight / this.cam.stream2Height };
    }

  }


  toggleMute() {
    this.muted = !this.muted;
    if (this.video) {
      this.video.nativeElement.muted = this.muted;
    }
  }

  toggleFullscreen() {

  }
}
