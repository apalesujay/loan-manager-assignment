import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {
  credentials = {
    email: 'admin@example.com',
    password: 'password'
  };

  constructor(
    private router: Router
  ) { }

  // Guard for preventing the unauthorized access
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const isAuthorized = localStorage.getItem('isAuthorized');
    if (isAuthorized) {
      return true;
    }
    return this.router.navigate(['signin']);
  }

  // Method for user signin
  signIn(email: string, password: string) {
    if (email === this.credentials.email && password === this.credentials.password) {
      localStorage.setItem('isAuthorized', JSON.stringify(1));
      this.router.navigate(['']);
    }
  }

  // Method for user signout
  signOut() {
    localStorage.removeItem('isAuthorized');
    this.router.navigate(['signin']);
  }
}