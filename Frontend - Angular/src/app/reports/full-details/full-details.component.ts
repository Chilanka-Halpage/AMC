import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { from } from 'rxjs';
import { JrReportDetailsService } from 'src/app/data/jr-report-details.service';
import { NotificationService } from 'src/app/shared/notification.service';
import { AuthenticationService } from 'src/app/_helpers/authentication.service';
import {FullDetails} from '../../data/FullDetails/full-details';
import { ReportDetailsService } from '../../data/report-details.service'

@Component({
  selector: 'app-full-details',
  templateUrl: './full-details.component.html',
  styleUrls: ['./full-details.component.scss']
})
export class FullDetailsComponent implements OnInit {

  fullDetails: MatTableDataSource<FullDetails>;
  public isLoadingResults = true;
  public isRateLimitReached =false;
  public resultsLength = 0;
  date1
  date2
  constructor(
    private jrReportDetailsService: JrReportDetailsService,
    public _authentication: AuthenticationService,
    private activatedRoute: ActivatedRoute,
    private reportDetailsService: ReportDetailsService,
    private datePipe: DatePipe,
    private notificationService: NotificationService,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.date1 = params.get('date1');
      this.date2 = params.get('date2');
      console.log(this.date1);
      console.log(this.date2)
      this.getFullDetails(this.date1,this.date2);
    });
  }
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.fullDetails.filter = filterValue.trim().toLowerCase();
  }
  getFullDetails(date1,date2){
    this.reportDetailsService.FullDetails(date1,date2)
     .subscribe(
      data=>{
      this.fullDetails = new MatTableDataSource(data);
      this.isLoadingResults=false;
      this.resultsLength = this.fullDetails.data.length;
     },
     error =>{
       this.isRateLimitReached=true;
     })
  }

  FullDetailsJrReport(){
    this.isLoadingResults=true;
    this.jrReportDetailsService.FullDetailsJrReport(this.date1,this.date2,this._authentication.userId).subscribe(
      Response => {console.log("success", Response)
      this.isLoadingResults=false;
      this.viewPdf();
    },
    (error)=>{
      const errMessage =(error.status === 0 || error.status===401 || error.status===403)?error.error : 'Cannot proceed the request. try again!'
      this.notificationService.showNoitfication(errMessage, 'OK', 'error', null);
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
  displayedColumns: string[] = [    'amc_no', 'amc_serial_no','client_name','product_name', 'category_name' ,'mtc_start_date' ,
  'mtc_end_date', 'frequency','mtc_amount_for_given_frequency',  'total_value_lkr',  'active', ];

}
