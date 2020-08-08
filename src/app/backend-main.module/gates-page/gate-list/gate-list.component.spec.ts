/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { GateListComponent } from './gate-list.component';

describe('GateListComponent', () => {
  let component: GateListComponent;
  let fixture: ComponentFixture<GateListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GateListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GateListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
