import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { JrReportDetailsService } from 'src/app/data/jr-report-details.service';
import { AuthenticationService } from 'src/app/_helpers/authentication.service';

@Component({
  selector: 'app-quarter-wise-report',
  templateUrl: './quarter-wise-report.component.html',
  styleUrls: ['./quarter-wise-report.component.scss']
})
export class QuarterWiseReportComponent implements OnInit {

date1
  constructor(
    public _authentication: AuthenticationService,
    private jrReportDetailsService: JrReportDetailsService,
    private router: Router,
    private fb: FormBuilder,
    private datePipe: DatePipe,
  ) { }

  quarterWiseReport = this.fb.group({
    date1: ['']
  });

  ngOnInit(): void {
  }

  onSubmit(){
    this.date1 = this.quarterWiseReport.value.date1;
    //console.log(this.date1);
     //let formatteddate1 = this.datePipe.transform(date1, "yyyy-MM-dd");
    //this.router.navigate(['quarterWiseRevenueReport',this.date1]);
  
    this.jrReportDetailsService.QuarterWiseRevenueJrReport(this.date1,this._authentication.userId).subscribe(
      Response => {console.log("success", Response)
      this.router.navigate(['quarterWiseRevenueReport',this.date1]);
    },
      error => {console.log("Error!", error)
    }
    )
  }

}
