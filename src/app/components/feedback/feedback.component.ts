import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
  feedbackForm!: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.feedbackForm = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.pattern('^[a-zA-Z ]+$')
        ]
      ],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  get f() {
    return this.feedbackForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.feedbackForm.invalid) {
      return;
    }

    console.log('Feedback submitted:', this.feedbackForm.value);

    // Optionally reset the form
    this.feedbackForm.reset();
    this.submitted = false;
  }
}
