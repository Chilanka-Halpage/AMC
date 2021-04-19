import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import{ DatePipe} from '@angular/common'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ClientDetailsService } from '../../data/client-details/client-details.service'
import { from } from 'rxjs';
import { JrReportDetailsService } from '../../data/jr-report-details.service'
import { ClientDetails } from 'src/app/data/client-details/client-details';
import { AuthenticationService } from 'src/app/_helpers/authentication.service';

@Component({
  selector: 'app-client-details-filter',
  templateUrl: './client-details-filter.component.html',
  styleUrls: ['./client-details-filter.component.scss']
})
export class ClientDetailsFilterComponent implements OnInit {
  clientDetails: ClientDetails
  
  constructor(
    public _authentication: AuthenticationService,
    private jrReportDetailsService:JrReportDetailsService,
    private route: ActivatedRoute,
    private router: Router,
    private clientDetailsService: ClientDetailsService,
    private fb: FormBuilder,
    private datePipe: DatePipe,
    ) { } 

    clientDetailsFilter = this.fb.group({
      date1: [''],
      date2: ['']
    });

  ngOnInit(): void {
 
  }
    //AllAMCsReport() {
   //   this.router.navigate(['AllAmcReport', {relativeTo: this.route}]) 
 // }
 
  onSubmit(){

    let date1 = this.clientDetailsFilter.value.date1;
    let date2 = this.clientDetailsFilter.value.date2;
     let formatteddate1 = this.datePipe.transform(date1, "yyyy-MM-dd");
     let formatteddate2 = this.datePipe.transform(date2, "yyyy-MM-dd");
    //this.router.navigate(['clientDetails',formatteddate1,formatteddate2]);
    this.jrReportDetailsService.ClientDetailsJrReport(formatteddate1,formatteddate2,this._authentication.userId).subscribe(
      Response => {console.log("success", Response)
      this.router.navigate(['clientDetails',formatteddate1,formatteddate2]);
    },
      error => {console.log("Error!", error)
    }
    )
}

}
