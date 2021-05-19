import { Currency } from './../../currency';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { AmcMaster } from 'src/app/Model/amc-master.model';
import { AmcMasterService } from 'src/app/shared/amc-master.service';
import { AuthenticationService } from 'src/app/_helpers/authentication.service';

@Component({
  selector: 'app-amc-serial-list',
  templateUrl: './amc-serial-list.component.html',
  styleUrls: ['./amc-serial-list.component.css']
})
export class AmcSerialListComponent implements OnInit {

  displayedColumns: string[] = [
    'amcNo',
    'mtcStartDate',
    'mtcEndDate',
    'frequency',
    'mtcValueForFrequencyLkr',
    'isActive',
    'action'
  ];
  private clientId: number;
  private departmentId: number;
  public clientName: string;
  public departmentName: String;
  public dataSource: MatTableDataSource<AmcMaster>;
  public resultsLength = 0;
  public isLoadingResults = true;
  public isRateLimitReached = false;
  public errorMessage = "Unknown Error"
  public isBlocked = false;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private amcService: AmcMasterService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private authService: AuthenticationService
  ) { }

  ngOnInit(): void {
    if (this.authService.role === 'ROLE_CLIENT')
      this.isBlocked = true;
    this.activatedRoute.queryParams.subscribe(params => {
      let value = JSON.parse(params["data"]);
      this.clientId = value.cid;
      this.clientName = value.cname;
      this.departmentName = value.dname;
      this.departmentId = value.did;
      this.loadAmcSerialList(this.departmentId);
    });
  }

  private loadAmcSerialList(deptId: number) {
    this.isLoadingResults = true;
    this.amcService.getAmcSerilaList(deptId).subscribe(response => {
      this.isLoadingResults = false;
      this.isRateLimitReached = false;
      this.dataSource = new MatTableDataSource(response);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.resultsLength = this.dataSource.data.length;
    }, error => {
      this.isLoadingResults = false;
      this.isRateLimitReached = true;
      console.log(error);
      this.errorMessage = error.error.message;
    })
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onCreate(): void {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        data: JSON.stringify({
          cid: this.clientId,
          cname: this.clientName,
          did: this.departmentId,
          dname: this.departmentName,
          type: "%c1%"
        })
      }
    };
    this.router.navigate(['/amcMaster/new'], navigationExtras);
  }

  onSelect(row: any): void {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "data": JSON.stringify({
          "type": "%S2%",
          "serial": row.amc_serial_no,
          "cname": this.clientName
        })
      }
    };
    this.router.navigate([`clients/amc-list/${row.amc_serial_no}/full`], navigationExtras);
  }

  gotoinvoice(amc_no: String): void {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "data": JSON.stringify({
          "id": this.departmentId, 
          "name": this.departmentName
        })
      }
    };
    this.router.navigate(['invoicelist',amc_no],navigationExtras);
  }

  createinvoice(amc_no:String): void{
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "data": JSON.stringify({
          "id": this.departmentId, 
          "name": this.departmentName
        })
      }
    };
    this.router.navigate(['createinvoice/',amc_no],navigationExtras);
  }

}
