import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { from } from 'rxjs';
import { JrReportDetailsService } from '../../data/jr-report-details.service';
import { FullDetails } from '../../data/FullDetails/full-details'
import { AuthenticationService } from 'src/app/_helpers/authentication.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-full-details-filter',
  templateUrl: './full-details-filter.component.html',
  styleUrls: ['./full-details-filter.component.scss']
})
export class FullDetailsFilterComponent implements OnInit {

  FullDetails: FullDetails;
  isLoadingResults ;

  constructor(
    public _authentication: AuthenticationService,
    private activatedRoute: ActivatedRoute,
    private jrReportDetailsService:JrReportDetailsService,
    private router: Router,
    private fb: FormBuilder,
    private datePipe: DatePipe,
    public dialogRef: MatDialogRef<FullDetailsFilterComponent>
    ) { } 

      fullDetailsFilter = this.fb.group({
      date1: [''],
      date2: ['']
    },{
      validator: ConfirmedValidator('date1', 'date2')
    });

  ngOnInit(): void {
 
  }
 
  onSubmit(){
    let date1 = this.fullDetailsFilter.value.date1;
    let date2 = this.fullDetailsFilter.value.date2;
     let formatteddate1 = this.datePipe.transform(date1, "yyyy-MM-dd");
     let formatteddate2 = this.datePipe.transform(date2, "yyyy-MM-dd");
      this.router.navigate(['fullDetails',formatteddate1,formatteddate2]);
}
get f(){
  return this.fullDetailsFilter.controls;
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