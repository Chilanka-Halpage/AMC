import { Component, OnInit } from '@angular/core';
import { AllAmcs } from '../../data/all-amcs/all-amcs';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TransitionCheckState } from '@angular/material/checkbox';
import { from } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { ReportDetailsService } from '../../data/report-details.service'
import { JrReportDetailsService } from '../../data/jr-report-details.service'
import { Users } from 'src/app/data/Users/users';
import { AuthenticationService } from 'src/app/_helpers/authentication.service';
import { error } from '@angular/compiler/src/util';
import { NotificationService } from 'src/app/shared/notification.service';

@Component({
  selector: 'app-all-amc-report',
  templateUrl: './all-amc-report.component.html',
  styleUrls: ['./all-amc-report.component.scss']
})

export class AllAmcReportComponent implements OnInit {

  allAmcs: MatTableDataSource<AllAmcs>;
  public filterValue: string;
  date1: any;
  date2: any;
  category: any;
  public isLoadingResults = true;
  public isRateLimitReached =false;
  public resultsLength = 0;
  

  constructor(
    private jrReportDetailsService: JrReportDetailsService,
    public _authentication: AuthenticationService,
      private notificationService: NotificationService,
    private reportDetailsService: ReportDetailsService,
    //private allAmcsService: AllAmcsService,
    private activatedRoute: ActivatedRoute,

  ) { }

  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe(params => {
      this.date1 = params.get('date1');
      this.date2 = params.get('date2');
      this.category = params.get('category')
      this.getAmcDetails(this.date1, this.date2, this.category);
    });
  }
  //Data for the table-----------------------------------------
  getAmcDetails(date1, date2, category) {
    this.reportDetailsService.getAllAmcs(date1, date2, category).subscribe(
      data => {
        this.allAmcs = new MatTableDataSource(data);
        this.isLoadingResults=false;
        this.resultsLength = this.allAmcs.data.length;
      },
      (error)=>{
        const errMessage =(error.status === 0 || error.status===401 || error.status===403)?error.error : 'Cannot proceed the request. try again!'
        this.notificationService.showNoitfication(errMessage, 'OK', 'error', null);
        this.isLoadingResults=false;
      })
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.allAmcs.filter = filterValue.trim().toLowerCase();
  }
//------------------------------------
  allAmcJrReport(){
    this.isLoadingResults=true;
    this.jrReportDetailsService.AllAmcPdfReport(this.date1,this.date2,this.category,this._authentication.userId).subscribe(
      Response => {
        console.log("success", Response)
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
//-------------------------------------------

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
      }
      );
  }

  displayedColumns: string[] = ['amc_no', 'amc_serial_no', 'start_date', 'client_name', 'contact_person', 'category_name', 'frequency',
    'currency_name', 'exchange_rate', 'mtc_qty', 'total_value_lkr','active'];

}