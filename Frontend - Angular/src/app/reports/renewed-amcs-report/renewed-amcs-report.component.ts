import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { from } from 'rxjs';
import { ReportDetailsService } from 'src/app/data/report-details.service';
import {RenewedAmcs} from '../../data/RenewedAmcs/renewed-amcs'

@Component({
  selector: 'app-renewed-amcs-report',
  templateUrl: './renewed-amcs-report.component.html',
  styleUrls: ['./renewed-amcs-report.component.scss']
})
export class RenewedAmcsReportComponent implements OnInit {

renewedAmcs : RenewedAmcs;
  constructor(
    private reportDetailsService: ReportDetailsService,
    private activatedRoute: ActivatedRoute,) { }

    date1
    date2
    ngOnInit(): void {
      this.activatedRoute.paramMap.subscribe(params => {
        this.date1 = params.get('date1');
        this.date2 = params.get('date2');
        console.log(this.date1);
        console.log(this.date2)
        this.renewedAmcsDetails(this.date1,this.date2);
    });
  }
  renewedAmcsDetails(date1,date2){
    this.reportDetailsService.RenewedAmcsDetails(date1,date2).subscribe(
      data=>{
      this.renewedAmcs = data;
    })
  }
  displayedColumns: string[] = [    'amc_no','amc_serial_no','mtc_end_date','client_name',
  'category_name','mtc_qty','frequency','currency_name','exchage_rate','invoice_amount','total_value_lkr', ];

}
