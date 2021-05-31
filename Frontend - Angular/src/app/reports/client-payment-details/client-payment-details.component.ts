import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { from } from 'rxjs';
import { JrReportDetailsService } from 'src/app/data/jr-report-details.service';
import { ReportDetailsService } from 'src/app/data/report-details.service';
import { NotificationService } from 'src/app/shared/notification.service';
import { AuthenticationService } from 'src/app/_helpers/authentication.service';
import { ClientPaymentDetails } from '../../data/ClientPaymentDetails/client-payment-details'

@Component({
  selector: 'app-client-payment-details',
  templateUrl: './client-payment-details.component.html',
  styleUrls: ['./client-payment-details.component.scss']
})
export class ClientPaymentDetailsComponent implements OnInit {

  clientPaymentDetails: MatTableDataSource<ClientPaymentDetails>;
  cId : any;
  public isLoadingResults = true;
  public isRateLimitReached =false;
  public resultsLength = 0;
  
  constructor(
    private jrReportDetailsService: JrReportDetailsService,
    public _authentication: AuthenticationService,
    private activatedRoute: ActivatedRoute,
    private reportDetailsService: ReportDetailsService,
    private notificationService: NotificationService,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.cId = params.get('cId');
      this.ClientPaymentDetails(this.cId);
  });
  }
  ClientPaymentDetails(cId){
    this.reportDetailsService.ClientPayment(cId).subscribe(
      data=>{
      this.clientPaymentDetails = new MatTableDataSource(data);
      this.isLoadingResults=false;
      this.resultsLength = this.clientPaymentDetails.data.length;
    },
    (error)=>{
      const errMessage =(error.status === 0 || error.status===401 || error.status===403)?error.error : 'Cannot proceed the request. try again!'
      this.notificationService.showNoitfication(errMessage, 'OK', 'error', null);
      this.isLoadingResults=false;
    });
  }

  ClientPaymentJrReport(){
    this.isLoadingResults=true;
    this.jrReportDetailsService.ClientPaymentJrReport(this._authentication.userId).subscribe(
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
      },
      (error)=>{
        const errMessage =(error.status === 0 || error.status===401 || error.status===403)?error.error : 'Cannot proceed the request. try again!'
        this.notificationService.showNoitfication(errMessage, 'OK', 'error', null);
      });
  }
  displayedColumns: string[] = ['amc_no', 'department_name', 'rec_date','rec_no',
  'product_name','currency_name','exchange_rate','pay_mode','total','balance'];
}
