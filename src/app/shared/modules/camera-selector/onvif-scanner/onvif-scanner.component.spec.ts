/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { OnvifScannerComponent } from './onvif-scanner.component';

describe('OnvifScannerComponent', () => {
  let component: OnvifScannerComponent;
  let fixture: ComponentFixture<OnvifScannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnvifScannerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnvifScannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
