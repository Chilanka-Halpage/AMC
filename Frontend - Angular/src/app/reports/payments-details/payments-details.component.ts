import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { from } from 'rxjs';
import { ReportDetailsService } from '../../data/report-details.service';
import { PaymentsDetails } from '../../data/PaymentsDetails/payments-details';
import { JrReportDetailsService } from 'src/app/data/jr-report-details.service';
import { AuthenticationService } from 'src/app/_helpers/authentication.service';
import { MatTableDataSource } from '@angular/material/table';
import { NotificationService } from 'src/app/shared/notification.service';

@Component({
  selector: 'app-payments-details',
  templateUrl: './payments-details.component.html',
  styleUrls: ['./payments-details.component.scss']
})
export class PaymentsDetailsComponent implements OnInit {

paymentsDetails : MatTableDataSource<PaymentsDetails>;
public isLoadingResults = true;
public isRateLimitReached =false;
public resultsLength = 0;
date1 : any
date2 : any
category : String

  constructor(
    private jrReportDetailsService: JrReportDetailsService,
    public _authentication: AuthenticationService,
    private allAmcsService: ReportDetailsService,
    private activatedRoute: ActivatedRoute,
    private notificationService: NotificationService,
  ) { }


  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.date1 = params.get('date1');
      this.date2 = params.get('date2');
      this.category = params.get('category');
      this.getPaymentDetails(this.date1,this.date2,this.category);
  });
}
applyFilter(event: Event): void {
  const filterValue = (event.target as HTMLInputElement).value;
  this.paymentsDetails.filter = filterValue.trim().toLowerCase();
}
getPaymentDetails(date1,date2,category){
  this.allAmcsService.PaymentDetails(date1,date2,category).subscribe(
    data=>{
    this.paymentsDetails = new MatTableDataSource(data);
    this.isLoadingResults=false;
    this.resultsLength = this.paymentsDetails.data.length;
  },
  (error)=>{
    const errMessage =(error.status === 0 || error.status===401 || error.status===403)?error.error : 'Cannot proceed the request. try again!'
    this.notificationService.showNoitfication(errMessage, 'OK', 'error', null);
    this.isLoadingResults=false;
  })
}
PaymentsDetailsJrReport(){
  this.isLoadingResults=true;
  this.jrReportDetailsService.PaymentsDetailsJrReport(this.date1,this.date2,this.category,this._authentication.userId).subscribe(
  Response => {console.log("success", Response)
  this.isLoadingResults=false;
  this.viewPdf()
},
(error)=>{
  const errMessage =(error.status === 0 || error.status===401 || error.status===403)?error.error : 'Cannot proceed the request. try again!'
  this.notificationService.showNoitfication(errMessage, 'OK', 'error', null);
  this.isLoadingResults=false;
});
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
displayedColumns: string[] = ['amc_no', 'client_name', 'department_name', 'product_name','frequency','currency_name',
'exchange_rate','mtc_amount_for_given_frequency_lkr','rec_no','pay_mode','total_lkr'];
}
