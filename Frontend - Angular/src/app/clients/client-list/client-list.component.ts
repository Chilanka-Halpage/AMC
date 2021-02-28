import { Router } from '@angular/router';
import { Client } from './../../Model/client.model';
import { ClientService } from './../../shared/client.service';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { SharedAmcService } from 'src/app/shared/shared-amc.service';
import { merge, Observable, of as observableOf } from 'rxjs';
import { startWith, switchMap, map, catchError } from 'rxjs/operators';
import { ClientDepartment } from 'src/app/Model/client-department';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'clientName',
    'active',
    'contactNo',
    'contactPerson',
    'address',
    'savedIp',
    'savedBy',
    'savedOn',
    'lastModifiedBy',
    'lastModifiedOn',
    'action'
  ];
  dataSource: Client[];
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  pagesize = 20;
  filterValue: string;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private clientService: ClientService,
    private router: Router,
    private sharedService: SharedAmcService
  ) { }

  ngOnInit(): void {
    //this.loadClientList();
    //this.setTableData();
  }
  ngAfterViewInit(): void {
    this.loadingDeptData();

  }

  applyFilter(event: Event) {
    this.filterValue = (event.target as HTMLInputElement).value;
  }

  loadingDeptData(): void {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.loadDeptData(
            this.sort.active, this.sort.direction, this.paginator.pageIndex);
        }),
        map(data => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.isRateLimitReached = false;
          this.resultsLength = data.totalElements;

          return data.content;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          // Catch if the GitHub API has reached its rate limit. Return empty data.
          this.isRateLimitReached = true;
          return observableOf([]);
        })
      ).subscribe(response => {
        let deptData: Client[] = response;
        deptData.map(data => {
          if (data.active == true) {
            data.active = "Active";
          }
          else {
            data.active = "Inactive"
          }
        })
        this.dataSource = deptData;
      });
  }

  loadDeptData(sort: string, order: string, page: number): Observable<any> {
    return this.clientService.getAllClients(page, this.pagesize, sort, order);
  }

  onCreate(): void {
    this.router.navigateByUrl('client/new');
  }

  onSelect(row: Client): void {
    this.sharedService.data = row.clientName;
    this.router.navigate(['dept-list', row.clietnID]);

  }

  onEdit(row: any): void {
    console.log(row);
    this.sharedService.changeData(row);
    this.router.navigateByUrl('client/edit');
  }

}
