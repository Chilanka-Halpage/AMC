import { AuthenticationService } from './../_helpers/authentication.service';
import { Router } from '@angular/router';
import { InvoiceService } from './../invoice.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.scss']
})
export class InvoiceListComponent implements OnInit {

  error: any;

  public isAuthorized: boolean;

  public isLoadingResults = true;
  public isRateLimitReached = false;
  public errorMessage = "Unknown Error"

  invoices: MatTableDataSource<any>;

  constructor(private invoiceService: InvoiceService,
    private router: Router,
    private _authentication: AuthenticationService) { }

  displayedColumns: string[] = ['piNo', 'piDate', 'exchageRate', 'totalTax', 'totalAmt', 'totalAmtLkr', 'remark', 'Action', 'update'];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this.getInvoice();
    this.isAuthorized = (this._authentication.role === 'ROLE_ADMIN') ? true : false;
  }

  getInvoice() {
    this.invoiceService.getInvoiceList().subscribe(data => {
      this.invoices = new MatTableDataSource(data);
      this.invoices.sort = this.sort;
      this.invoices.paginator = this.paginator;
      this.isLoadingResults = false;
    },
      error => console.log(error));
  }

  createinvoice(): void {
    this.router.navigate(['createincoice']);
  }

  applyFilter(filterValue: string) {
    this.invoices.filter = filterValue.trim().toLowerCase();
  }

  deleteinvoice(pi_no: number) {
    this.invoiceService.deleteinvoice(pi_no).subscribe(data => {
      console.log(data);
      this.getInvoice();
    })
  }

  editinvoice(pi_no: number) {
    this.router.navigate(['edit-Invoice', pi_no]);
  }
}
