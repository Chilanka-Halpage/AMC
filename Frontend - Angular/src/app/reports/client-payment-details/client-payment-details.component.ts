import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { from } from 'rxjs';
import { JrReportDetailsService } from 'src/app/data/jr-report-details.service';
import { ReportDetailsService } from 'src/app/data/report-details.service';
import { AuthenticationService } from 'src/app/_helpers/authentication.service';
import { ClientPaymentDetails } from '../../data/ClientPaymentDetails/client-payment-details'

@Component({
  selector: 'app-client-payment-details',
  templateUrl: './client-payment-details.component.html',
  styleUrls: ['./client-payment-details.component.scss']
})
export class ClientPaymentDetailsComponent implements OnInit {

  clientPaymentDetails: ClientPaymentDetails;
  cId 
  constructor(
    private jrReportDetailsService: JrReportDetailsService,
    public _authentication: AuthenticationService,
    private activatedRoute: ActivatedRoute,
    private reportDetailsService: ReportDetailsService,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.cId = params.get('cId');
      console.log(this.cId);
      this.ClientPaymentDetails(this.cId);
  });
  }
  ClientPaymentDetails(cId){
    this.reportDetailsService.ClientPayment(cId).subscribe(
      data=>{
      this.clientPaymentDetails = data;
    });
  }

  viewPdf() {
    this.jrReportDetailsService.viewPdf(this._authentication.userId).subscribe(
      response => {
        let url = URL.createObjectURL(response);
        window.open(url, '_blank');
        URL.revokeObjectURL(url);
      });
  }
  displayedColumns: string[] = ['amc_no','amc_serial_no', 'rec_date', 'product_name','currency_name',
  'exchage_rate','total','total_lkr'];
}
