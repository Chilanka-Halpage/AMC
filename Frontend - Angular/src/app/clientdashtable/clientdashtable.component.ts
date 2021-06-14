import { AuthenticationService } from 'src/app/_helpers/authentication.service';
import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { HomedetailsService } from '../homedetails.service';
import { MatTableDataSource } from '@angular/material/table';
import { DatePipe } from '@angular/common';

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
  amcreminder;
  date=new Date();
  id
  public isLoadingResults = true;
  public isRateLimitReached = false;
  public errorMessage = "Unknown Error"

  constructor( private homedetails: HomedetailsService,
               private _authservice: AuthenticationService,
               private datePipe: DatePipe,) { }

  displayedColumns:string[] = ['rec_no','rec_date','payMode','balance','Category','pi_no'];

  @ViewChild(MatSort) sort: MatSort;  
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
  this.getclienthome()
  this.getAmcCount()
  this.getActiveAmc()
  this.departmentcount()
  this.gterenevelAMCforClient()
  }

  getclienthome(){
    this.homedetails.getclienthome(this._authservice.userId).subscribe(data =>{
      this.clientdetails = new MatTableDataSource(data);
      this.clientdetails.sort = this.sort;
      this.clientdetails.paginator = this.paginator;
      this.isLoadingResults = false;
      this.isRateLimitReached = false;
      }, error => {
        this.isLoadingResults = false;
        this.isRateLimitReached = true;
        this.errorMessage = (error.status === 0 || error.status === 404 || error.status === 403 || error.status === 401) ? error.error : 'Error in loading data';
      })
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
  gterenevelAMCforClient(){
    let formatteddate1 = this.datePipe.transform(this.date, "yyyy-MM-dd");
    this.date.setMonth(this.date.getMonth() + 1);
    let formatteddate2 = this.datePipe.transform(this.date, "yyyy-MM-dd");
    this._authservice.userId
    this.homedetails.gterenevelAMCforClient(formatteddate1,formatteddate2,this._authservice.userId).subscribe(data=>{
     this.amcreminder=data
    })
  }
}
