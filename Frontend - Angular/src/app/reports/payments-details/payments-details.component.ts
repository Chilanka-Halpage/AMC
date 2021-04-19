import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { from } from 'rxjs';
import { ReportDetailsService } from '../../data/report-details.service';
import { PaymentsDetails } from '../../data/PaymentsDetails/payments-details';
import { JrReportDetailsService } from 'src/app/data/jr-report-details.service';
import { AuthenticationService } from 'src/app/_helpers/authentication.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-payments-details',
  templateUrl: './payments-details.component.html',
  styleUrls: ['./payments-details.component.scss']
})
export class PaymentsDetailsComponent implements OnInit {

paymentsDetails : MatTableDataSource<PaymentsDetails>;

  constructor(
    private jrReportDetailsService: JrReportDetailsService,
    public _authentication: AuthenticationService,
    private allAmcsService: ReportDetailsService,
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
      this.getPaymentDetails(this.date1,this.date2);
  });
}
applyFilter(event: Event): void {
  const filterValue = (event.target as HTMLInputElement).value;
  this.paymentsDetails.filter = filterValue.trim().toLowerCase();
}
getPaymentDetails(date1,date2){
  this.allAmcsService.PaymentDetails(date1,date2).subscribe(
    data=>{
    this.paymentsDetails = new MatTableDataSource(data);
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
displayedColumns: string[] = ['amc_no', 'client_id', 'client_name', 'product_name','frequency','currency_name',
'exchage_rate','mtc_amount_per_product','mtc_amount_per_product_lkr','total','total_lkr'];
}