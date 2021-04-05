import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { AmcMaster } from 'src/app/Model/amc-master.model';
import { AmcMasterService } from 'src/app/shared/amc-master.service';

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
  clientName: string;
  departmentName: String;
  dataSource: MatTableDataSource<AmcMaster>;
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  errorMessage = "Unknown Error"

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private amcService: AmcMasterService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      let value = JSON.parse(params["data"]);
      this.clientName = value.cname;
      this.departmentName = value.dname;
      this.loadAmcSerialList(value.did);
    });
  }

  private loadAmcSerialList(deptId: number) {
    this.isLoadingResults = true;
    this.amcService.getAmcSerilaList(deptId).subscribe(response => {
      console.log(response);
      response.map(data => {
        if (data.active == true) {
          data.active = 'Active';
        }
        else {
          data.active = 'Inactive';
        }
      });
      this.isLoadingResults = false;
      this.isRateLimitReached = false;
      this.dataSource = new MatTableDataSource(response);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
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
    this.router.navigate(['client/' + this.clientName + '/dept/new']);
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

}
