import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { from } from 'rxjs';
import { JrReportDetailsService } from 'src/app/data/jr-report-details.service';
import { ReportDetailsService } from 'src/app/data/report-details.service';
import { NotificationService } from 'src/app/shared/notification.service';
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
public isRateLimitReached =false;
public resultsLength = 0;

  constructor(
    private jrReportDetailsService: JrReportDetailsService,
    public _authentication: AuthenticationService,
    private reportDetailsService: ReportDetailsService,
    private activatedRoute: ActivatedRoute,
    private notificationService: NotificationService,
    ) { }

    date1
    date2
    ngOnInit(): void {
      this.activatedRoute.paramMap.subscribe(params => {
        this.date1 = params.get('date1');
        this.date2 = params.get('date2');
        this.renewedAmcsDetails(this.date1,this.date2);
    });
  }
  renewedAmcsDetails(date1,date2){
    this.reportDetailsService.RenewedAmcsDetails(date1,date2).subscribe(
      data=>{
      this.renewedAmcs = new MatTableDataSource(data);
      this.isLoadingResults=false;
      this.resultsLength = this.renewedAmcs.data.length;
    },
    (error)=>{
      const errMessage =(error.status === 0 || error.status===401 || error.status===403)?error.error : 'Cannot proceed the request. try again!'
      this.notificationService.showNoitfication(errMessage, 'OK', 'error', null);
      this.isLoadingResults=false;
    })
  }

  renewedAmcsJrReport(){
    this.isLoadingResults=true;
    this.jrReportDetailsService.RenewedAmcsJrReport(this.date1,this.date2,this._authentication.userId).subscribe(
      Response => {console.log("success", Response)
      this.isLoadingResults=false;
      this.viewPdf()
    },
    (error)=>{
      const errMessage =(error.status === 0 || error.status===401 || error.status===403)?error.error : 'Cannot proceed the request. try again!'
      this.notificationService.showNoitfication(errMessage, 'OK', 'error', null);
      this.isLoadingResults=false;
    }
    )
  }

  viewPdf() {
    this.jrReportDetailsService.viewPdf(this._authentication.userId).subscribe(
      response => {
        let url = URL.createObjectURL(response);
        window.open(url, '_blank');
        URL.revokeObjectURL(url);
      },
      (error)=>{
        const errMessage =(error.status === 0 || error.status===401 || error.status===403)?error.error : 'Cannot proceed the request. try again!'
        this.notificationService.showNoitfication(errMessage, 'OK', 'error', null);
      });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.renewedAmcs.filter = filterValue.trim().toLowerCase();
  }
  
  displayedColumns: string[] = [    'amc_no','amc_serial_no','mtc_start_date','client_name','department_name',
  'category_name','mtc_qty','frequency','currency_name','exchange_rate','total_value_lkr', ];

}
