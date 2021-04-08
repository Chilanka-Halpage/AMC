import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { from } from 'rxjs';
import { ReportDetailsService } from '../../data/report-details.service';
import { PaymentsDetails } from '../../data/PaymentsDetails/payments-details';

@Component({
  selector: 'app-payments-details',
  templateUrl: './payments-details.component.html',
  styleUrls: ['./payments-details.component.scss']
})
export class PaymentsDetailsComponent implements OnInit {

paymentsDetails : PaymentsDetails;

  constructor(
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
getPaymentDetails(date1,date2){
  this.allAmcsService.PaymentDetails(date1,date2).subscribe(
    data=>{
    this.paymentsDetails = data;
  })
}
displayedColumns: string[] = ['amc_no', 'client_id', 'client_name', 'product_name','frequency','currency_name',
'exchage_rate','mtc_amount_per_product','mtc_amount_per_product_lkr','total','total_lkr'];
}