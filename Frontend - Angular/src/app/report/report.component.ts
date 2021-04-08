import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import {AllAmcFilterComponent} from '../Filters/all-amc-filter/all-amc-filter.component'
import { from } from 'rxjs';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  constructor(private route: ActivatedRoute,private router: Router,
    private dialog:MatDialog) { }

  ngOnInit(): void {
  }
  //AllAMCDetailsFilter(){
  //  this.router.navigate(['allamcdetailsfilter', {relativeTo: this.route}])
 // }
 AllAMCDetailsFilter(){
  this.dialog.open(AllAmcFilterComponent)
}
  ClientDetailsFilter(){
    this.router.navigate(['clientdetailsfilter', {relativeTo: this.route}])
  }
  AllClientDetailsFilter(){
    this.router.navigate(['allclientsdetailsfilter', {relativeTo: this.route}])
  }
  ExpiredAMCDetailsFilter(){
    this.router.navigate(['expiredreportfilter', {relativeTo: this.route}])
  }
  RenewedAMCDetailsFilter(){
    this.router.navigate(['renewedreportfilter', {relativeTo: this.route}])
  }
  RenewalAMCDetailsFilter(){
    this.router.navigate(['renewalreportfilter', {relativeTo: this.route}])
  }
  UsersFilter(){
    this.router.navigate(['generatereport', {relativeTo: this.route}])
  }
}
