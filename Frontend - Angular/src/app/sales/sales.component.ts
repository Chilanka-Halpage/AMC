import { Component, OnInit } from '@angular/core';
import * as Chart from 'chart.js';
import { HomedetailsService } from '../homedetails.service';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit {

  isLoadingResults = true;
  isRateLimitReached = false;
  errorMessage = "Unknown Error"
  activeLoad = false;
  inactiveLoad = false;

  doughnut!: Chart;

  ActiveAmcCount;
  InactiveAmcCount;

  constructor( private homedetails: HomedetailsService ,) { }

  ngOnInit(): void {

    this.getActiveAmcCount()
    this.getinactiveAmccount()
   
  }
  
  getinactiveAmccount(){
    this.homedetails.getInactiveAmcCount().subscribe(data=>{
      this.isLoadingResults = (( this.inactiveLoad = true) && this.activeLoad ) ? false : true ;
      this.InactiveAmcCount=data   
      if(!this.isLoadingResults ){
        this.doughnutchart()
      }
    })
  }

  getActiveAmcCount(){
    this.homedetails.getActiveAmcCount().subscribe(data=>{
      this.isLoadingResults = ((this.activeLoad = true) && this.inactiveLoad) ? false : true;
      this.ActiveAmcCount=data
      if(!this.isLoadingResults ){
        this.doughnutchart()
      }
    })
  }

  doughnutchart(){
    this.doughnut = new Chart("doughnut", {
      type: 'doughnut',
      data: {
        labels: ["Active", "Inactive"],
        datasets: [{
          label: '# of Votes',
          data: [this.ActiveAmcCount ,this.InactiveAmcCount ],
          backgroundColor: ["Red", "Blue"],
          borderColor: ["rgb(232, 244, 248)","rgb(232, 244, 248)"],
          borderWidth: 3
        }]
      },
      options: {
        responsive: true,
        title: {
          display: true,
        },
        animation: {
          animateRotate: true,
          animateScale: true
        }
      }
    });

  }

}