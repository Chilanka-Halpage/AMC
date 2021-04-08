import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AllAmcs} from '../../data/all-amcs/all-amcs';
import{ DatePipe} from '@angular/common'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ReportDetailsService } from '../../data/report-details.service';
import { JrReportDetailsService } from '../../data/jr-report-details.service'
import { from } from 'rxjs';

@Component({
  selector: 'app-all-amc-filter',
  templateUrl: './all-amc-filter.component.html',
  styleUrls: ['./all-amc-filter.component.scss']
})
export class AllAmcFilterComponent implements OnInit {
  allAmcs: AllAmcs;


  constructor(
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

    let date1 = this.allAmcFilter.value.date1;
    let date2 = this.allAmcFilter.value.date2;
     let formatteddate1 = this.datePipe.transform(date1, "yyyy-MM-dd");
     let formatteddate2 = this.datePipe.transform(date2, "yyyy-MM-dd");
    this.router.navigate(['allAmcReport',formatteddate1,formatteddate2]);
    console.log(formatteddate1);
    console.log(formatteddate2);
    //generate All AMCs jasper report---------------------------
    this.jrReportDetailsService.AllAmcPdfReport(formatteddate1,formatteddate2).subscribe(
      Response => {console.log("success", Response)
    },
      error => {console.log("Error!", error)
    }
    )
  }
}