import { Component, OnInit } from '@angular/core';
import { ClientDetails } from 'src/app/data/client-details/client-details';
import {ActivatedRoute, Router} from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ClientDetailsService } from 'src/app/data/client-details/client-details.service';
import { from } from 'rxjs';
import { ReportDetailsService } from '../../../data/report-details.service';
import { JrReportDetailsService } from '../../../data/jr-report-details.service';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.scss']
})
export class ClientDetailsComponent implements OnInit {

  clientDetails: ClientDetails
  
  constructor(
    private reportDetailsService: ReportDetailsService,
    private jrReportDetailsService: JrReportDetailsService,
    private activatedRoute: ActivatedRoute,
    private clientDetailsService: ClientDetailsService,
  ) { }
  date1
  date2
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.date1 = params.get('date1');
      this.date2 = params.get('date2');
      console.log(this.date1);
      console.log(this.date2)
      this.getClientDetails(this.date1,this.date2);
      this.ClientDetailsJrReport(this.date1,this.date2);
    });
     // this.ClientDetailsJrReport(this.date1,this.date2);
  }
  //get data for the table
  getClientDetails(date1,date2){
    this.reportDetailsService.ClientDetails(date1,date2).subscribe(
      Response=>{
      this.clientDetails = Response;
    })
  }
  //generate jasper report
  ClientDetailsJrReport(date1,date2){
    this.jrReportDetailsService.AllAmcPdfReport(date1,date2).subscribe(
      Response => {console.log("success", Response)
    },
      error => {console.log("Error!", error)
    }
    )
  }
  
  displayedColumns: string[] = [    'client_iD', 'client_name','amc_no','contact_person', 'contact_no' ,'address' ,
  'start_date', 'mtc_start_date',  'active', ];
}
