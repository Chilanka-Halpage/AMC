import { AuthenticationService } from 'src/app/_helpers/authentication.service';
import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { HomedetailsService } from '../homedetails.service';
import { MatTableDataSource } from '@angular/material/table';
import { subscribeOn } from 'rxjs/operators';

@Component({
  selector: 'app-clientdashtable',
  templateUrl: './clientdashtable.component.html',
  styleUrls: ['./clientdashtable.component.scss']
})
export class ClientdashtableComponent implements OnInit {

  clientdetails: MatTableDataSource<any>;
  amcCount;
  Activeamc;
  department

  constructor( private homedetails: HomedetailsService,
               private _authservice: AuthenticationService) { }

  displayedColumns:string[] = ['recNo','recDate','payMode','balance','Category','pi_no'];

  @ViewChild(MatSort) sort: MatSort;  
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
  this.getclienthome()
  this.getAmcCount()
  this.getActiveAmc()
  this.departmentcount()
  }

  getclienthome(){
   
    this.homedetails.getclienthome(this._authservice.userId).subscribe(data =>{
      this.clientdetails = new MatTableDataSource(data);
      this.clientdetails.sort = this.sort;
      this.clientdetails.paginator = this.paginator;
    });
  }

  getAmcCount(){
  this.homedetails.gettotalAmcforclient(this._authservice.userId).subscribe(data =>{
      this.amcCount = data
  })
  }

  getActiveAmc(){
   this.homedetails.getActiveAmcforclient(this._authservice.userId).subscribe(data => {
     this.Activeamc = data;
   }) 
  }

  departmentcount(){
    this.homedetails.getdepartmentcount(this._authservice.userId).subscribe(data =>{
      this.department =data
    })
  }
}
