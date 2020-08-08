import { Component, OnInit, Input } from '@angular/core';
import { NgClass, NgStyle } from '@angular/common';

import { CustomProgressDirective } from './progress.directive';
import { CustomBarComponent } from './bar.component';

@Component({
  selector: 'customprogressbar, [customprogressbar]',
  template: `
    <div customprogress [animate]="animate" [max]="max" [class]="class">
      <custombar [type]="type" [value]="value">
          <ng-content></ng-content>
      </custombar>
    </div>
  `
})
export class CustomProgressBarComponent {
  @Input() public animate: boolean;
  @Input() public max: number;
  @Input() public type: string;
  @Input() public value: number;
  @Input() public class: string;

}
