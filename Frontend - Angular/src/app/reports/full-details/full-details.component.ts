import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { from } from 'rxjs';
import {FullDetails} from '../../data/FullDetails/full-details';
import { ReportDetailsService } from '../../data/report-details.service'

@Component({
  selector: 'app-full-details',
  templateUrl: './full-details.component.html',
  styleUrls: ['./full-details.component.scss']
})
export class FullDetailsComponent implements OnInit {

  fullDetails: FullDetails;
  constructor(
    private activatedRoute: ActivatedRoute,
    private reportDetailsService: ReportDetailsService,
    private datePipe: DatePipe,
  ) { }
  date1
  date2
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.date1 = params.get('date1');
      this.date2 = params.get('date2');
      console.log(this.date1);
      console.log(this.date2)
      this.getFullDetails(this.date1,this.date2);
    });
  }
  getFullDetails(date1,date2){
    this.reportDetailsService.FullDetails(date1,date2)
     .subscribe(
      data=>{
      this.fullDetails = data;
     })

  };
  displayedColumns: string[] = [    'amc_no', 'amc_serial_no','client_name','product_name', 'category_name' ,'mtc_start_date' ,
  'mtc_end_date', 'frequency','mtc_amount_for_given_frequency',  'total_value_lkr',  'active', ];

}
