import { MessageComponent } from './../message/message.component';
import { Router } from '@angular/router';
import { AuthenticationService } from './../_helpers/authentication.service';
import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, interval, Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { AllAmcFilterComponent } from '../Filters/all-amc-filter/all-amc-filter.component'
import { ClientDetailsFilterComponent } from '../Filters/client-details-filter/client-details-filter.component';
import { FullDetailsFilterComponent } from '../Filters/full-details-filter/full-details-filter.component';
import { RenewalAmcsFilterComponent } from '../Filters/renewal-amcs-filter/renewal-amcs-filter.component';
import { RenewedAmcsFilterComponent } from '../Filters/renewed-amcs-filter/renewed-amcs-filter.component';
import { ExpiredAmcsFilterComponent } from '../Filters/expired-amcs-filter/expired-amcs-filter.component';
import { PaymentReportFilterComponent } from '../Filters/payment-report-filter/payment-report-filter.component';
import { HomedetailsService } from '../homedetails.service';
import { QuarterWiseReportComponent } from '../Filters/quarter-wise-report/quarter-wise-report.component';
import { JrReportDetailsService } from '../data/jr-report-details.service';
import { NotificationService } from '../data/notification.service';
import { ImageService } from '../data/image-service.service';
import { LoginDetailsService } from '../data/login-details.service'
import { error } from '@angular/compiler/src/util';

@Component({
  selector: 'app-root-nav',
  templateUrl: './root-nav.component.html',
  styleUrls: ['./root-nav.component.scss']
})
export class RootNavComponent {

  private linkColor: NodeListOf<Element>;
  hidden: boolean;
  userId: String
  imgSource: String
  public imageSrc: String;
  notificationNo;
  isLoadingResults = true;
  isRateLimitReached = false;
  errorMessage = "Unknown Error"
  imageload = false;
  notificationLoad = false;
  private updateSubscription: Subscription; 

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private jrReportDetailsService: JrReportDetailsService,
    private breakpointObserver: BreakpointObserver,
    private dialog: MatDialog,
    public _authentication: AuthenticationService,
    private router: Router,
    private homedetalis: HomedetailsService,
    private loginDetailsService: LoginDetailsService,
    private notificationService: NotificationService,
    private imageService: ImageService
  ) { }


  logout() {
    this.loginDetailsService.logoutDetails().subscribe(
      Responce => {
        this.router.navigate(['/login']);
        this.logoutmessage();
        window.location.reload()
      }
    )
  }

  gotolog(): void {
    this.router.navigate(['/login']);
  }

  logoutmessage() {
    this.dialog.open(MessageComponent);
  }

  ngOnInit(): void {

    this.updateSubscription = interval(20000).subscribe(
      (val) => { 
        this.loadselectdata()
    }
  );
   /*  setTimeout(()=>{                         
      this.loadselectdata()
      console.log("check2")
    }, 100); */

    this.linkColor = document.getElementsByName('nav-link');
  }

  colorLink(event) {
    this.linkColor.forEach(element => element.classList.remove('active'))
    event.srcElement.classList.add('active');
  }

  colorLink2(id) {
    const elements = document.getElementsByTagName('mat-expansion-panel-header');
    for (let index = 0; index < elements.length; index++) {
      elements[index].classList.remove('selected');
    }
    document.getElementById(id).classList.add('selected');

  }

  AllAMCDetailsFilter(event) {
    this.colorLink(event)
    this.dialog.open(AllAmcFilterComponent)
  }

  ClientsDetailsFilter(event) {
    this.colorLink(event)
    this.dialog.open(ClientDetailsFilterComponent)
  }
  FullDetailsFilter(event) {
    this.colorLink(event)
    this.dialog.open(FullDetailsFilterComponent)
  }
  RenewalAmcsFilter(event) {
    this.colorLink(event)
    this.dialog.open(RenewalAmcsFilterComponent)
  }
  RenewedAmcsFilter(event) {
    this.colorLink(event)
    this.dialog.open(RenewedAmcsFilterComponent)
  }
  ExpiredAmcsFilter(event) {
    this.colorLink(event)
    this.dialog.open(ExpiredAmcsFilterComponent)
  }
  PaymentReportFilter(event) {
    this.colorLink(event)
    this.dialog.open(PaymentReportFilterComponent)
  }
  QuarterWiseReport(event) {
    this.colorLink(event)
    this.dialog.open(QuarterWiseReportComponent)
  }

  //Client AMC
  ClientAmc(event) {
    this.colorLink(event)
    this.router.navigate([`clientAmc/${this._authentication.userId}`]);
  }

  //Client Payment report
  ClientPayment(event) {
    this.colorLink(event)
    this.router.navigate([`clientPaymentReport/${this._authentication.userId}`]);
  }

  dashboardcheck() {
    if (this._authentication.role == "ROLE_CLIENT") {
      this.router.navigate(['/clienthome']);
    } else {
      this.router.navigate(['/adminhome']);
    }
  }
  profilepage() {
    this.router.navigate([`/profile/${this._authentication.userId}`])
  }

  //notification
  updateIsRead() {
    this.notificationService.updateIsRead(this._authentication.userId).subscribe(
      Response => { console.log("success", Response) }
    )
  }
  notification() {
    this.router.navigate([`/notification/${this._authentication.userId}`]);
    this.updateIsRead()
  }

loadselectdata(){
  if(this._authentication.userId!=null){
    this.notificationNo=this.notificationService.getNotificationNo(this._authentication.userId).subscribe(
    data => {this.notificationNo = data;
      if(this.notificationNo==0)
          {this.hidden=true;}
      else
         {this.hidden=false;}       
      });}
}
}