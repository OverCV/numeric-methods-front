import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproxFormComponent } from './approx-form.component';

describe('ApproxFormComponent', () => {
  let component: ApproxFormComponent;
  let fixture: ComponentFixture<ApproxFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApproxFormComponent]
    });
    fixture = TestBed.createComponent(ApproxFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
