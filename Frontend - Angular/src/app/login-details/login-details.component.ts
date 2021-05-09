import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { merge, Observable } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { LoginDetailsService } from '../data/login-details.service';
import { LoginDetails } from '../data/loginDetails/login-details';

@Component({
  selector: 'app-login-details',
  templateUrl: './login-details.component.html',
  styleUrls: ['./login-details.component.scss']
})
export class LoginDetailsComponent implements OnInit {

  loginDetails: MatTableDataSource<LoginDetails>
  public resultsLength = 0;
  public isLoadingResults = false;
  public isRateLimitReached = false;
  public pagesize = 20;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private loginDetailsService: LoginDetailsService
  ) { }

  ngOnInit(): void {
    this.getLoginDetails()
  }
  // getLoginDetails(){
  //   this.loginDetailsService.getLoginDetails().subscribe(
  //     response => {
  //       this.loginDetails = new MatTableDataSource(response);
  //     })
  // }

  //----------------------------------
  getLoginDetails(): void {
    //this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    merge( this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.getClientData(this.paginator.pageIndex);
        }),
        map(data => {
          // slet flag to show that loading has finished.
          this.isLoadingResults = false;
          this.isRateLimitReached = false;
          this.resultsLength = data.totalElements;

          return data.content;
        }),
      ).subscribe(response => {
        this.loginDetails = response;
      });
  }
  getClientData(page: number): Observable<any> {
    return this.loginDetailsService.getLoginDetails(page, this.pagesize);
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.loginDetails.filter = filterValue.trim().toLowerCase();
  }

  displayedColumns: string[] = ['user_id','uname','loged_ip','loged_datetime','logout_ip','logout_datetime'];
}
