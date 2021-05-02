import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { JrReportDetailsService } from 'src/app/data/jr-report-details.service';
import { ReportDetailsService } from 'src/app/data/report-details.service';
import { AuthenticationService } from 'src/app/_helpers/authentication.service';
import { ClientAmc } from '../../data/ClientAmc/client-amc';

@Component({
  selector: 'app-client-amc',
  templateUrl: './client-amc.component.html',
  styleUrls: ['./client-amc.component.scss']
})
export class ClientAmcComponent implements OnInit {

  clientAmc : MatTableDataSource<ClientAmc>;
  cId : any
  public isLoadingResults = true;
  public resultsLength = 0;

  constructor(
    private jrReportDetailsService: JrReportDetailsService,
    public _authentication: AuthenticationService,
    private reportDetailsService: ReportDetailsService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.cId = params.get('cId');
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
  displayedColumns: string[] = ['amc_no','amc_serial_no', 'start_date', 'mtc_start_date','mtc_end_date',
  'frequency','category_name','amc_product_no','department_name','product_description'];

}
