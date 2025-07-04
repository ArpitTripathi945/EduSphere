import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeedbackComponent } from './feedback.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('FeedbackComponent', () => {
  let component: FeedbackComponent;
  let fixture: ComponentFixture<FeedbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FeedbackComponent],
      imports: [ReactiveFormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(FeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have invalid form when fields are empty', () => {
    expect(component.feedbackForm.invalid).toBeTrue();
  });

  it('should validate form correctly with valid inputs', () => {
    component.feedbackForm.setValue({
      name: 'John Doe',
      email: 'john@example.com',
      message: 'This is valid feedback message.'
    });

    expect(component.feedbackForm.valid).toBeTrue();
  });

  it('should set submitted to true when onSubmit is called', () => {
    component.onSubmit();
    expect(component.submitted).toBeTrue();
  });

  it('should reset form and submitted when form is valid', () => {
    spyOn(console, 'log'); // Optional: to spy on the console.log
    component.feedbackForm.setValue({
      name: 'Jane',
      email: 'jane@example.com',
      message: 'Great website!'
    });

    component.onSubmit();

    expect(component.feedbackForm.value).toEqual({
      name: null,
      email: null,
      message: null
    });
    expect(component.submitted).toBeFalse();
  });
});
