import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import * as Chart from 'chart.js';
import { HomedetailsService } from '../homedetails.service';

@Component({
  selector: 'app-amcstatus',
  templateUrl: './amcstatus.component.html',
  styleUrls: ['./amcstatus.component.css']
})
export class AMCStatusComponent implements OnInit {

  isLoadingResults = true;
  isRateLimitReached = false;
  errorMessage = "Unknown Error"
  renewdLoad = false;
  expiredLoad = false;
  renewelLoad = false;

  pie!: Chart;
  
  renewedAmcCount;
  AmcReminders;
  expiredAmcCount;

  constructor(
              private datePipe: DatePipe,
              private homedetails: HomedetailsService) { }

  ngOnInit(): void {
    this.expiredamcCount(); 
    this. RenewedAmcscount()
    this.RenewelAmcCount()
    
  }
  
  RenewedAmcscount(){
    let date=new Date();
    let formatteddate1 = this.datePipe.transform(date, "yyyy-MM-dd");  
    date.setMonth(date.getMonth() - 3);
    let formatteddate2 = this.datePipe.transform(date, "yyyy-MM-dd");
    this.homedetails.RenewedAmcscount(formatteddate2,formatteddate1).subscribe(
      data => { 
        this.isLoadingResults = ((this.renewdLoad = true) && this.renewelLoad) ? false : true;
        this.renewedAmcCount=data
        if(!this.isLoadingResults ){
          this.piechart();
        }
    },
      error => {console.log("Error!", error)
    })
  }
   
   RenewelAmcCount(){
    let date=new Date();
    let formatteddate1 = this.datePipe.transform(date, "yyyy-MM-dd");
    date.setMonth(date.getMonth() + 1);
    let formatteddate2 = this.datePipe.transform(date, "yyyy-MM-dd");
    this.homedetails.Amcreminders(formatteddate1,formatteddate2).subscribe(
      data => {
        this.isLoadingResults = ((this.renewelLoad = true) && this.renewdLoad) ? false : true;
        this.AmcReminders=data
        if(!this.isLoadingResults ){
          this.piechart();
        }
    },
    error => {console.log("Error!", error)
  })
  }

  expiredamcCount(){
   let date=new Date();
    let formatteddate1 = this.datePipe.transform(date, "yyyy-MM-dd");
    date.setMonth(date.getMonth() - 12);
    let formatteddate2 = this.datePipe.transform(date, "yyyy-MM-dd");
    this.homedetails.expiredamcCount(formatteddate2,formatteddate1).subscribe(
      data => { this.expiredAmcCount=data
    },
      error => {console.log("Error!", error)
    })
  }

  piechart(){
    this.pie = new Chart("pie", {
      type: 'pie',
      data: {
        labels: [ "Expired", "Renewal","Renewed"],
        datasets: [{
          label: '# of Votes',
          data: [this.expiredAmcCount,this.AmcReminders,this.renewedAmcCount],
          backgroundColor: ["#173F5F", "#20639B", "#3CAEA3"],
          borderColor: ["White","White","White","White","White"],
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
