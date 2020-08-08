import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesCtrlComponent } from './sales-ctrl.component';

describe('SalesCtrlComponent', () => {
  let component: SalesCtrlComponent;
  let fixture: ComponentFixture<SalesCtrlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesCtrlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesCtrlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
