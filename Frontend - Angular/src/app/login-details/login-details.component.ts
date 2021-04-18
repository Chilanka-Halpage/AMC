import { Component, OnInit } from '@angular/core';
import { LoginDetailsService } from '../data/login-details.service';
import { LoginDetails } from '../data/loginDetails/login-details';

@Component({
  selector: 'app-login-details',
  templateUrl: './login-details.component.html',
  styleUrls: ['./login-details.component.scss']
})
export class LoginDetailsComponent implements OnInit {

  loginDetails: LoginDetails

  constructor(
    private loginDetailsService: LoginDetailsService
  ) { }

  ngOnInit(): void {
    this.getLoginDetails()
  }
  getLoginDetails(){
    this.loginDetailsService.getLoginDetails().subscribe(
      data => {
        this.loginDetails = data;
      })
  }
  displayedColumns: string[] = ['user_id','uname','loged_ip','loged_datetime'];
}
