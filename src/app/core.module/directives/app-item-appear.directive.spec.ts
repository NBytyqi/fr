import { WindowRef } from './../services/window-ref.service';
import { ElementRef } from '@angular/core';
import { AppItemAppearDirective } from './app-item-appear.directive';

describe('AppItemAppearDirective', () => {
  it('should create an instance', () => {
    const directive = new AppItemAppearDirective(new ElementRef('test'), new WindowRef);
    expect(directive).toBeTruthy();
  });
});
