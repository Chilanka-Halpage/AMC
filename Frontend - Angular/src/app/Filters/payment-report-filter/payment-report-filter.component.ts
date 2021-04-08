import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-payment-report-filter',
  templateUrl: './payment-report-filter.component.html',
  styleUrls: ['./payment-report-filter.component.scss']
})
export class PaymentReportFilterComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private datePipe: DatePipe,
  ) { }

  
  allAmcFilter = this.fb.group({
    date1: [''],
    date2: ['']
  });
  ngOnInit(): void {}
  onSubmit(){
    let date1 = this.allAmcFilter.value.date1;
    let date2 = this.allAmcFilter.value.date2;
     let formatteddate1 = this.datePipe.transform(date1, "yyyy-MM-dd");
     let formatteddate2 = this.datePipe.transform(date2, "yyyy-MM-dd");
    this.router.navigate(['allAmcReport',formatteddate1,formatteddate2]);
    console.log(formatteddate1);
    console.log(formatteddate2);
  }

}
