/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PingTestComponent } from './ping-test.component';

describe('PingTestComponent', () => {
  let component: PingTestComponent;
  let fixture: ComponentFixture<PingTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PingTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PingTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});