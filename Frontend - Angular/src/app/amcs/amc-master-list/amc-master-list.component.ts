import { AmcMasterService } from './../../shared/amc-master.service';
import { AmcMaster } from './../../Model/amc-master.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-amc-master-list',
  templateUrl: './amc-master-list.component.html',
  styleUrls: ['./amc-master-list.component.css']
})
export class AmcMasterListComponent implements OnInit {

  displayedColumns: string[] = [
    'amcNo',
    'startDate',
    'frequency',
    'totalValueLkr',
    'isActive',
    'action'
  ];
  clientId: number;
  clientName: string;
  dataSource: MatTableDataSource<AmcMaster>;
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  errorMessage = "Unknown Error"

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private amcService: AmcMasterService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      let value = JSON.parse(params["data"]);
      this.clientId = value.id;
      this.clientName = value.name;
      this.loadAmcMasterList(this.clientId);
    });
  }
  
  private loadAmcMasterList(clientId: number) {
    this.isLoadingResults = true;
    this.amcService.getAmcMasterList(clientId).subscribe(response => {
      this.isLoadingResults = false;
      this.isRateLimitReached = false;
      this.dataSource = new MatTableDataSource(response);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.resultsLength = this.dataSource.data.length;
    }, error => {
      this.isLoadingResults = false;
      this.isRateLimitReached = true;
      if (error.status === 404) this.errorMessage = error.error.message;
    })
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onCreate(): void {
    this.router.navigate(['client/' + this.clientId + '/dept/new']);
  }

  onSelect(row: any): void {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "data": JSON.stringify({
          "type": "%M1%",
          "cname": this.clientName,
          "amcno": row.amcNo
        })
      }
    };
    this.router.navigate([`clients/amc-list/${row.amcNo}/full`], navigationExtras);
  }

  onHistory(row: any): void {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "data": JSON.stringify({
          "cname": this.clientName,
          "amcno": row.amcNo
        })
      }
    };
    this.router.navigate(['amcHistory/view'], navigationExtras);
  }

}
