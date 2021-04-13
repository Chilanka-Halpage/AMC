import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { DuePaymentService } from './../due-payment.service';
import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-due-payment',
  templateUrl: './due-payment.component.html',
  styleUrls: ['./due-payment.component.scss']
})
export class DuePaymentComponent implements OnInit {

  duePayments: MatTableDataSource<any>

  constructor(
    public duePaymentService: DuePaymentService,
    public router: Router
  ) { }

  displayedColumns:string[] = ['id','dueDate','invoiceAmt','amc_no','product_id','currency_id','Action','update'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit(): void {
    this.getDuepayemt();
  }

  getDuepayemt(){
    this.duePaymentService.getDuepaymentList().subscribe(data =>{
    this.duePayments = new MatTableDataSource(data); 
    this.duePayments.sort = this.sort;  
    this.duePayments.paginator = this.paginator;
    });
  }

  deletedueinvoice(id: number){ console.log(id);
  this.duePaymentService.deletedueinvoice(id).subscribe(data =>{
    console.log(data);
    this.getDuepayemt();
  })
}

  applyFilter(filterValue: string) {
    this.duePayments.filter = filterValue.trim().toLowerCase();
  }

  updatedueinvoice(id: number){
    this.router.navigate(['editdueinvoice',id]);
  } 

}
