import { NavigationExtras, Router } from '@angular/router';
import { Client } from './../../Model/client.model';
import { ClientService } from './../../shared/client.service';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { NotificationService } from 'src/app/shared/notification.service';
import { merge, Observable, of as observableOf } from 'rxjs';
import { startWith, switchMap, map, catchError } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/_helpers/authentication.service';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit, AfterViewInit {
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
  public isAuthorized: boolean;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private clientService: ClientService,
    private router: Router,
    private authService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.isAuthorized = (this.authService.role === 'ROLE_ADMIN') ? true : false;
  }

  ngAfterViewInit(): void {
    this.loadingClientData();
  }

  applyFilter(event: Event) {
    this.filterValue = (event.target as HTMLInputElement).value;
  }

  //load and set data to the table
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
          // slet flag to show that loading has finished.
          this.isLoadingResults = false;
          this.isRateLimitReached = false;
          this.resultsLength = data.totalElements;

          return data.content;
        }),
        catchError( error => {
          this.errorMessage = error;
          this.isLoadingResults = false;
          // set flag to identify that errors ocuured
          this.isRateLimitReached = true;
          return observableOf([]);
        })
      ).subscribe(response => {
        this.dataSource = response;
      });
  }

  //Load client data as a page from backend
  getClientData(sort: string, order: string, page: number): Observable<any> {
    return this.clientService.getAllClients(page, this.pagesize, sort, order);
  }

  //Redirect to form of creating new client
  onCreate(): void {
    this.router.navigateByUrl('client/new');
  }

  //Selecting departments of the client
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

  //Selecting of AMCs of the client
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

  //Edit client data
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
