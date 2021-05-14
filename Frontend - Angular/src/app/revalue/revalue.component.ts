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

  public revanue=[];

  isLoadingResults = true;
  isRateLimitReached = false;
  errorMessage = "Unknown Error"

  constructor( private homedetails: HomedetailsService,
               private datePipe: DatePipe,
               ) { }

  ngOnInit(): void { 
  }

  lastyearrevanu(){
    let date=new Date();
    let formatteddate1 = this.datePipe.transform(date, "yyyy-01-01");
    this.homedetails.lastyearrevanue(formatteddate1).subscribe( data1 => {   
      this.revanue = data1
      console.log("data",data1)
      let date=new Date();
      date.setFullYear(date.getFullYear() - 1);
      let formatteddate1 = this.datePipe.transform(date, "yyyy");
      date.setFullYear(date.getFullYear() - 1);
      let formatteddate2 = this.datePipe.transform(date, "yyyy");

      console.log(this.revanue)
      this.bar = new Chart("bar", {
        type: 'bar',
        data: {
          labels: [formatteddate1, formatteddate2],
          datasets: [{
            label: 'Revenue',
            data: this.revanue,
            backgroundColor: ["#4265ff", "#4265ff", "#4265ff","#4265ff", "#4265ff"],
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
    },
      error => {console.log("Error!", error)
    })
  }





 /*  barchart(){
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
    console.log(this.revanue)
    this.bar = new Chart("bar", {
      type: 'bar',
      data: {
        labels: [formatteddate5, formatteddate4, formatteddate3, formatteddate2, formatteddate1],
        datasets: [{
          label: 'Revenue',
          data: [1.12,23.34],
          backgroundColor: ["#4265ff", "#4265ff", "#4265ff","#4265ff", "#4265ff"],
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
 */
}
