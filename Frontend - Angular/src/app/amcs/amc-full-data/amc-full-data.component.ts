import { AmcMasterService } from 'src/app/shared/amc-master.service';
import { AmcData } from './../../Model/amc-data.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-amc-full-data',
  templateUrl: './amc-full-data.component.html',
  styleUrls: ['./amc-full-data.component.css']
})
export class AmcFullDataComponent implements OnInit {

  clientName: string;
  data: AmcData;
  isLoadingResults = true;
  isRateLimitReached = false;
  errorMessage = "Unknown Error"
  constructor(
    private amcService: AmcMasterService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      let value = JSON.parse(params["data"]);
      if (value.type === "%M1%") {
        this.clientName = value.cname;
        this.loadDataByAmcNo(value.amcno);
      }
      else if (value.type === "%S2%") {
        this.clientName = value.cname;
        this.loadDataByAmcSerialNo(value.serial);
      }

    });
  }

  loadDataByAmcNo(amcNo: string): void {
    this.isLoadingResults = true;
    this.amcService.getAmcFullDataByAmcNo(amcNo).subscribe(response => {
      this.data = response;
      this.isLoadingResults = false;
      this.isRateLimitReached = false;
    }, error => {
      this.errorMessage = error.error.message;
      this.isLoadingResults = false;
      this.isRateLimitReached = true;
    })
  }

  loadDataByAmcSerialNo(amcSerialNo: string): void {
    this.isLoadingResults = true;
    this.amcService.getAmcFullDataByAmSerialcNo(amcSerialNo).subscribe(response => {
      this.data = response;
      this.isLoadingResults = false;
      this.isRateLimitReached = false;
    }, error => {
      this.errorMessage = error.error.message;
      this.isLoadingResults = false;
      this.isRateLimitReached = true;
    })
  }

  redirect(): void {
    this.amcService.getAmcScannedCopy(this.data.contract_url).subscribe(response => {
      console.log(response);
      let url = URL.createObjectURL(response);
      console.log(url);
      window.open(url, '_blank');
      URL.revokeObjectURL(url);
    },
    error => {
      console.log(error);
    });
  }

  onSelect(): void {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "data": JSON.stringify({
          "serial": this.data.amc_serial_no,
          "cname": this.clientName
        })
      }
    };
    this.router.navigate([`clients/amc-list/${this.data.amc_serial_no}/renew`], navigationExtras);
  }

  onEditGeneral(): void {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "data": JSON.stringify({
          cname: this.clientName,
          dname: this.data.department_name,
          amcNo: this.data.amc_no,
          type: "%u2%"
        })
      }
    };
    this.router.navigate(['/amcMaster/new'], navigationExtras);
  }

}
