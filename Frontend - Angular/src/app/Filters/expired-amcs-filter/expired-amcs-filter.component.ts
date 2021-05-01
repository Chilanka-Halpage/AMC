import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { JrReportDetailsService } from 'src/app/data/jr-report-details.service';
import { AuthenticationService } from 'src/app/_helpers/authentication.service';

@Component({
  selector: 'app-expired-amcs-filter',
  templateUrl: './expired-amcs-filter.component.html',
  styleUrls: ['./expired-amcs-filter.component.scss']
})
export class ExpiredAmcsFilterComponent implements OnInit {

  date=new Date();
  isLoadingResults ;

  constructor(
    public _authentication: AuthenticationService,
    private jrReportDetailsService:JrReportDetailsService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private datePipe: DatePipe,
    public dialogRef: MatDialogRef<ExpiredAmcsFilterComponent>
    ) { }

    expiredAmcsFilter = this.fb.group({
      date1: [''],
      date2: ['']
    },{
      validator: ConfirmedValidator('date1', 'date2')
    });
  ngOnInit(): void {
  }
  onSubmit(){
    this.isLoadingResults=true;
    let date1 = this.expiredAmcsFilter.value.date1;
    let date2 = this.expiredAmcsFilter.value.date2;
     let formatteddate1 = this.datePipe.transform(date1, "yyyy-MM-dd");
     let formatteddate2 = this.datePipe.transform(date2, "yyyy-MM-dd");
     //this.router.navigate(['expiredAmcs',formatteddate1,formatteddate2]);
    this.jrReportDetailsService.ExpiredAmcsJrReport(formatteddate1,formatteddate2,this._authentication.userId).subscribe(
      Response => {console.log("success", Response)
      this.isLoadingResults=false;
      this.dialogRef.close();
      this.router.navigate(['expiredAmcs',formatteddate1,formatteddate2]);
    },
      error => {console.log("Error!", error)
    });
}
get f(){
  return this.expiredAmcsFilter.controls;
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