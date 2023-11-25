import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConstFormComponent } from './const-form.component';

describe('ConstFormComponent', () => {
  let component: ConstFormComponent;
  let fixture: ComponentFixture<ConstFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConstFormComponent]
    });
    fixture = TestBed.createComponent(ConstFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
