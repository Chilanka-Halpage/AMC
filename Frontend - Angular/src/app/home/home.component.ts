import { Router } from '@angular/router';
import { AuthenticationService } from './../_helpers/authentication.service';
import { HomedetailsService } from './../homedetails.service';
import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import * as Chart from 'chart.js';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, interval, Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { RenewalAmcsFilterComponent } from '../Filters/renewal-amcs-filter/renewal-amcs-filter.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    pie!: Chart;
    bar!: Chart;
    doughnut!: Chart;
    date=new Date();
    TotalAmc;
    ActiveAmcCount;
    TotalActiveClients;
    InactiveAmcCount;
    AmcReminders;
    renewedAmcCount;
    expiredAmcCount
    loginDetails: MatTableDataSource<any>;
    loginDetail: MatTableDataSource<any>;
    activeLoad = false;
    inactiveLoad = false;
    renewdLoad = false;
    expiredLoad = false;
    renewelLoad = false;
    month=[];
  private updateSubscription: Subscription; 
  public isAuthorized: boolean; 
  public revanue=[];  
  public isLoadingResults = true;
  public isRateLimitReached = false;
  public errorMessage = "Unknown Error"
  
  displayedColumns:string[] = ['user_id','loged_ip'];

  constructor( 
               private homedetails: HomedetailsService ,
               private datePipe: DatePipe,
               private _authentication: AuthenticationService,
               private router: Router,
               private dialog: MatDialog,
               ) { }

  ngOnInit(): void {
   this.getActiveClient();
   this.getActiveAmcCount();
   this.getinactiveAmccount();
   this.getTotalAmc();
   this.getLogindetails();
   this.lastyearrevanu();
   this.expiredamcCount(); 
   this.RenewedAmcscount()
   this.RenewelAmcCount();
   this.monthcount();
   this.getlogDetails();
   this.isAuthorized = (this._authentication.role === 'ROLE_ADMIN') ? true : false;
   this.getActiveClient()
  
  }

  getActiveClient(){
    this.homedetails.getActiveClient().subscribe(data=>{
      this.TotalActiveClients=data
    })
  }

  getActiveAmcCount(){
    this.homedetails.getActiveAmcCount().subscribe(data=>{
      this.isLoadingResults = ((this.activeLoad = true) && this.inactiveLoad) ? false : true;
      this.ActiveAmcCount=data
      if(!this.isLoadingResults ){
        this.doughnutchart()
      }
    })
  }

  getinactiveAmccount(){
    this.homedetails.getInactiveAmcCount().subscribe(data=>{
      this.isLoadingResults = (( this.inactiveLoad = true) && this.activeLoad ) ? false : true ;
      this.InactiveAmcCount=data  
      if(!this.isLoadingResults ){
        this.doughnutchart()
      }
    })
  }
  
  getTotalAmc(){
    this.homedetails.getTotalAmc().subscribe(data=>{
      this.TotalAmc=data
    })
  }
 
  getLogindetails(){
    this.homedetails.logdetails().subscribe(data =>{
      this.loginDetails = new MatTableDataSource(data)
  });
}

getlogDetails(){
  this.homedetails.logdetail(this._authentication.userId).subscribe(data =>{
    this.loginDetail = new MatTableDataSource(data)
});
}

lastyearrevanu(){
  let date=new Date();
  let formatteddate1 = this.datePipe.transform(date, "yyyy-MM-30");
  this.homedetails.lastyearrevanue(formatteddate1).subscribe( data1 => {   
    this.revanue = data1
    this.bar = new Chart("bar", {
      type: 'bar',
      data: {
        labels: this.month,
        datasets: [{
          label: 'Revenue',
          data: this.revanue,
          backgroundColor:"#4265ff",
        }] 
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,       
        animation: {
          animateRotate: true,
          animateScale: true
        }
      }
    });
  },
    error => {console.log("Error!", error)
  })
}

 doughnutchart(){
  this.doughnut = new Chart("doughnut", {
    type: 'doughnut',
    data: {
      labels: ["Active", "Inactive"],
      datasets: [{
        label: '# of Votes',
        data: [this.ActiveAmcCount ,this.InactiveAmcCount ],
        backgroundColor: ["Red", "Blue"],
        borderColor: [" rgba(219, 220, 243, 0.781)"," rgba(219, 220, 243, 0.781)"],
        borderWidth: 0
      }]
    },
    options: {
      responsive: true,
    
      animation: {
        animateRotate: true,
        animateScale: true
      }
    }
  });
}

RenewedAmcscount(){
  let date=new Date();
  let formatteddate1 = this.datePipe.transform(date, "yyyy-MM-dd");  
  date.setMonth(date.getMonth() - 3);
  let formatteddate2 = this.datePipe.transform(date, "yyyy-MM-dd");
  this.homedetails.RenewedAmcscount(formatteddate2,formatteddate1).subscribe(
    data => { 
      this.isLoadingResults = ((this.renewdLoad = true) && this.renewelLoad) ? false : true;
      this.renewedAmcCount=data
      if(!this.isLoadingResults ){
        this.piechart();
      }
  },
    error => {console.log("Error!", error)
  })
}
 
 RenewelAmcCount(){
  let date=new Date();
  let formatteddate1 = this.datePipe.transform(date, "yyyy-MM-dd");
  date.setMonth(date.getMonth() + 1);
  let formatteddate2 = this.datePipe.transform(date, "yyyy-MM-dd");
  this.homedetails.Amcreminders(formatteddate1,formatteddate2).subscribe(
    data => {
      this.isLoadingResults = ((this.renewelLoad = true) && this.renewdLoad) ? false : true;
      this.AmcReminders=data
      if(!this.isLoadingResults ){
        this.piechart();
      }
  },
  error => {console.log("Error!", error)
})
}

expiredamcCount(){
 let date=new Date();
  let formatteddate1 = this.datePipe.transform(date, "yyyy-MM-dd");
  date.setMonth(date.getMonth() - 12);
  let formatteddate2 = this.datePipe.transform(date, "yyyy-MM-dd");
  this.homedetails.expiredamcCount(formatteddate2,formatteddate1).subscribe(
    data => { this.expiredAmcCount=data
  },
    error => {console.log("Error!", error)
  })
}

piechart(){
  this.pie = new Chart("pie", {
    type: 'pie',
    data: {
      labels: [ "Expired", "Renewal","Renewed"],
      datasets: [{
        label: '# of Votes',
        data: [this.expiredAmcCount,this.AmcReminders,this.renewedAmcCount],
        backgroundColor: ["#173F5F", "#20639B", "#3CAEA3"],
        borderColor: ["White","White","White","White","White"],
        borderWidth: 0
      }]
    },
    options: {
      responsive: true,
      animation: {
        animateRotate: true,
        animateScale: true
      }
    }
  });
}

monthcount(){
  let date2 = new Date();
  let months = [],
      monthNames = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
  for(var i = 0; i < 12; i++) {
      months.push(monthNames[date2.getMonth()]);
      date2.setMonth(date2.getMonth() - 1);
  } 
  this.month = months
}

gotoclientlist(){
  this.router.navigate(['client-list']); 
}

RenewalAmcsFilter() {
  this.dialog.open(RenewalAmcsFilterComponent);
}

}