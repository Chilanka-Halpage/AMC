import { PaymentService } from './../payment.service';
import { Router, Data } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.scss']
})
export class PaymentListComponent implements OnInit {

  payments: MatTableDataSource<any>;
  public isLoadingResults = true;
  public isRateLimitReached = false;
  public errorMessage = "Unknown Error"


  constructor(private paymentService: PaymentService , private Router: Router) { }

  displayedColumns:string[] = ['rec_no','rec_date','pi_no','exchage_rate','pay_mode','balance','total_lkr','balance_lkr'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this.getPaymetList();
  }
  getPaymetList() {
    this.paymentService.getPaymetList().subscribe(data =>{
       this.payments = new MatTableDataSource(data);
       this.payments.sort = this.sort;
       this.payments.paginator = this.paginator;
       this.isLoadingResults = false;
       this.isRateLimitReached = false;
       }, error => {
         this.isLoadingResults = false;
         this.isRateLimitReached = true;
         this.errorMessage = (error.status === 0 || error.status === 404 || error.status === 403 || error.status === 401) ? error.error : 'Error in loading data';
       })
  }

  applyFilter(filterValue: string) {
    this.payments.filter = filterValue.trim().toLowerCase();
  }
    
}
