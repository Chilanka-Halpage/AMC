import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-expired-amcs-filter',
  templateUrl: './expired-amcs-filter.component.html',
  styleUrls: ['./expired-amcs-filter.component.scss']
})
export class ExpiredAmcsFilterComponent implements OnInit {

  date=new Date();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private datePipe: DatePipe,) { }

    expiredAmcsFilter = this.fb.group({
      date1: [''],
      date2: ['']
    });
  ngOnInit(): void {
  }
  onSubmit(){
    let date1 = this.expiredAmcsFilter.value.date1;
    let date2 = this.expiredAmcsFilter.value.date2;
     let formatteddate1 = this.datePipe.transform(date1, "yyyy-MM-dd");
     let formatteddate2 = this.datePipe.transform(date2, "yyyy-MM-dd");
    
    this.router.navigate(['expiredAmcs',formatteddate1,formatteddate2]);
  }

}
