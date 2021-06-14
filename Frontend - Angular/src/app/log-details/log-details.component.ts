import { Component, OnInit } from '@angular/core';
import { HomedetailsService } from '../homedetails.service';
import { LoginDetails } from '../data/loginDetails/login-details';
import { MatTableDataSource } from '@angular/material/table';
import { Data } from '@angular/router';

@Component({
  selector: 'app-log-details',
  templateUrl: './log-details.component.html',
  styleUrls: ['./log-details.component.scss']
})
export class LogDetailsComponent implements OnInit {
  
  loginDetails: MatTableDataSource<any>;

  displayedColumns:string[] = ['user_id','uname','loged_ip','loged_datetime'];

  constructor(
             private homedetalis: HomedetailsService
  ) { }

  ngOnInit(): void {
    this.getLogindetails()
  }

  getLogindetails(){
    this.homedetalis.logdetails().subscribe(data =>{
      this.loginDetails = new MatTableDataSource(data)
  });
}
}
