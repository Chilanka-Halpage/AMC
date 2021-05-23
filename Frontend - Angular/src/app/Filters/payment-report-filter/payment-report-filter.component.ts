import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { JrReportDetailsService } from 'src/app/data/jr-report-details.service';
import { AmcMasterService } from 'src/app/shared/amc-master.service';
import { AuthenticationService } from 'src/app/_helpers/authentication.service';

@Component({
  selector: 'app-payment-report-filter',
  templateUrl: './payment-report-filter.component.html',
  styleUrls: ['./payment-report-filter.component.scss']
})
export class PaymentReportFilterComponent implements OnInit {

  categoryList = [];
  isLoadingResults ;
  public errorMessage = "Unknown Error"

  constructor(
    private jrReportDetailsService:JrReportDetailsService,
    public _authentication: AuthenticationService,
    private amcMasterservice: AmcMasterService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private datePipe: DatePipe,
    public dialogRef: MatDialogRef<PaymentReportFilterComponent>
  ) { }

  
  paymentReportsFilter = this.fb.group({
    date1: [''],
    date2: [''],
    category: ['']
  },{
    validator: ConfirmedValidator('date1', 'date2')
  });
  
  ngOnInit(): void {
    this.loadSelectionData();
  }

  private loadSelectionData(){
    let categoryListLoad = false;
    this.amcMasterservice.getCategory().subscribe(response => {
      this.categoryList = response;
      this.isLoadingResults = (categoryListLoad = true) ? false : true;
    }, error => {
      this.isLoadingResults = false;
      this.errorMessage = error;
    });
  }

  onSubmit(){
    this.isLoadingResults=true;
    let date1 = this.paymentReportsFilter.value.date1;
    let date2 = this.paymentReportsFilter.value.date2;
    let category = this.paymentReportsFilter.value.category;
     let formatteddate1 = this.datePipe.transform(date1, "yyyy-MM-dd");
     let formatteddate2 = this.datePipe.transform(date2, "yyyy-MM-dd");
    //this.router.navigate(['paymentDetails',formatteddate1,formatteddate2]);
    console.log(formatteddate1);
    console.log(formatteddate2);
      this.router.navigate(['paymentDetails',formatteddate1,formatteddate2,category]);
  }
  get f(){
    return this.paymentReportsFilter.controls;
  }
}
export function ConfirmedValidator(fromDate: string, toDate: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[fromDate];
    const matchingControl = formGroup.controls[toDate];
    if (matchingControl.errors && !matchingControl.errors.confirmedValidator) {
      return;
    }
    if (control.value > matchingControl.value) {
      matchingControl.setErrors({ confirmedValidator: true });
      control.setErrors({ confirmedValidator: true });
    } else {
      matchingControl.setErrors(null);
    }
  }
}