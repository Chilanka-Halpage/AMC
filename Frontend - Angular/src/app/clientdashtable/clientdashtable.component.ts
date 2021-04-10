
import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table/table-data-source';

@Component({
  selector: 'app-clientdashtable',
  templateUrl: './clientdashtable.component.html',
  styleUrls: ['./clientdashtable.component.scss']
})
export class ClientdashtableComponent implements OnInit {

  clientdetails: MatTableDataSource<any>;

  constructor() { }

  displayedColumns:string[] = ['recNo','recDate','payMode','balance','Category','pi_no'];
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit(): void {
  }

}
