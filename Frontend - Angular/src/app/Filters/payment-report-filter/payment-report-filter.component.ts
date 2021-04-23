import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { JrReportDetailsService } from 'src/app/data/jr-report-details.service';
import { AuthenticationService } from 'src/app/_helpers/authentication.service';

@Component({
  selector: 'app-payment-report-filter',
  templateUrl: './payment-report-filter.component.html',
  styleUrls: ['./payment-report-filter.component.scss']
})
export class PaymentReportFilterComponent implements OnInit {

  constructor(
    private jrReportDetailsService:JrReportDetailsService,
    public _authentication: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private datePipe: DatePipe,
  ) { }

  
  paymentReportsFilter = this.fb.group({
    date1: [''],
    date2: ['']
  },{
    validator: ConfirmedValidator('date1', 'date2')
  });
  
  ngOnInit(): void {}
  onSubmit(){
    let date1 = this.paymentReportsFilter.value.date1;
    let date2 = this.paymentReportsFilter.value.date2;
     let formatteddate1 = this.datePipe.transform(date1, "yyyy-MM-dd");
     let formatteddate2 = this.datePipe.transform(date2, "yyyy-MM-dd");
    //this.router.navigate(['paymentDetails',formatteddate1,formatteddate2]);
    console.log(formatteddate1);
    console.log(formatteddate2);
    this.jrReportDetailsService.PaymentsDetailsJrReport(formatteddate1,formatteddate2,this._authentication.userId).subscribe(
      Response => {console.log("success", Response)
      this.router.navigate(['paymentDetails',formatteddate1,formatteddate2]);
    },
      error => {console.log("Error!", error)
    });
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
    } else {
      matchingControl.setErrors(null);
    }
  }
}