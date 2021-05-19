import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { from, merge, Observable, of as observableOf} from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { NotificationService } from '../data/notification.service';
import { Notification } from '../data/notification/notification'
import { AuthenticationService } from '../_helpers/authentication.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  notifications: MatTableDataSource<Notification>;
  userId :any
  public isLoadingResults = true;
  public resultsLength = 0;
  public pagesize = 20;
  public isRateLimitReached = false;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(
    private notificationService: NotificationService,
    public _authentication: AuthenticationService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getNotifications()
    //this.updateIsRead()
  }

  loadingClientData(): void {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.getNotificationData(
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
          if (error.status === 403) {
            this._authentication.logoutUser();
            this.router.navigate(['/login']);
          }
          this.isLoadingResults = false;
          // set flag to identify that errors ocuured
          this.isRateLimitReached = true;
          return observableOf([]);
        })
      ).subscribe(response => {
        this.notifications = response;
      });
  }

  getNotificationData(sort: string, order: string, page: number): Observable<any> {
    return this.notificationService.getNotifications(page, this.pagesize, sort, order, this._authentication.userId);
  }

  getNotifications() {
    this.notificationService.getNotification(this._authentication.userId).subscribe(
      data => {
        this.notifications = new MatTableDataSource(data);
        console.log(data)
        this.isLoadingResults=false;
        this.resultsLength = this.notifications.data.length;
      })
  }


displayedColumns: string[] = ['savedDate', 'notification'];

}
