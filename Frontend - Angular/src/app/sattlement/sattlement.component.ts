import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sattlement',
  templateUrl: './sattlement.component.html',
  styleUrls: ['./sattlement.component.scss']
})
export class SattlementComponent implements OnInit {

  constructor() { }

  displayedColumns:string[] = ['taxName','shortName','taxRate','savedOn','savedIp','Status','Action','update'];


  ngOnInit(): void {
  }

}
