import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {RenewedAmcs} from '../../data/RenewedAmcs/renewed-amcs';
import {JrReportDetailsService} from '../../data/jr-report-details.service'
import { AuthenticationService } from 'src/app/_helpers/authentication.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-renewed-amcs-filter',
  templateUrl: './renewed-amcs-filter.component.html',
  styleUrls: ['./renewed-amcs-filter.component.scss']
})
export class RenewedAmcsFilterComponent implements OnInit {

  renewedAmcs: RenewedAmcs;
  isLoadingResults ;
  date=new Date();

  constructor(
    public _authentication: AuthenticationService,
    private jrReportDetailsService:JrReportDetailsService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private datePipe: DatePipe,
    public dialogRef: MatDialogRef<RenewedAmcsFilterComponent>
  ) { }

  RenewedAmcsFilter = this.fb.group({
    num: ['']
  });

  ngOnInit(): void {
  }

  onSubmit(){
    this.isLoadingResults=true;
    let a = this.RenewedAmcsFilter.value.num;
    let formatteddate1 = this.datePipe.transform(this.date, "yyyy-MM-dd");
    console.log(formatteddate1);
    let numberValue = Number(a);
    console.log(numberValue);
    this.date.setMonth(this.date.getMonth() - numberValue);
    let formatteddate2 = this.datePipe.transform(this.date, "yyyy-MM-dd");
    console.log(formatteddate2);
    
    this.router.navigate(['renewedAmcs',formatteddate2,formatteddate1]);
  }

}
