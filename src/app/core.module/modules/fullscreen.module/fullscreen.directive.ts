import { FullscreenService } from './fullscreen.service';
import { Directive, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';

@Directive({
  selector: '[appFullscreen]'
})
export class FullscreenDirective implements OnInit, OnChanges {
  @Input() appFullscreen: boolean;

  constructor(private fullscreenService: FullscreenService, private el: ElementRef) {
  }

  ngOnInit() {
    this.FullScreen();
  }

  ngOnChanges(changes) {
    if (changes.appFullscreen) {
      this.FullScreen();
    }
  }

  FullScreen() {
    this.fullscreenService.setFullScreenOnElement(this.el.nativeElement, this.appFullscreen);
  }
}
