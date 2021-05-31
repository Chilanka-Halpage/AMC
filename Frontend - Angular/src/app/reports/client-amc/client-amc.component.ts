import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { JrReportDetailsService } from 'src/app/data/jr-report-details.service';
import { ReportDetailsService } from 'src/app/data/report-details.service';
import { NotificationService } from 'src/app/shared/notification.service';
import { AuthenticationService } from 'src/app/_helpers/authentication.service';
import { ClientAmc } from '../../data/ClientAmc/client-amc';

@Component({
  selector: 'app-client-amc',
  templateUrl: './client-amc.component.html',
  styleUrls: ['./client-amc.component.scss']
})
export class ClientAmcComponent implements OnInit {

  clientAmc : MatTableDataSource<ClientAmc>;
  cId : any;
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

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.cId = params.get('cId');
      console.log("----");
      console.log(this.cId);
      this.ClientAmc(this.cId);
  });
  }
  ClientAmc(cId){
    this.reportDetailsService.ClientAmc(cId).subscribe(
      data=>{
      this.clientAmc = new MatTableDataSource(data);
      this.isLoadingResults=false;
      this.resultsLength = this.clientAmc.data.length;
    },
    (error)=>{
      const errMessage =(error.status === 0 || error.status===401 || error.status===403)?error.error : 'Cannot proceed the request. try again!'
      this.notificationService.showNoitfication(errMessage, 'OK', 'error', null);
      this.isLoadingResults=false;
    });
  }

  ClientAmcJrReport(){
    this.isLoadingResults=true;
    this.jrReportDetailsService.ClientAmcJrReport(this._authentication.userId).subscribe(
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
      },    (error)=>{
        const errMessage =(error.status === 0 || error.status===401 || error.status===403)?error.error : 'Cannot proceed the request. try again!'
        this.notificationService.showNoitfication(errMessage, 'OK', 'error', null);
      });
  }
  displayedColumns: string[] = ['amc_no','amc_serial_no', 'start_date', 'mtc_start_date','mtc_end_date',
  'frequency','category_name','product_name','department_name','product_description'];

}
