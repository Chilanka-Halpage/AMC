import { AuthenticationService } from './../_helpers/authentication.service';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { InvoiceService } from './../invoice.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { NotificationService } from '../shared/notification.service';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.scss']
})
export class InvoiceListComponent implements OnInit {

  error: any;
  clientId: number

  public isAuthorized: boolean;
  private deptName: String;
  private deptId: number;
  private amc_no: number;
  private serial: String
  public isLoadingResults = true;
  public isRateLimitReached = false;
  public errorMessage = "Unknown Error"

  invoices: MatTableDataSource<any>;

  constructor(private invoiceService: InvoiceService,
              private router: Router,
              private _authentication: AuthenticationService,
              private notificationService: NotificationService,
              private route: ActivatedRoute) { }

  displayedColumns: string[] = ['pi_no', 'pi_date', 'exchage_rate', 'total_tax', 'total_amount', 'total_amount_lkr','Saved By','remark', 'Action'];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    
    this.isAuthorized = (this._authentication.role === 'ROLE_ADMIN') ? true : false;
    this.route.queryParams.subscribe(params => {
      let value = JSON.parse(params["data"]);
      this.amc_no = value.amc;
      this.serial = value.serial;
    });
    this.getInvoice();
    this.isAuthorized = (this._authentication.role === 'ROLE_ADMIN') ? true : false;
    this.route.queryParams.subscribe(params => {
      let value = JSON.parse(params["data"]);
      this.deptName = value.name
      this.deptId = value.id;
    });   
}

  getInvoice() {
    this.invoiceService.getinvoicebyAmcNo(this.amc_no).subscribe(data => {
      this.invoices = new MatTableDataSource(data);
      this.invoices.sort = this.sort;
      this.invoices.paginator = this.paginator;
      this.isLoadingResults = false;
      this.isRateLimitReached = false;
      }, error => {
        this.isLoadingResults = false;
        this.isRateLimitReached = true;
        this.errorMessage = (error.status === 0 || error.status === 404 || error.status === 403 || error.status === 401) ? error.error : 'Error in loading data';
      })
  }

  createinvoice(): void {
    this.router.navigate(['/client-list']);
  }

  applyFilter(filterValue: string) {
    this.invoices.filter = filterValue.trim().toLowerCase();
  }

  deleteinvoice(pi_no: number) {
    this.invoiceService.deleteinvoice(pi_no).subscribe(data => {
      this.notificationService.showNoitfication('Successfully delete', 'OK', 'success', () => {  this.getInvoice();  });
       
    },
  error =>  { let message = (error.status === 0 || error.status === 400  || error.status === 403 || error.status === 401) ? error.error : 'Cannot proceed the request. please try again'
  this.notificationService.showNoitfication(message, 'OK', 'error', null); }
);
    
  }

  editinvoice(pi_no: number) {
    this.router.navigate(['edit-Invoice', pi_no]);
  }

  gotoreceipt(pi_no: number){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "data": JSON.stringify({
          "id": this.deptId, 
          "amcno": this.amc_no,
          "dname": this.deptName,
          "serial": this.serial
        })
      }
    };
    this.router.navigate(['createReceipt', pi_no],navigationExtras);
  }
}
