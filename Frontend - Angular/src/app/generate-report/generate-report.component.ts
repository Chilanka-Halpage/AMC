import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import {Users} from '../data/Users/users'
import {UsersService} from '../data/Users/users.service'

@Component({
  selector: 'app-generate-report',
  templateUrl: './generate-report.component.html',
  styleUrls: ['./generate-report.component.scss']
})
export class GenerateReportComponent implements OnInit {

  users: Users[];
  constructor(private userService: UsersService,private router: Router) { }

  ngOnInit(): void {
    this.getUsers();
  }
  private getUsers(){
    this.userService.getAllUsers().subscribe(data=>{
      this.users = data;
    })
  }
profile (userId: String){
this.router.navigate(['profile',userId])
}
}
