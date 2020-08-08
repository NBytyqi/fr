import { NO_ERRORS_SCHEMA } from "@angular/core";
import { NotFoundComponent } from "./not-found.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("NotFoundComponent", () => {

  let fixture: ComponentFixture<NotFoundComponent>;
  let component: NotFoundComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [NotFoundComponent]
    });

    fixture = TestBed.createComponent(NotFoundComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});
