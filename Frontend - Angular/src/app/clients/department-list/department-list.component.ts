import { ClientDepartment } from './../../Model/client-department';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute, Router, InitialNavigation, NavigationStart, NavigationExtras } from '@angular/router';
import { ClientService } from 'src/app/shared/client.service';
import { NotificationService } from 'src/app/shared/notification.service';
import { MatTableDataSource } from '@angular/material/table';
import { filter } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/_helpers/authentication.service';

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.css']
})
export class DepartmentListComponent implements OnInit {
  private clientId: number;
  public displayedColumns: string[] = [
    'departmentName',
    'isActive',
    'email',
    'contactNo',
    'contactPerson',
    'savedBy',
    'savedOn',
    'lastModifiedBy',
    'lastModifiedOn',
    'lastModifiedIp',
    'action'
  ];
  public clientName: any;
  public dataSource: MatTableDataSource<ClientDepartment>;
  public resultsLength = 0;
  public isLoadingResults = true;
  public isRateLimitReached = false;
  public isAuthorized = false;
  public isBlocked = false;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private clientService: ClientService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private authService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.isAuthorized = (this.authService.role === 'ROLE_ADMIN') ? true : false;
    if (this.authService.role === 'ROLE_CLIENT') {
      this.isBlocked = true;
      this.loadDeptListForClient(this.authService.userId);
    } else {
      this.activatedRoute.queryParams.subscribe(params => {
        let value = JSON.parse(params["data"]);
        this.clientId = value.id;
        this.clientName = value.name;
        this.loadDeptList(this.clientId);
      });
    }
  }
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  loadDeptList(cid: number): void {
    this.isLoadingResults = true;
    this.clientService.getDepartmentsByClientId(cid).subscribe(response => {
      this.isLoadingResults = false;
      this.dataSource = new MatTableDataSource(response);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.resultsLength = this.dataSource.data.length;
    }, error => {
      this.isLoadingResults = false;
      this.isRateLimitReached = true;
    })
  }

  loadDeptListForClient(userId: string): void {
    this.isLoadingResults = true;
    this.clientService.getDepartmentsByUserId(userId).subscribe(response => {
      this.isLoadingResults = false;
      this.dataSource = new MatTableDataSource(response);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.resultsLength = this.dataSource.data.length;
    }, error => {
      this.isLoadingResults = false;
      this.isRateLimitReached = true;
    })
  }

  onCreate(): void {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        data: JSON.stringify({ type: '%DC4%' })
      }
    };
    this.router.navigate(['client/' + this.clientId + '/dept/new'], navigationExtras);
  }

  onEdit(row: any): void {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        data: JSON.stringify({
          type: '%DE3%',
          cid: this.clientId,
          data: row
        })
      }
    };
    this.router.navigate(['client/dept/edit'], navigationExtras);
  }

  onCreateAmc(row: any): void {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        data: JSON.stringify({
          cid: this.clientId,
          cname: this.clientName,
          did: row.deptId,
          dname: row.departmentName,
          type: "%c1%"
        })
      }
    };
    this.router.navigate(['/amcMaster/new'], navigationExtras);
  }

  onSelectAmc(row: any): void {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "data": JSON.stringify({
          cid: this.clientId,
          cname: this.clientName,
          did: row.deptId,
          dname: row.departmentName
        })
      }
    };
    this.router.navigate([`/clients/depts/${row.deptId}/amc-list`], navigationExtras);
  }

}
