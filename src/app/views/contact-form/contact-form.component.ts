import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {
  contactForm: FormGroup;
  loan: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Form validation
    this.contactForm = new FormGroup({
      'first-name': new FormControl('', [Validators.required, Validators.maxLength(20)]),
      'last-name': new FormControl('', [Validators.required, Validators.maxLength(20)]),
      'mobile-no': new FormControl('', [Validators.required, Validators.min(6000000000), Validators.maxLength(9999999999)]),
      'email': new FormControl('', [Validators.required, Validators.email]),
      'address': new FormControl('', [Validators.required, Validators.maxLength(200)]),
      'city': new FormControl('', [Validators.required, Validators.maxLength(30)]),
      'state': new FormControl('', [Validators.required, Validators.maxLength(30)]),
      'pin': new FormControl('', [Validators.required, Validators.min(100000), Validators.max(999999)])
    });

    // Fetch the query parameters from the url
    this.route.queryParamMap.subscribe((params) => {
      this.loan = JSON.parse(params.get('loan'));
    });
  }

  // Method for saving data to the local storage and navigate to home page
  onSubmit(): void {
    // Get data from the form
    const formValues = this.contactForm.value;
    this.loan.firstName = this.contactForm.value['first-name'],
    this.loan.lastName = this.contactForm.value['last-name'],
    this.loan.mobile = this.contactForm.value['mobile-no'],
    this.loan.email = this.contactForm.value['email'],
    this.loan.address = `${this.contactForm.value['address']}, ${this.contactForm.value['city']}, ${this.contactForm.value['state']} - ${this.contactForm.value['pin']}`

    let data = localStorage.getItem('data');

    // Store data into browser's local storage
    if (!data) {
      localStorage.setItem('data', JSON.stringify([this.loan]));
    } else {
      localStorage.removeItem('data');
      let newData = Array.from(JSON.parse(data));
      newData.push(this.loan);
      localStorage.setItem('data', JSON.stringify(newData));
    }
    // Navigate to home page
    this.router.navigate(['']);
  }
}
