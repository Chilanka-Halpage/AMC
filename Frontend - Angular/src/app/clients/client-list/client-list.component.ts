import { NavigationExtras, Router } from '@angular/router';
import { Client } from './../../Model/client.model';
import { ClientService } from './../../shared/client.service';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { NotificationService } from 'src/app/shared/notification.service';
import { merge, Observable, of as observableOf } from 'rxjs';
import { startWith, switchMap, map, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements AfterViewInit {
  public displayedColumns: string[] = [
    'clientName',
    'active',
    'contactNo',
    'contactPerson',
    'address',
    'savedBy',
    'savedOn',
    'lastModifiedBy',
    'lastModifiedOn',
    'lastModifiedIp',
    'action'
  ];
  public dataSource: Client[];
  public resultsLength = 0;
  public isLoadingResults = true;
  public isRateLimitReached = false;
  public errorMessage = "Unknown Error"
  public pagesize = 20;
  public filterValue: string;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private clientService: ClientService,
    private router: Router,
    private sharedService: NotificationService
  ) { }

  ngAfterViewInit(): void {
    this.loadingClientData();
  }

  applyFilter(event: Event) {
    this.filterValue = (event.target as HTMLInputElement).value;
  }

  loadingClientData(): void {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.getClientData(
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
        this.dataSource = response;
      });
  }

  getClientData(sort: string, order: string, page: number): Observable<any> {
    return this.clientService.getAllClients(page, this.pagesize, sort, order);
  }

  onCreate(): void {
    this.router.navigateByUrl('client/new');
  }

  onSelectDept(row: Client): void {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "data": JSON.stringify({
          "id": row.clientId,
          "name": row.clientName
        })
      }
    };
    this.router.navigate(['dept-list'], navigationExtras);
  }

  onSelectAmc(row: Client): void {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "data": JSON.stringify({
          "id": row.clientId,
          "name": row.clientName
        })
      }
    };
    this.router.navigate([`clients/${row.clientId}/amc-list`], navigationExtras);
  }

  onEdit(row: any): void {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        data: JSON.stringify({
          type: "%CE2%",
          data: row
        })
      }
    };
    this.router.navigate(['/client/edit/'], navigationExtras);
  }
}
