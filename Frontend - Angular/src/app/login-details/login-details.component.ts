import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { merge, Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { LoginDetailsService } from '../data/login-details.service';
import { LoginDetails } from '../data/loginDetails/login-details';
import { NotificationService } from '../shared/notification.service';
import { AuthenticationService } from '../_helpers/authentication.service';

@Component({
  selector: 'app-login-details',
  templateUrl: './login-details.component.html',
  styleUrls: ['./login-details.component.scss']
})
export class LoginDetailsComponent implements OnInit {

  loginDetails: LoginDetails[]
  public resultsLength = 0;
  public isLoadingResults = true;
  public isRateLimitReached = false;
  public pagesize = 20;
  public errorMessage = "Unknown Error"
  public filterValue: string;
  public isAuthorized: boolean;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private loginDetailsService: LoginDetailsService,
    private router: Router,
    private authService: AuthenticationService,
    private notificationService: NotificationService,
  ) { }

  ngOnInit(): void {
    this.isAuthorized = (this.authService.role === 'ROLE_ADMIN') ? true : false;
  }

  ngAfterViewInit(): void {
    this.getLoginDetails()
  }
  loginDetailsTest(){

  }

  getLoginDetails(): void {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.getLoginData(
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
            this.authService.logoutUser();
            this.router.navigate(['/login']);
          }
          this.isLoadingResults = false;
          // set flag to identify that errors ocuured
          this.isRateLimitReached = true;
          return observableOf([]);
        })
      ).subscribe(response => {
        this.loginDetails = response;
      },
      (error)=>{
        const errMessage =(error.status === 0 || error.status===401 || error.status===403)?error.error : 'Cannot proceed the request. try again!'
        this.notificationService.showNoitfication(errMessage, 'OK', 'error', null);
      });
  }


  getLoginData(sort: string, order: string, page: number): Observable<any> {
    return this.loginDetailsService.getLoginDetails(page, this.pagesize, sort, order);
  }

  applyFilter(event: Event) {
    this.filterValue = (event.target as HTMLInputElement).value;
  }

  displayedColumns: string[] = ['user_id','uname','loged_ip','loged_datetime','logout_ip','logout_datetime'];
}
