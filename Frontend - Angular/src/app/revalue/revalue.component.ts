/* import { AmcRevanueService } from './../amc-revanue.service'; */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as Chart from 'chart.js';

@Component({
  selector: 'app-revalue',
  templateUrl: './revalue.component.html',
  styleUrls: ['./revalue.component.css']
})
export class RevalueComponent implements OnInit {

  bar!: Chart;

  constructor( private Router: Router,/* 
               private amcRevanueService: AmcRevanueService  */
               ) { }

  ngOnInit(): void {
    this.bar = new Chart("bar", {
      type: 'bar',
      data: {
        labels: ["2016", "2017", "2018", "2019", "2020"],
        datasets: [{
          label: 'Revenue',
          data: [200000, 230000, 220000, 210500, 210000],
          backgroundColor: ["#EF6D3B", "#EF6D3B", "#EF6D3B","#EF6D3B", "#EF6D3B"],
        }]
      },
      options: {
        responsive: true,
        title: {
          display: true,
          text: 'AMCs Revenue' 
        },
        animation: {
          animateRotate: true,
          animateScale: true
        }
      }
    });

  }

}
