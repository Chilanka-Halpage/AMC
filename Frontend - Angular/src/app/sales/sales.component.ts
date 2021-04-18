import { Component, OnInit } from '@angular/core';
import * as Chart from 'chart.js';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit {



  doughnut!: Chart;

  constructor() { }

  ngOnInit(): void {
    this.doughnut = new Chart("doughnut", {
      type: 'doughnut',
      data: {
        labels: ["Active", "Inactive"],
        datasets: [{
          label: '# of Votes',
          data: [355, 20],
          backgroundColor: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
          borderColor: ["White","White","White","White","White"],
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        title: {
          display: true,
          text: 'AMC Status'
        },
        animation: {
          animateRotate: true,
          animateScale: true
        }
      }
    });

  }
}