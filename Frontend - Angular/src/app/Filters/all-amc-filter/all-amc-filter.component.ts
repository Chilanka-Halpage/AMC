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
import { MatDialogRef } from '@angular/material/dialog';
import { AmcMasterService } from 'src/app/shared/amc-master.service';



@Component({
  selector: 'app-all-amc-filter',
  templateUrl: './all-amc-filter.component.html',
  styleUrls: ['./all-amc-filter.component.scss']
})
export class AllAmcFilterComponent implements OnInit {
  categoryList = [];
  allAmcs: AllAmcs;
  users : Users;
  isLoadingResults ;
  public errorMessage = "Unknown Error"
  
  constructor(
    public _authentication: AuthenticationService,
    private jrReportDetailsService: JrReportDetailsService,
    private amcMasterservice: AmcMasterService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private datePipe: DatePipe,
    public dialogRef: MatDialogRef<AllAmcFilterComponent>
    ) { } 

      allAmcFilter = this.fb.group({
      date1: [''],
      date2: [''],
      category: ['']
    },{
      validator: ConfirmedValidator('date1', 'date2')
    } );

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
    let date1 = this.allAmcFilter.value.date1;
    let date2 = this.allAmcFilter.value.date2;
      let formatteddate1 = this.datePipe.transform(date1, "yyyy-MM-dd");
      let formatteddate2 = this.datePipe.transform(date2, "yyyy-MM-dd");
      let category = this.allAmcFilter.value.category;
      this.router.navigate(['allAmcReport',formatteddate1,formatteddate2,category]);
  }
  
  get f(){
    return this.allAmcFilter.controls;
  }
}
export function ConfirmedValidator(fromDate: string, toDate: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[fromDate];
    const matchingControl = formGroup.controls[toDate];
    if (matchingControl.errors && !matchingControl.errors.confirmedValidator) {
      return;
    }
    if (control.value > matchingControl.value) {
      matchingControl.setErrors({ confirmedValidator: true });
    } else {
      matchingControl.setErrors(null);
    }
  }
}