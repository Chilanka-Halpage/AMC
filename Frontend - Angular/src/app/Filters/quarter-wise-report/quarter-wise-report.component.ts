import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { JrReportDetailsService } from 'src/app/data/jr-report-details.service';
import { AmcMasterService } from 'src/app/shared/amc-master.service';
import { AuthenticationService } from 'src/app/_helpers/authentication.service';

@Component({
  selector: 'app-quarter-wise-report',
  templateUrl: './quarter-wise-report.component.html',
  styleUrls: ['./quarter-wise-report.component.scss']
})
export class QuarterWiseReportComponent implements OnInit {

date1: any
category: any
isLoadingResults: boolean ;
public errorMessage = "Unknown Error"
categoryList = [];

  constructor(
    public _authentication: AuthenticationService,
    private jrReportDetailsService: JrReportDetailsService,
    private amcMasterservice: AmcMasterService,
    private router: Router,
    private fb: FormBuilder,
    private datePipe: DatePipe,
    public dialogRef: MatDialogRef<QuarterWiseReportComponent>
  ) { }

  quarterWiseReport = this.fb.group({
    date1: [''],
    category: ['']
  });

  ngOnInit(): void {
    this.loadSelectionData();
  }

  private loadSelectionData(){
    let categoryListLoad = false;
    this.amcMasterservice.getCategory().subscribe(response => {
      this.categoryList = response;
      this.isLoadingResults = (categoryListLoad = true) ? false : true;
    }, error => {
      this.isLoadingResults = false;
      this.errorMessage = error;
    });
  }

  onSubmit(){
    this.isLoadingResults=true;
    this.date1 = this.quarterWiseReport.value.date1;
    this.category = this.quarterWiseReport.value.category;
      this.router.navigate(['quarterWiseRevenueReport',this.date1,this.category]);
  }
}
