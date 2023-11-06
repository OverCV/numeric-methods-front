import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoldyComponent } from './foldy.component';

describe('FoldyComponent', () => {
  let component: FoldyComponent;
  let fixture: ComponentFixture<FoldyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FoldyComponent]
    });
    fixture = TestBed.createComponent(FoldyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
