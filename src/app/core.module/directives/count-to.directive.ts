import { Directive, ElementRef, Input, OnInit, OnChanges } from '@angular/core';
import { AppFullheightDirective } from './app-fullheight.directive';

// usage
// <span class="block counter" count-to="{{countTo4}}" value="0" duration="1" filter="number">15832</span>
@Directive({
  selector: '[appCountTo]'
})
export class CountToDirective implements OnInit, OnChanges {

  @Input() appCountTo: any;
  @Input() duration: any;
  @Input() startingNumber: any;

  currentNum = 0;
  refreshInterval = 0;
  steps = 0;
  step = 0;
  increment = 0;
  timeoutId = null;
  // id: String;
  firstChange = false;


  constructor(private el: ElementRef) {
    // this.id = (Math.random() * (600 - 1) + 1).toString();
    // console.log('new count-to directive');
  }

  ngOnInit() {
    // console.log(this.id + ' has been initilzed');
  }

  ngOnChanges(changes) {

    if (changes.appCountTo && changes.appCountTo.currentValue != null) {
      this.start();
    }
  }

  calculate(): void {
    this.refreshInterval = 30;
    this.step = 0;
    this.cleartimer();
    this.appCountTo = parseInt(this.appCountTo, 10) || 0;
    this.startingNumber = parseInt(this.startingNumber, 10) || 0;
    const dur = (parseFloat(this.duration) * 1000) || 0;

    this.steps = Math.ceil(dur / this.refreshInterval);
    this.increment = ((this.appCountTo - this.startingNumber) / this.steps);
    this.currentNum = this.startingNumber;
  }


  tick(): void {
    // local this
    const self = this;

    this.timeoutId = setTimeout(() => {
      this.currentNum = this.currentNum;
      self.currentNum += self.increment;
      self.step++;
      if (self.step >= self.steps) {
        self.cleartimer();
        self.currentNum = self.appCountTo;
        self.el.nativeElement.innerText = self.appCountTo;
      } else {
        self.el.nativeElement.innerText = Math.round(self.currentNum);
        self.tick();
        // console.log(this.el.nativeElement);
      }
    }, self.refreshInterval);
  }



  start() {
    this.cleartimer();
    this.calculate();
    this.tick();
  }



  cleartimer(): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
    this.timeoutId = null;
  }


}

