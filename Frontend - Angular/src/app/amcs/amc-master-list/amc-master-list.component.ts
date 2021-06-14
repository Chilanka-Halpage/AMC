import { AuthenticationService } from './../../_helpers/authentication.service';
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
  private clientId: number;
  public clientName: string;
  public dataSource: MatTableDataSource<AmcMaster>;
  public resultsLength = 0;
  public isLoadingResults = true;
  public isRateLimitReached = false;
  public errorMessage = "Unknown Error"
  public isBlocked = false;


  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private amcService: AmcMasterService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private authService: AuthenticationService
  ) { }

  ngOnInit(): void {
    if (this.authService.role === 'ROLE_CLIENT') {
      this.loadAmcMasterListForClient(this.authService.userId);
      this.isBlocked = true;
    } else {
      this.activatedRoute.queryParams.subscribe(params => {
        let value = JSON.parse(params["data"]);
        this.clientId = value.id;
        this.clientName = value.name;
        this.loadAmcMasterList(this.clientId);
      });
    }
  }

  private loadAmcMasterList(clientId: number) {
    this.isLoadingResults = true;
    this.amcService.getAmcMasterList(clientId).subscribe(response => {
      this.isLoadingResults = false;
      this.isRateLimitReached = false;
      this.setDataToTable(response);
    }, error => {
      this.isLoadingResults = false;
      this.isRateLimitReached = true;
      this.errorMessage = (error.status === 0 || error.status === 404 || error.status === 403 || error.status === 401) ? error.error : 'Error in loading data';
    })
  }

  private loadAmcMasterListForClient(userId: string) {
    this.isLoadingResults = true;
    this.amcService.getAmcMasterListForClient(userId).subscribe(response => {
      this.isLoadingResults = false;
      this.isRateLimitReached = false;
      this.setDataToTable(response);
    }, error => {
      this.isLoadingResults = false;
      this.isRateLimitReached = true;
      this.errorMessage = (error.status === 0 || error.status === 404 || error.status === 403 || error.status === 401) ? error.error : 'Error in loading data';
    })
  }

  private setDataToTable(data: any) {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.resultsLength = this.dataSource.data.length;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
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
