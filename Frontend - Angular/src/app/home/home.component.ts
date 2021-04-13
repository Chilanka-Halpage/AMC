import { HomedetailsService } from './../homedetails.service';
import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    date=new Date();
    TotalAmc;
    ActiveAmcCount;
    TotalActiveClients;
    AmcReminders;

  constructor( private homedetails: HomedetailsService ,
               private datePipe: DatePipe,
               ) { }

  ngOnInit(): void {
   this.getActiveClient();
   this.getActiveAmcCount();
   this.getTotalAmc();
   this.amcreminder();
  }

  getActiveClient(){
    this.homedetails.getActiveClient().subscribe(data=>{
      this.TotalActiveClients=data
    })
  }

  getActiveAmcCount(){
    this.homedetails.getActiveAmcCount().subscribe(data=>{
      this.ActiveAmcCount=data
    })
  }
  
  getTotalAmc(){
    this.homedetails.getTotalAmc().subscribe(data=>{
      this.TotalAmc=data
    })
  }

  amcreminder(){
    let formatteddate1 = this.datePipe.transform(this.date, "yyyy-MM-dd");
    this.date.setMonth(this.date.getMonth() + 1);
    let formatteddate2 = this.datePipe.transform(this.date, "yyyy-MM-dd");
    this.homedetails.Amcreminders(formatteddate1,formatteddate2).subscribe(data=>{
     this.AmcReminders=data
     console.log(data)
    })
  }

}
