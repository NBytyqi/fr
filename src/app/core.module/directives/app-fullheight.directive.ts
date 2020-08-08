import { WindowRef } from './../services/window-ref.service';
import { Directive, ElementRef, Input, OnChanges, SimpleChange, OnInit, HostListener, ViewChild } from '@angular/core';

/**
 * Make element 100% height of browser window.
 */


@Directive({
  selector: '[appFullHeight]'
})
export class AppFullheightDirective implements OnChanges, OnInit {

  @Input() ctFullHeightIf;
  @Input() appFullHeight;
  exclusionItems;
  exclusionHeight;
  setHeight = true;
  @Input() ctFullHeightExclusion;
  page;
  __height;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.initializeWindowSize();

  }

  constructor(private win: WindowRef, private el: ElementRef) { }

  ngOnInit() {
    this.initializeWindowSize();

  }

  ngOnChanges(changes) {

    const elem: HTMLElement = this.el.nativeElement;

    if (this.ctFullHeightIf) {
      if (changes.ctFullHeightIf) {

        if (changes.currentValue && !changes.previousValue) {
          this.setHeight = true;
        } else if (!changes.currentValue) {
          this.el.nativeElement.style.height = 'auto';
          this.setHeight = false;
        }
      }
    }

    this.initializeWindowSize();
  }


  initializeWindowSize() {
    const self = this;
    const elem: HTMLElement = this.el.nativeElement;

    setTimeout(() => {
      self.exclusionHeight = 0;

      if (self.ctFullHeightExclusion) {
        const exclusionItems = self.ctFullHeightExclusion.split(',');
        for (const _element in exclusionItems) {
          if (exclusionItems.hasOwnProperty(_element)) {

            // self.exclusionHeight = self.exclusionHeight + _element.outerHeight(true);
          }

        }
      }

      if (self.appFullHeight === 'window') {
        self.page = self.win;
      } else {
        self.page = window.document;
      }

      this.__height = this.page.height;

      if (self.setHeight) {
        elem.style.height = 'auto';
        if (self.page.innerHeight < self.win.nativeWindow.innerHeight) {
          self.page = self.win;
        }

        elem.style.height = (self.page.innerHeight - self.exclusionHeight).toString();
      }
    }, 300);
  }





}


