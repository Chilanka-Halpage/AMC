import { Component, OnInit } from '@angular/core';
import {AllAmcs} from '../../data/all-amcs/all-amcs';
import {ActivatedRoute, Router} from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TransitionCheckState } from '@angular/material/checkbox';
import { from } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import {ReportDetailsService} from '../../data/report-details.service'

@Component({
  selector: 'app-all-amc-report',
  templateUrl: './all-amc-report.component.html',
  styleUrls: ['./all-amc-report.component.scss']
})

export class AllAmcReportComponent implements OnInit {

allAmcs:AllAmcs
  constructor(
    private reportDetailsService: ReportDetailsService,
    //private allAmcsService: AllAmcsService,
    private activatedRoute: ActivatedRoute,
    ) { }

    date1 : any;
    date2 : any;
    

  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe(params => {
      this.date1 = params.get('date1');
      this.date2 = params.get('date2');
      console.log(this.date1);
      console.log(this.date2)
      this.getAmcDetails(this.date1,this.date2);
    });
  }
  //Data for the table-----------------------------------------
  getAmcDetails(date1,date2){
    this.reportDetailsService.getAllAmcs(date1,date2).subscribe(
      data=>{
      this.allAmcs = data;
    })
}
// pdfreport(){
//   this.allAmcsService.AllAmcPdfReport(this.date1,this.date2)
//   .subscribe(
//     data=>{
//     this.allAmcs = data;}
//   )
// }

displayedColumns: string[] = ['amc_no', 'start_date', 'client_name', 'contact_person','category_name','frequency',
'currency_name','exchage_rate','mtc_qty','total_value'];

}