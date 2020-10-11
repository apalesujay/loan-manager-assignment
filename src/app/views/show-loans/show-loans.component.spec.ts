import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowLoansComponent } from './show-loans.component';

describe('ShowLoansComponent', () => {
  let component: ShowLoansComponent;
  let fixture: ComponentFixture<ShowLoansComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowLoansComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowLoansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
