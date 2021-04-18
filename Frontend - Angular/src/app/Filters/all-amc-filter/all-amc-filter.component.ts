import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AllAmcs} from '../../data/all-amcs/all-amcs';
import{ DatePipe} from '@angular/common'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ReportDetailsService } from '../../data/report-details.service';
import { JrReportDetailsService } from '../../data/jr-report-details.service';
import { Users } from '../../data/Users/users'
import { from } from 'rxjs';
import { AuthenticationService } from 'src/app/_helpers/authentication.service';

@Component({
  selector: 'app-all-amc-filter',
  templateUrl: './all-amc-filter.component.html',
  styleUrls: ['./all-amc-filter.component.scss']
})
export class AllAmcFilterComponent implements OnInit {
  allAmcs: AllAmcs;
  users : Users;
  isLoadingResults ;
  constructor(
    public _authentication: AuthenticationService,
    private jrReportDetailsService: JrReportDetailsService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private datePipe: DatePipe,
    ) { } 

      allAmcFilter = this.fb.group({
      date1: [''],
      date2: ['']
    });

  ngOnInit(): void {
  }
 
  onSubmit(){
    this.isLoadingResults=true;
    let date1 = this.allAmcFilter.value.date1;
    let date2 = this.allAmcFilter.value.date2;
     let formatteddate1 = this.datePipe.transform(date1, "yyyy-MM-dd");
     let formatteddate2 = this.datePipe.transform(date2, "yyyy-MM-dd");
      //this.router.navigate(['allAmcReport',formatteddate1,formatteddate2]);
    console.log(formatteddate1);
    console.log(formatteddate2);
    //generate All AMCs jasper report
    this.jrReportDetailsService.AllAmcPdfReport(formatteddate1,formatteddate2,this._authentication.userId).subscribe(
      Response => {
        console.log("success", Response)
        this.router.navigate(['allAmcReport',formatteddate1,formatteddate2]);
        this.isLoadingResults=false;
    },
      error => {console.log("Error!", error)
    }
    )
  }
}