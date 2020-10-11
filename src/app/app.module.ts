import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateLoanComponent } from './views/create-loan/create-loan.component';
import { ShowLoansComponent } from './views/show-loans/show-loans.component';
import { HeaderComponent } from './shared/header/header.component';
import { BodyComponent } from './shared/body/body.component';
import { FooterComponent } from './shared/footer/footer.component';
import { ContactFormComponent } from './views/contact-form/contact-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SigninComponent } from './views/signin/signin.component';
import { AuthService } from './services/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    CreateLoanComponent,
    ShowLoansComponent,
    HeaderComponent,
    BodyComponent,
    FooterComponent,
    ContactFormComponent,
    SigninComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
