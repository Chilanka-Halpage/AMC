import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { from } from 'rxjs';
import {RenewalAmcs} from '../../data/RenewalAmcs/renewal-amcs'
import { ReportDetailsService } from '../../data/report-details.service'

@Component({
  selector: 'app-renewal-amcs-report',
  templateUrl: './renewal-amcs-report.component.html',
  styleUrls: ['./renewal-amcs-report.component.scss']
})
export class RenewalAmcsReportComponent implements OnInit {

  renewalAmcs: RenewalAmcs;
  constructor(
    private reportDetailsService: ReportDetailsService,
    private activatedRoute: ActivatedRoute,
  ) { }
  date1 : any
  date2 : any
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.date1 = params.get('date1');
      this.date2 = params.get('date2');
      console.log(this.date1);
      console.log(this.date2)
      this.RenewalAmcsDetails(this.date1,this.date2);
  });
}

  RenewalAmcsDetails(date1,date2){
    this.reportDetailsService.RenewalAmcsDetails(date1,date2).subscribe(
      data=>{
      this.renewalAmcs = data;
    })
  }

  displayedColumns: string[] = [ 'amc_no','amc_serial_no','renewal','client_id','client_name',
  'category_name','frequency','currency_name','invoice_amount','total_value_lkr','mtc_qty', ];
}
