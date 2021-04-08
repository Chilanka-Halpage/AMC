import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { from } from 'rxjs';
import { JrReportDetailsService } from '../../data/jr-report-details.service';
import { FullDetails } from '../../data/FullDetails/full-details'

@Component({
  selector: 'app-full-details-filter',
  templateUrl: './full-details-filter.component.html',
  styleUrls: ['./full-details-filter.component.scss']
})
export class FullDetailsFilterComponent implements OnInit {

  FullDetails: FullDetails;

  constructor(private activatedRoute: ActivatedRoute,
    private jrReportDetailsService:JrReportDetailsService,
    private router: Router,
    private fb: FormBuilder,
    private datePipe: DatePipe,
    ) { } 

      fullDetailsFilter = this.fb.group({
      date1: [''],
      date2: ['']
    });

  ngOnInit(): void {
 
  }
    //AllAMCsReport() {
   //   this.router.navigate(['AllAmcReport', {relativeTo: this.route}]) 
 // }
 
  onSubmit(){

    let date1 = this.fullDetailsFilter.value.date1;
    let date2 = this.fullDetailsFilter.value.date2;
     let formatteddate1 = this.datePipe.transform(date1, "yyyy-MM-dd");
     let formatteddate2 = this.datePipe.transform(date2, "yyyy-MM-dd");
    this.router.navigate(['fullDetails',formatteddate1,formatteddate2]);

    this.jrReportDetailsService.FullDetailsJrReport(formatteddate1,formatteddate2).subscribe(
      data=>{
      this.FullDetails = data;}
    )
}

}
