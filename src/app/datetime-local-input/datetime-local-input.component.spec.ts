import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatetimeLocalInputComponent } from './datetime-local-input.component';

describe('DatetimeLocalInputComponent', () => {
  let component: DatetimeLocalInputComponent;
  let fixture: ComponentFixture<DatetimeLocalInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatetimeLocalInputComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DatetimeLocalInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
