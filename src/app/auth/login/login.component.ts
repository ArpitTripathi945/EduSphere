import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

   loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  constructor(private fb: FormBuilder, private router: Router) {}

  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const { email, password } = this.loginForm.value;
    const storedUser = JSON.parse(localStorage.getItem('loggedInUser') || '{}');

    if (storedUser?.email === email && storedUser?.password === password) {
      localStorage.setItem('isLoggedIn', 'true');
      this.router.navigate(['/']);
    } else {
      alert('Invalid credentials. Please try again.');
    }
  }

}
