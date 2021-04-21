import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { LoginDetailsService } from '../data/login-details.service';
import { LoginDetails } from '../data/loginDetails/login-details';

@Component({
  selector: 'app-login-details',
  templateUrl: './login-details.component.html',
  styleUrls: ['./login-details.component.scss']
})
export class LoginDetailsComponent implements OnInit {

  resultsLength = 0;
  loginDetails: MatTableDataSource<LoginDetails>

  constructor(
    private loginDetailsService: LoginDetailsService
  ) { }

  ngOnInit(): void {
    this.getLoginDetails()
    this.resultsLength = this.loginDetails.data.length;
  }
  getLoginDetails(){
    this.loginDetailsService.getLoginDetails().subscribe(
      data => {
        this.loginDetails = new MatTableDataSource(data);
      })
  }
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.loginDetails.filter = filterValue.trim().toLowerCase();
  }

  displayedColumns: string[] = ['user_id','uname','loged_ip','loged_datetime'];
}
