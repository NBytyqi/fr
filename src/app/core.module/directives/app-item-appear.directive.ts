import { FunctionCall } from '@angular/compiler/src/expression_parser/ast';
import { WindowRef } from '../../core.module/services/window-ref.service';
import { Directive, ElementRef, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output } from '@angular/core';

@Directive({
  selector: '[appItemAppear]'
})
export class AppItemAppearDirective implements OnInit, OnDestroy {

  @Input() appItemAppear: any;
  @Output() onScrolledTo = new EventEmitter();
  @Output() onFirstAppear = new EventEmitter();

  private scrollParent: any;
  private useWindow: boolean;

  constructor(
    private el: ElementRef,
    private win: WindowRef
  ) {
    el.nativeElement.hasScrolledTo = false;
  }

  ngOnInit() {
    // listen to the proper scroll source, if none provided, use window
    if (!this.appItemAppear) {
      this.scrollParent = this.win.nativeWindow;
      this.scrollParent.addEventListener('scroll', this.onScroll.bind(this));
    } else {
      this.scrollParent = this.appItemAppear;
      this.scrollParent.addEventListener('scroll', this.onScroll.bind(this));
    }
  }

  ngOnDestroy() {
    this.scrollParent.removeEventListener('scroll', this.onScroll.bind(this));
  }

  // changed to dynamic scroll source, provided now as a inpunt to the directive
  // @HostListener('window:scroll', ['$event'])
  // onWindowScroll(event) {
  //   if (!this.useWindow) {
  //     this.checkScroll();
  //   }
  // }

  onScroll(event) {
    this.checkScroll();
  }

  checkScroll() {
    if (this.isScrolledIntoView(this.el.nativeElement)) {
      if (!this.el.nativeElement.hasScrolledTo) {
        this.onFirstAppear.emit(this.el.nativeElement);  // emit what was scrolled to
      }
      // console.log("now what?");
      this.onScrolledTo.emit(this.el.nativeElement);  // emit what was scrolled to
      this.el.nativeElement.hasScrolledTo = true;
    }

  }


  isScrolledIntoView(target: any) {
    const elemTop = target.getBoundingClientRect().top;
    const elemBottom = target.getBoundingClientRect().bottom;

    const isTopVisible = (elemTop <= this.win.nativeWindow.innerHeight) && (elemBottom >= this.win.nativeWindow.innerHeight); // scrolling down
    const isBottomVisible = (elemBottom >= 0) && (elemBottom <= this.win.nativeWindow.innerHeight); // scrolling up

    if (isTopVisible || isBottomVisible) {
      return true;
    } else {
      return false;
    }
  }

}
