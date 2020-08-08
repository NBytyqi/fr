/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { GateItemComponent } from './gate-item.component';

describe('GateItemComponent', () => {
  let component: GateItemComponent;
  let fixture: ComponentFixture<GateItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GateItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GateItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
