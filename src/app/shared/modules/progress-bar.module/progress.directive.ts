import { Directive, OnInit, Input, HostBinding } from '@angular/core';
import { CustomBarComponent } from './bar.component';

const progressConfig = {
  animate: true,
  max: 100
};

// tslint:disable-next-line:directive-selector
@Directive({ selector: 'custom-bs-progress, [customprogress]' })
export class CustomProgressDirective implements OnInit {
  @Input() public animate: boolean;
  @Input() class: string;

  @HostBinding('attr.max')
  @Input() public get max(): number {
    return this._max;
  }

  @HostBinding('class') private addClass = 'progress';

  public set max(v: number) {
    this._max = v;
    this.bars.forEach((bar: CustomBarComponent) => {
      bar.recalculatePercentage();
    });
  }

  public bars: Array<any> = [];

  private _max: number;

  constructor() {
  }

  ngOnInit() {
    this.animate = this.animate !== false;
    this.max = typeof this.max === 'number' ? this.max : progressConfig.max;

     if (this.class) { // set class passed down from component or directive
       this.addClass = this.addClass +  ' ' + this.class;
     }
  }


  public addBar(bar: CustomBarComponent) {
    if (!this.animate) {
      bar.transition = 'none';
    }
    this.bars.push(bar);
  }

  public removeBar(bar: CustomBarComponent) {
    this.bars.splice(this.bars.indexOf(bar), 1);
  }
}
