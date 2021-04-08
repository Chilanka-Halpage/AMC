import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReportDetailsService } from 'src/app/data/report-details.service';
import { ExpiredAmcs } from '../../data/ExpiredAmcs/expired-amcs';

@Component({
  selector: 'app-expired-amcs-report',
  templateUrl: './expired-amcs-report.component.html',
  styleUrls: ['./expired-amcs-report.component.scss']
})
export class ExpiredAmcsReportComponent implements OnInit {

  expiredAmcs : ExpiredAmcs;
  
  constructor(
    private reportDetailsService: ReportDetailsService,
    private activatedRoute: ActivatedRoute,
    ) { }

    date1
    date2
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
    this.reportDetailsService.ExpiredAmcsDetails(date1,date2).subscribe(
      data=>{
      this.expiredAmcs = data;
    })
  }

  displayedColumns: string[] = [ 'amc_no','due_date','category_name','client_name','contact_no','frequency',
    'invoice_amt','total_value',];
}
