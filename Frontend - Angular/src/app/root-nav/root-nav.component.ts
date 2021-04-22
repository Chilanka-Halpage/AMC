import { MessageComponent } from './../message/message.component';
import { Router } from '@angular/router';
import { AuthenticationService } from './../_helpers/authentication.service';
import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { from, Observable } from 'rxjs';
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
import {ImageService} from '../data/image-service.service';

@Component({
  selector: 'app-root-nav',
  templateUrl: './root-nav.component.html',
  styleUrls: ['./root-nav.component.scss']
})
export class RootNavComponent {
  
  userId : String
  imgSource : String
  public imageSrc: string;
  notificationNo

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
    
    private notificationService:NotificationService,
    private imageService: ImageService
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
    this.notificationCount()
    this.imageSrc= this.imageService.Image(this._authentication.userId);
    this.homedetalis.getImage(this._authentication.userId).subscribe(
      Response =>{
        this.imgSource = Response;
      }
    )
    this.imageSrc= this.homedetalis.Image(this._authentication.userId);
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
  QuarterWiseReport(){
    this.dialog.open(QuarterWiseReportComponent)
  }



  //Client AMC
  ClientAmc(){
    //this.router.navigate([`clientAmc/${this._authentication.userId}`]);
    this.jrReportDetailsService.ClientAmcJrReport(this._authentication.userId).subscribe(
      Response => {console.log("success", Response)
      this.router.navigate([`clientAmc/${this._authentication.userId}`]);
    },
      error => {console.log("Error!", error)
    }
    )
  }

  //Client Payment report
  ClientPayment(){
    //this.router.navigate([`clientPaymentReport/${this._authentication.userId}`]);
    this.jrReportDetailsService.ClientPaymentJrReport(this._authentication.userId).subscribe(
      Response => {console.log("success", Response)
      this.router.navigate([`clientPaymentReport/${this._authentication.userId}`]);
    },
      error => {console.log("Error!", error)
    }
    )
  }

  dashboardcheck(){
    if(this._authentication.role == "ROLE_CLIENT"){
      this.router.navigate(['/clienthome']);
    }else{
      this.router.navigate(['/adminhome']);
    }
  }
  profilepage(){
     this.router.navigate([`/profile/${this._authentication.userId}`])
  }

    //notification
  updateIsRead() {
    this.notificationService.updateIsRead(this._authentication.userId).subscribe(
        Response => {console.log("success", Response)}
      )
  }
  notification(){
    this.router.navigate([`/notification/${this._authentication.userId}`]);
    this.updateIsRead()
 }

 hidden;

 notificationCount(){
  console.log(this._authentication.userId)
  this.notificationNo=this.notificationService.getNotificationNo(this._authentication.userId).subscribe(
    data => {
      this.notificationNo = data;
      if(this.notificationNo==0)
      {this.hidden=true;}
      else
      {this.hidden=false;}
    }
    );
  }
}
