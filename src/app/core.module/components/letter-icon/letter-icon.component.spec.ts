/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LetterIconComponent } from './letter-icon.component';

describe('LetterIconComponent', () => {
  let component: LetterIconComponent;
  let fixture: ComponentFixture<LetterIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LetterIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LetterIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});