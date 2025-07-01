import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  registerForm = this.fb.group({
    fullname: ['', Validators.required],
    email: ['', [Validators.required, Validators.email, Validators.pattern(/^[^ ]+@gmail\.com$/)]],
    password: ['', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/)
    ]],
    confirmPassword: ['', Validators.required]
  });

  constructor(private fb: FormBuilder, private router: Router) {}

  onSubmit() {
    const {  fullname, email, password, confirmPassword } = this.registerForm.value;
    if (password !== confirmPassword) {
      this.registerForm.get('confirmPassword')?.setErrors({ mismatch: true });
      return;
    }

     if (this.registerForm.valid) {
      const loggedInUser = { fullname, email, password };
      localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
      this.router.navigate(['/login']);
    } else {
      this.registerForm.markAllAsTouched();
    }
  }

}
