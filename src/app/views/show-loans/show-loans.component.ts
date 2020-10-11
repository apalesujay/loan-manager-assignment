import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-show-loans',
  templateUrl: './show-loans.component.html',
  styleUrls: ['./show-loans.component.scss']
})
export class ShowLoansComponent implements OnInit {
  data: any[];
  showData: any[];

  constructor() { }

  ngOnInit(): void {
    this.data = JSON.parse(localStorage.getItem('data'));
    this.showData = this.data;
  }

  // Method for searching the loan record using name of the user
  search(e: any) {
    const query = e.target.value;

    if (query.length === 0) {
      return this.showData = this.data;
    }
    this.showData = this.data.filter((item) => {
      return item.firstName .toLowerCase().includes(query.toLowerCase()) || item.lastName .toLowerCase().includes(query.toLowerCase());
    });
  }

}
