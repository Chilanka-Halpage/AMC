import { HomedetailsService } from './../homedetails.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as Chart from 'chart.js';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-revalue',
  templateUrl: './revalue.component.html',
  styleUrls: ['./revalue.component.css']
})
export class RevalueComponent implements OnInit {

  bar!: Chart;

  isLoadingResults = true;
  isRateLimitReached = false;
  errorMessage = "Unknown Error"

  lastyearLoad;
  secondyearLoad;
  thirdyearLoad;
  fourthyearLoad;
  fifthyearLoad;

  lastyearrevanue;
  secondlastrevanue;
  thirdlastrevanue;
  fourthlastrevanue;
  fifthlastrevanue;

  constructor( 
               private homedetails: HomedetailsService,
               private datePipe: DatePipe,
               ) { }

  ngOnInit(): void { 
    this.lastyearrevanu()
    this.secondlastyearrevanue()
    this.thirdlastyearrevanue()
    this.fourthlastyearrevanue()
    this.fifthlastyearrevanue()
  }

  lastyearrevanu(){
    let date=new Date();
    let formatteddate1 = this.datePipe.transform(date, "yyyy-01-01");
    console.log(formatteddate1)
    date.setFullYear(date.getFullYear() - 1);
    let formatteddate2 = this.datePipe.transform(date, "yyyy-01-01");
    console.log(formatteddate2)
    this.homedetails.lastyearrevanue(formatteddate2,formatteddate1).subscribe( data => { 
      this.isLoadingResults = ((this.secondyearLoad = true) && this.lastyearLoad) ? false : true;
      this.lastyearrevanue=data
        if(!this.isLoadingResults ){
          this.barchart()
        }
        console.log("lastyear", data)
    },
      error => {console.log("Error!", error)
    })
  }

  secondlastyearrevanue(){

    let date=new Date();
    let date1 = new Date();
    date.setFullYear(date.getFullYear() -1);
    let formatteddate1 = this.datePipe.transform(date, "yyyy-01-01");
    console.log(formatteddate1)
    date1.setFullYear(date1.getFullYear() - 2);
    let formatteddate2 = this.datePipe.transform(date1, "yyyy-01-01");
    console.log(formatteddate2)
    this.homedetails.lastyearrevanue(formatteddate2,formatteddate1).subscribe( data => { 
      this.isLoadingResults = ((this.lastyearLoad = true) && this.secondyearLoad) ? false : true;
      this.secondlastrevanue=data
      if(!this.isLoadingResults ){
        this. barchart()
      }
        console.log("secondyear", data)
    },
      error => {console.log("Error!", error)
    })
  }

  thirdlastyearrevanue(){

    let date=new Date();
    let date2=new Date();
    date.setFullYear(date.getFullYear() -2 );
    let formatteddate1 = this.datePipe.transform(date, "yyyy-01-01");
    console.log(formatteddate1)
    date2.setFullYear(date2.getFullYear() - 3);
    let formatteddate2 = this.datePipe.transform(date2, "yyyy-01-01");
    console.log(formatteddate2)
    this.homedetails.lastyearrevanue(formatteddate2,formatteddate1).subscribe(data => { 
      this.isLoadingResults = ((this.thirdyearLoad = true) && this.fourthyearLoad && this.fifthyearLoad) ? false : true;
        this.thirdlastrevanue=data
        if(!this.isLoadingResults ){
          this. barchart()
        }
        console.log("thirdyear", data)
    },
      error => {console.log("Error!", error)
    })
  }

  fourthlastyearrevanue(){
    let date=new Date();
    date.setFullYear(date.getFullYear() -3);
    let formatteddate1 = this.datePipe.transform(date, "yyyy-01-01");
    console.log(formatteddate1)
    date.setFullYear(date.getFullYear() - 1);
    let formatteddate2 = this.datePipe.transform(date, "yyyy-01-01");
    console.log(formatteddate2)
    this.homedetails.last4yearrevanue(formatteddate2,formatteddate1).subscribe(data => {
      this.isLoadingResults = ((this.fourthyearLoad = true) && this.thirdyearLoad && this.fifthyearLoad) ? false : true;
      this.fourthlastrevanue=data
      if(!this.isLoadingResults ){
        this. barchart()
      }
        console.log("fourthyear", data)
    },
      error => {console.log("Error!", error)
    })
  }

  fifthlastyearrevanue(){
    let date=new Date();
    let date2=new Date();
    date.setFullYear(date.getFullYear() -4);
    let formatteddate1 = this.datePipe.transform(date, "yyyy-01-01");
    date2.setFullYear(date2.getFullYear() - 5);
    let formatteddate2 = this.datePipe.transform(date2, "yyyy-01-01");
    this.homedetails.last5yearrevanue(formatteddate2,formatteddate1).subscribe(data => { 
      this.isLoadingResults = ((this.fifthyearLoad = true) && this.thirdyearLoad && this.fourthyearLoad) ? false : true;
        this.fifthlastrevanue=data
        if(!this.isLoadingResults ){
          this. barchart()
        }
    },
      error => {console.log("Error!", error)
    })
  }

  barchart(){
    let date=new Date();
    date.setFullYear(date.getFullYear() - 1);
    let formatteddate1 = this.datePipe.transform(date, "yyyy");
    date.setFullYear(date.getFullYear() - 1);
    let formatteddate2 = this.datePipe.transform(date, "yyyy");
    date.setFullYear(date.getFullYear() - 1);
    let formatteddate3 = this.datePipe.transform(date, "yyyy");
    date.setFullYear(date.getFullYear() - 1);
    let formatteddate4 = this.datePipe.transform(date, "yyyy");
    date.setFullYear(date.getFullYear() - 1);
    let formatteddate5 = this.datePipe.transform(date, "yyyy");
    this.bar = new Chart("bar", {
      type: 'bar',
      data: {
        labels: [formatteddate5, formatteddate4, formatteddate3, formatteddate2, formatteddate1],
        datasets: [{
          label: 'Revenue',
          data: [this.fifthlastrevanue,this.fourthlastrevanue, this.thirdlastrevanue,this.secondlastrevanue,this.lastyearrevanue],
          backgroundColor: ["#EF6D3B", "#EF6D3B", "#EF6D3B","#EF6D3B", "#EF6D3B"],
        }]
      },
      options: {
        responsive: true,
        
        title: {
          display: true,
          text: 'AMCs Revenue',
           
        },
        animation: {
          animateRotate: true,
          animateScale: true
        }
      }
    });
  }

}
