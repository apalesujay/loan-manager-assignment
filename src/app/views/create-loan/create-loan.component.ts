import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-loan',
  templateUrl: './create-loan.component.html',
  styleUrls: ['./create-loan.component.scss']
})
export class CreateLoanComponent implements OnInit {
  emiForm: FormGroup;
  minimumInterestRate: number;
  minimumLoanAmount: number;
  minimumCalendar: string;
  maximumCalendar: string;
  floating: boolean;
  principal: number;
  rate: number;
  months: number;
  emi: number;
  total: number;
  alert: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.minimumInterestRate = 11.5;
    this.minimumLoanAmount = 100000;
    this.principal = this.minimumLoanAmount;
    this.rate = this.minimumInterestRate;
    this.months = 0;
    this.emi = 0;
    this.total = 0;
    this.alert = false;

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    
    // Minimum limit for calender to allow user to select date
    this.minimumCalendar = `${currentYear}-${currentMonth.toString().length === 1 ? '0'+ currentMonth : currentMonth}`;

    // Maximum limit for calendar to allow user to select date
    this.maximumCalendar = `${currentYear + 20}-${currentMonth.toString().length === 1 ? '0'+ currentMonth : currentMonth}`;

    // Form validation
    this.emiForm = this.formBuilder.group({
      'floating-loan': new FormControl(''),
      'loan-amount': new FormControl(this.minimumLoanAmount, [Validators.required]),
      'interest-rate': new FormControl(this.minimumInterestRate, [Validators.required]),
      'start-date': new FormControl('', [Validators.required]),
      'end-date': new FormControl('', [Validators.required])
    }, {
      //Custom validator
      validators: [this.compareDate('start-date', 'end-date')]
    });
  }

  // Custom validator function to check if end date is smaller than start date
  compareDate(
    controlName: string,
    matchingControlName: string
  ) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
  
      if (matchingControl.errors && !matchingControl.errors.small) {
        return;
      }
  
      if (control.value >= matchingControl.value) {
        matchingControl.setErrors({ small: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  // Method for fetching data from the form and sending the data to the next page
  onSubmit(): void {
    const formValues = this.emiForm.value;

    let loan = {
      type: this.floating ? 1 : 0, // 1 = floating loan
      principal: this.principal,
      rate: formValues['interest-rate'],
      start: formValues['start-date'],
      end: formValues['end-date'],
      emi: this.emi,
      months: this.months
    }

    this.router.navigate(['contact/details'], { queryParams: { loan: JSON.stringify(loan) } });
  }

  // Method to calculate emi and total amount payable
  onChange(): void {
    const formValues = this.emiForm.value;
    const start = new Date(formValues['start-date']);
    const end = new Date(formValues['end-date']);

    this.floating = formValues['floating-loan'];
    this.principal = formValues['loan-amount'];
    this.rate = formValues['interest-rate'];

    // Calculate EMI only if the loan is not floating and start date is less than end date
    if (!this.floating && start < end) {
      const years = end.getFullYear() - start.getFullYear();
      this.months = (years * 12) + (end.getMonth() - start.getMonth());

      const ratePerMonth = this.rate/(12*100);

      const numerator = this.principal * ratePerMonth * Math.pow(1 + ratePerMonth, this.months);
      const denominator = Math.pow(1 + ratePerMonth, this.months) - 1;

      // EMI
      this.emi = Math.ceil(numerator/denominator);

      // Total ammount payable
      this.total = this.emi * this.months;
    }
  }
}
