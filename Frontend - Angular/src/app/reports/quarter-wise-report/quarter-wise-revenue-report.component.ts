import { DataSource } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { JrReportDetailsService } from 'src/app/data/jr-report-details.service';
import { ReportDetailsService } from 'src/app/data/report-details.service';
import { AuthenticationService } from 'src/app/_helpers/authentication.service';

@Component({
  selector: 'app-quarter-wise-revenue-report',
  templateUrl: './quarter-wise-revenue-report.component.html',
  styleUrls: ['./quarter-wise-revenue-report.component.scss']
})
export class QuarterWiseRevenueReportComponent implements OnInit {

  dataSource:any[];
  constructor(
    private jrReportDetailsService: JrReportDetailsService,
    public _authentication: AuthenticationService,
    private reportDetailsService: ReportDetailsService,
    private activatedRoute: ActivatedRoute,
  ) { }

  date1: any;

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.date1 = params.get('date1');
      console.log(this.date1);
      this.QuarterWiseRevenue(this.date1);
    });
  }
  QuarterWiseRevenue(date1) {
    this.reportDetailsService.QuarterWiseRevenue(date1).subscribe(
      data => {
        this.dataSource=data;
        console.log(data)
        
        console.log(this.dataSource[0])
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
  displayedColumns: string[] = ['quarter1', 'quarter2', 'quarter3', 'quarter4'];
}
