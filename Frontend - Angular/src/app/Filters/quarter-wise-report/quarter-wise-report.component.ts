import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
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
isLoadingResults ;
  constructor(
    public _authentication: AuthenticationService,
    private jrReportDetailsService: JrReportDetailsService,
    private router: Router,
    private fb: FormBuilder,
    private datePipe: DatePipe,
    public dialogRef: MatDialogRef<QuarterWiseReportComponent>
  ) { }

  quarterWiseReport = this.fb.group({
    date1: ['']
  });

  ngOnInit(): void {
  }

  onSubmit(){
    this.isLoadingResults=true;
    this.date1 = this.quarterWiseReport.value.date1;
  
    this.jrReportDetailsService.QuarterWiseRevenueJrReport(this.date1,this._authentication.userId).subscribe(
      Response => {console.log("success", Response)
      this.isLoadingResults=false;
      this.dialogRef.close();
      this.router.navigate(['quarterWiseRevenueReport',this.date1]);
    },
      error => {console.log("Error!", error)
    }
    )
  }

}
