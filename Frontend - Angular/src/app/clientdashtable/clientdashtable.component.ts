import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { HomedetailsService } from '../homedetails.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-clientdashtable',
  templateUrl: './clientdashtable.component.html',
  styleUrls: ['./clientdashtable.component.scss']
})
export class ClientdashtableComponent implements OnInit {

  clientId: number

  clientdetails: MatTableDataSource<any>;

  constructor( private homedetails: HomedetailsService) { }

  displayedColumns:string[] = ['recNo','recDate','payMode','balance','Category','pi_no'];

  @ViewChild(MatSort) sort: MatSort;  
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
  this.getclienthome()
  }

  getclienthome(){
    this.homedetails.getclienthome(this.clientId).subscribe(data =>{
      this.clientdetails = new MatTableDataSource(data);
      this.clientdetails.sort = this.sort;
      this.clientdetails.paginator = this.paginator;
    });
  }


}
