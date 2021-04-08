import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {RenewedAmcs} from '../../data/RenewedAmcs/renewed-amcs';
import {JrReportDetailsService} from '../../data/jr-report-details.service'

@Component({
  selector: 'app-renewed-amcs-filter',
  templateUrl: './renewed-amcs-filter.component.html',
  styleUrls: ['./renewed-amcs-filter.component.scss']
})
export class RenewedAmcsFilterComponent implements OnInit {

  renewedAmcs: RenewedAmcs;

  date=new Date();

  constructor(
    private jrReportDetailsService:JrReportDetailsService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private datePipe: DatePipe,
  ) { }

  RenewalAmcsFilter = this.fb.group({
    num: ['']
  });

  ngOnInit(): void {
  }

  onSubmit(){
    let a = this.RenewalAmcsFilter.value.num;
    let formatteddate1 = this.datePipe.transform(this.date, "yyyy-MM-dd");
    console.log(formatteddate1);
    let numberValue = Number(a);
    this.date.setMonth(this.date.getMonth() - numberValue);
    let formatteddate2 = this.datePipe.transform(this.date, "yyyy-MM-dd");
    console.log(formatteddate2);
    
    this.router.navigate(['renewedAmcs',formatteddate2,formatteddate1]);
    this.jrReportDetailsService.RenewedAmcsJrReport(formatteddate1,formatteddate2).subscribe(
      Response => {console.log("success", Response)
    },
      error => {console.log("Error!", error)
    }
    )
  }

}
