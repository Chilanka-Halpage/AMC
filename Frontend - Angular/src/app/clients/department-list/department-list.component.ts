import { ClientDepartment } from './../../Model/client-department';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute, Router, InitialNavigation, NavigationStart } from '@angular/router';
import { ClientService } from 'src/app/shared/client.service';
import { SharedAmcService } from 'src/app/shared/shared-amc.service';
import { MatTableDataSource } from '@angular/material/table';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.css']
})
export class DepartmentListComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'departmentName',
    'isActive',
    'email',
    'contactNo',
    'contactPerson',
    'savedIp',
    'savedBy',
    'savedOn',
    'lastModifiedBy',
    'lastModifiedOn',
    'action'
  ];
  cid: number;
  clientName: any;
  dataSource: MatTableDataSource<ClientDepartment>;
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;


  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private clientService: ClientService,
    private activatedRoute: ActivatedRoute,
    private sharedService: SharedAmcService,
    private router: Router,
  ) {
    this.clientName = this.sharedService.data;
  }

  ngAfterViewInit(): void {

    this.activatedRoute.paramMap.subscribe(params => {
      this.cid = +params.get('cid');
      this.loadClientList(this.cid);
    });

  }
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  loadClientList(cid: number): void {
    this.isLoadingResults = true;
    this.clientService.getDepartmentsByClientId(cid).subscribe(response => {
      response.map(data => {
        if (data.isActive == true) {
          data.isActive = 'Active';
        }
        else {
          data.isActive = 'Inactive';
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
    })
  }

  onCreate(): void {
    this.router.navigate(['client/' + this.cid + '/dept/new']);
  }

  onEdit(row: any): void {
    this.router.navigate(['client/dept/edit/', row.deptId]);
  }

  onSelect(row: any): void {

  }

}
