import { MessageComponent } from './../message/message.component';
import { Router } from '@angular/router';
import { AuthenticationService } from './../_helpers/authentication.service';
import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { AllAmcFilterComponent } from '../Filters/all-amc-filter/all-amc-filter.component'
import { ClientDetailsFilterComponent } from '../Filters/client-details-filter/client-details-filter.component';
import { FullDetailsFilterComponent } from '../Filters/full-details-filter/full-details-filter.component';
import { RenewalAmcsFilterComponent } from '../Filters/renewal-amcs-filter/renewal-amcs-filter.component';
import { RenewedAmcsFilterComponent } from '../Filters/renewed-amcs-filter/renewed-amcs-filter.component';
import { ExpiredAmcsFilterComponent } from '../Filters/expired-amcs-filter/expired-amcs-filter.component';
import { PaymentReportFilterComponent } from '../Filters/payment-report-filter/payment-report-filter.component';

@Component({
  selector: 'app-root-nav',
  templateUrl: './root-nav.component.html',
  styleUrls: ['./root-nav.component.scss']
})
export class RootNavComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,
    private dialog: MatDialog,
    public _authentication: AuthenticationService,
    private router: Router,
  ) { }

  AllAMCDetailsFilter() {
    this.dialog.open(AllAmcFilterComponent)
  }

  logout() {
    this._authentication.logoutUser();
    this.router.navigate(['/login']);
    this.logoutmessage();
  }
  logedin() {
    this._authentication.loggedIn();
  }
  gotolog(): void {
    this.router.navigate(['/login']);
  }

  logoutmessage() {
    this.dialog.open(MessageComponent);
  }
  ngOnInit(): void {

  }
  ClientsDetailsFilter() {
    this.dialog.open(ClientDetailsFilterComponent)
  }
  FullDetailsFilter() {
    this.dialog.open(FullDetailsFilterComponent)
  }
  RenewalAmcsFilter() {
    this.dialog.open(RenewalAmcsFilterComponent)
  }
  RenewedAmcsFilter() {
    this.dialog.open(RenewedAmcsFilterComponent)
  }
  ExpiredAmcsFilter() {
    this.dialog.open(ExpiredAmcsFilterComponent)
  }
  PaymentReportFilter() {
    this.dialog.open(PaymentReportFilterComponent)
  }
  dashboardcheck(){
    if(this._authentication.role == "ROLE_client"){
      this.router.navigate(['/clienthome']);
    }else{
      this.router.navigate(['/adminhome']);
    }
  }
  profilepage(){
     this.router.navigate([`/profile/${this._authentication.userId}`])
  }

}
