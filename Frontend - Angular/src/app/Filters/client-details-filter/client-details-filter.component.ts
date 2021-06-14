import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import{ DatePipe} from '@angular/common'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ClientDetailsService } from '../../data/client-details/client-details.service'
import { from } from 'rxjs';
import { JrReportDetailsService } from '../../data/jr-report-details.service'
import { ClientDetails } from 'src/app/data/client-details/client-details';
import { AuthenticationService } from 'src/app/_helpers/authentication.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-client-details-filter',
  templateUrl: './client-details-filter.component.html',
  styleUrls: ['./client-details-filter.component.scss']
})
export class ClientDetailsFilterComponent implements OnInit {
  clientDetails: ClientDetails;
  isLoadingResults ;
  
  constructor(
    public _authentication: AuthenticationService,
    private jrReportDetailsService:JrReportDetailsService,
    private route: ActivatedRoute,
    private router: Router,
    private clientDetailsService: ClientDetailsService,
    private fb: FormBuilder,
    private datePipe: DatePipe,
    public dialogRef: MatDialogRef<ClientDetailsFilterComponent>
    ) { } 

    clientDetailsFilter = this.fb.group({
      date1: [''],
      date2: ['']
    },{
      validator: ConfirmedValidator('date1', 'date2')
    });

  ngOnInit(): void {
 
  }
  onSubmit(){
    this.isLoadingResults=true;
    let date1 = this.clientDetailsFilter.value.date1;
    let date2 = this.clientDetailsFilter.value.date2;
     let formatteddate1 = this.datePipe.transform(date1, "yyyy-MM-dd");
     let formatteddate2 = this.datePipe.transform(date2, "yyyy-MM-dd");
      this.router.navigate(['clientDetails',formatteddate1,formatteddate2]);
}

get f(){
  return this.clientDetailsFilter.controls;
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
