import { PaymentService } from './../payment.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Payment } from '../payment';
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

  constructor(private paymentService: PaymentService , private Router: Router) { }

  displayedColumns:string[] = ['recNo','recDate','exchageRate','payMode','client_dept','balance','totalLkr','balanceLkr','category','Currency','pi_no'];
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
    });
  }

  applyFilter(filterValue: string) {
    this.payments.filter = filterValue.trim().toLowerCase();
  }
    

}
