import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthService } from './services/auth.service';
import { ContactFormComponent } from './views/contact-form/contact-form.component';
import { CreateLoanComponent } from './views/create-loan/create-loan.component';
import { ShowLoansComponent } from './views/show-loans/show-loans.component';
import { SigninComponent } from './views/signin/signin.component';

const routes: Routes = [
  { path: 'signin', component: SigninComponent },
  { path: 'contact/details', component: ContactFormComponent, canActivate: [AuthService] },
  { path: 'loan/create', component: CreateLoanComponent, canActivate: [AuthService] },
  { path: '', component: ShowLoansComponent, canActivate: [AuthService] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
