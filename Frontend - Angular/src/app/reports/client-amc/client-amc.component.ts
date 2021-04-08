import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReportDetailsService } from 'src/app/data/report-details.service';
import { ClientAmc } from '../../data/ClientAmc/client-amc';

@Component({
  selector: 'app-client-amc',
  templateUrl: './client-amc.component.html',
  styleUrls: ['./client-amc.component.scss']
})
export class ClientAmcComponent implements OnInit {

  clientAmc : ClientAmc;
  cId : any

  constructor(
    private reportDetailsService: ReportDetailsService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.cId = params.get('cId');
      console.log(this.cId);
      this.ClientAmc(this.cId);
  });
  }
  ClientAmc(cId){
    this.reportDetailsService.ClientAmc(cId).subscribe(
      data=>{
      this.clientAmc = data;
    });
  }
  displayedColumns: string[] = ['amc_no','amc_serial_no', 'amc_product_no', 'start_date', 'category_name',
  'department_name','frequency','mtc_start_date','mtc_end_date','product_description'];

}
