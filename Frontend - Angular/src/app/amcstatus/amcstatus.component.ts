import { Component, OnInit } from '@angular/core';
import * as Chart from 'chart.js';

@Component({
  selector: 'app-amcstatus',
  templateUrl: './amcstatus.component.html',
  styleUrls: ['./amcstatus.component.css']
})
export class AMCStatusComponent implements OnInit {

  pie!: Chart;

  constructor() { }

  ngOnInit(): void {

    this.pie = new Chart("pie", {
      type: 'pie',
      data: {
        labels: [ "Expired", "Renewal", "Renewed"],
        datasets: [{
          label: '# of Votes',
          data: [ 7, 50, 80],
          backgroundColor: ["#173F5F", "#20639B", "#3CAEA3", "#F6D55C", "#ED553B"],
          borderColor: ["White","White","White","White","White"],
          borderWidth: 0
        }]
      },
      options: {

        responsive: true,
        title: {
          display: true,
         text: 'AMCs Starus' 
        },
        animation: {
          animateRotate: true,
          animateScale: true
        }
      }
    });
    
  }

}
