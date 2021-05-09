import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { from } from 'rxjs';
import { JrReportDetailsService } from 'src/app/data/jr-report-details.service';
import { ReportDetailsService } from 'src/app/data/report-details.service';
import { AuthenticationService } from 'src/app/_helpers/authentication.service';
import {RenewedAmcs} from '../../data/RenewedAmcs/renewed-amcs'

@Component({
  selector: 'app-renewed-amcs-report',
  templateUrl: './renewed-amcs-report.component.html',
  styleUrls: ['./renewed-amcs-report.component.scss']
})
export class RenewedAmcsReportComponent implements OnInit {

renewedAmcs : MatTableDataSource<RenewedAmcs>;
public isLoadingResults = true;
public resultsLength = 0;

  constructor(
    private jrReportDetailsService: JrReportDetailsService,
    public _authentication: AuthenticationService,
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
      this.renewedAmcs = new MatTableDataSource(data);
      this.isLoadingResults=false;
      this.resultsLength = this.renewedAmcs.data.length;
    })
  }
  viewPdf() {
    this.jrReportDetailsService.viewPdf(this._authentication.userId).subscribe(
      response => {
        let url = URL.createObjectURL(response);
        window.open(url, '_blank');
        URL.revokeObjectURL(url);
      });
  }
  displayedColumns: string[] = [    'amc_no','amc_serial_no','mtc_start_date','client_name','department_name',
  'category_name','mtc_qty','frequency','currency_name','exchage_rate','total_value_lkr', ];

}
