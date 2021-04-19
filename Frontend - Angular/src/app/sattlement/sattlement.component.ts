import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DuePaymentService } from '../due-payment.service';

@Component({
  selector: 'app-sattlement',
  templateUrl: './sattlement.component.html',
  styleUrls: ['./sattlement.component.scss']
})
export class SattlementComponent implements OnInit {

  settled: MatTableDataSource<any>

  constructor(
    public duePaymentService: DuePaymentService,
    public router: Router
  ) { }

  displayedColumns:string[] = ['id','dueDate','invoiceAmt','amc_no','product_id','currency_id','Action'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit(): void {
    this.getDuepayemt();
  }

  getDuepayemt(){
    this.duePaymentService.getsettleddetails().subscribe(data =>{
    this.settled = new MatTableDataSource(data); 
    this.settled.sort = this.sort;  
    this.settled.paginator = this.paginator;
    });
  }

  deletedueinvooice(id: number){ console.log(id);
  this.duePaymentService.deletedueinvoice(id).subscribe(data =>{
    console.log(data);
    this.getDuepayemt();
  })
}

  applyFilter(filterValue: string) {
    this.settled.filter = filterValue.trim().toLowerCase();
  }


}

