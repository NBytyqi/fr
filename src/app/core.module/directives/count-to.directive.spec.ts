import { ElementRef } from '@angular/core';
/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { CountToDirective } from './count-to.directive';

describe('Directive: CountTo', () => {
  it('should create an instance', () => {
    const directive = new CountToDirective(new ElementRef('test'));
    expect(directive).toBeTruthy();
  });
});
