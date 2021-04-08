import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  amcNo = 110;
  ActiveAMC = 16;
  TotalUsers = 345;
  
  constructor() { }

  ngOnInit(): void {
    // service.method() .subscrive(data=>
    //   amcNo = data.xyz;
    //   addd= data.ast;
    //   ) 
  }

}
