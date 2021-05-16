import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from './../../_helpers/authentication.service';
import { AmcMasterService } from './../../shared/amc-master.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-amc-history-view',
  templateUrl: './amc-history-view.component.html',
  styleUrls: ['./amc-history-view.component.scss']
})
export class AmcHistoryViewComponent implements OnInit {

  public list: any[];
  public clientName: string;
  public amcNo: string;
  public isLoadingResults = true;
  public isRateLimitReached = false;
  public errorMessage = "Unknown Error";
  public isListEmpty = false;

  constructor(
    private amcService: AmcMasterService,
    private activatedRoute: ActivatedRoute,
    public authService: AuthenticationService,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      let value = JSON.parse(params["data"]);
      this.clientName = value.cname;
      this.amcNo = value.amcno;
      this.loadData(this.amcNo);
    });
  }

  private loadData(amcNo: string){
    this.amcService.getAmcHistoryData(amcNo).subscribe(response => {
      this.list = response;
      if(!this.list.length) this.isListEmpty = true;
    }, (error) => {
      this.errorMessage = 'Cannot proceed the request.Try again';
      this.isRateLimitReached = true;
    }).add(() => this.isLoadingResults = false);
  }
}
