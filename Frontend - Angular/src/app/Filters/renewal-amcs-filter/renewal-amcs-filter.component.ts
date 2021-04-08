import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { from } from 'rxjs';
import { JrReportDetailsService } from '../../data/jr-report-details.service';
import { RenewalAmcs } from '../../data/RenewalAmcs/renewal-amcs'

@Component({
  selector: 'app-renewal-amcs-filter',
  templateUrl: './renewal-amcs-filter.component.html',
  styleUrls: ['./renewal-amcs-filter.component.scss']
})
export class RenewalAmcsFilterComponent implements OnInit {

  renewalAmcs:RenewalAmcs;

  date=new Date();

  constructor(private route: ActivatedRoute,
    private router: Router,
    private jrReportDetailsService:JrReportDetailsService,
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
    this.date.setMonth(this.date.getMonth() +   numberValue);
    let formatteddate2 = this.datePipe.transform(this.date, "yyyy-MM-dd");
    console.log(formatteddate2);
    this.router.navigate(['renewalAmcs',formatteddate1,formatteddate2]);
  
    this.jrReportDetailsService.RenewalAmcsJrReport(formatteddate1,formatteddate2).subscribe(
      Response => {console.log("success", Response)
    },
      error => {console.log("Error!", error)
    }
    )
  }
}


