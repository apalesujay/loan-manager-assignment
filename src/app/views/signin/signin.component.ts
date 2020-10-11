import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  signinForm: FormGroup;

  constructor(
    private router: Router,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    // If user is already signed in then redirect user to home page
    const isAuthorized = localStorage.getItem('isAuthorized');
    if (isAuthorized === '1') {
      this.router.navigate(['']);
    } else {
      this.router.navigate(['signin']);
    }

    // Form Validation
    this.signinForm = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', [Validators.required, Validators.minLength(7)])
    });
  }

  // Method for signing in the user
  signIn() {
    return this.auth.signIn(this.signinForm.value.email, this.signinForm.value.password); 
  }

}
