import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { from } from 'rxjs';
import { AuthenticationService } from 'src/app/_helpers/authentication.service';
import { JrReportDetailsService } from '../../data/jr-report-details.service';
import { RenewalAmcs } from '../../data/RenewalAmcs/renewal-amcs'

@Component({
  selector: 'app-renewal-amcs-filter',
  templateUrl: './renewal-amcs-filter.component.html',
  styleUrls: ['./renewal-amcs-filter.component.scss']
})
export class RenewalAmcsFilterComponent implements OnInit {

  renewalAmcs:RenewalAmcs;
  isLoadingResults ;
  date=new Date();

  constructor(
    public _authentication: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router,
    private jrReportDetailsService:JrReportDetailsService,
    private fb: FormBuilder,
    private datePipe: DatePipe,
    public dialogRef: MatDialogRef<RenewalAmcsFilterComponent>
    ) { }

  RenewalAmcsFilter = this.fb.group({
    num: ['']
  });

  ngOnInit(): void {
  }
  
  onSubmit(){
    this.isLoadingResults=true;
    let a = this.RenewalAmcsFilter.value.num;
    let formatteddate1 = this.datePipe.transform(this.date, "yyyy-MM-dd");
    console.log(formatteddate1);
    let numberValue = Number(a);
    console.log(numberValue);
    this.date.setMonth(this.date.getMonth() +   numberValue);
    let formatteddate2 = this.datePipe.transform(this.date, "yyyy-MM-dd");
    console.log(formatteddate2);
    this.router.navigate(['renewalAmcs',formatteddate1,formatteddate2]);
  }
}


