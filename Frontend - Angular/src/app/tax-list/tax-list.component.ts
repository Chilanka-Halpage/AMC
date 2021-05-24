import { AuthenticationService } from './../_helpers/authentication.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit ,ViewChild} from '@angular/core';
import { TaxService } from '../tax.service';
import { NotificationService } from '../shared/notification.service';

@Component({
  selector: 'app-tax-list',
  templateUrl: './tax-list.component.html',
  styleUrls: ['./tax-list.component.scss']
})
export class TaxListComponent implements OnInit {

  public isAuthorized;
  
  public isLoadingResults = true;
  public isRateLimitReached = false;
  public errorMessage = "Unknown Error"

  taxes: MatTableDataSource<any>;
 
  constructor(private taxService: TaxService , 
              private Router: Router,
              private notificationService: NotificationService,
              private _authentication: AuthenticationService) { }

  displayedColumns:string[] = ['taxName','shortName','taxRate','active','savedOn','savedBy','savedIp','lastModifiedBy','Action'];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this.getTax();
    this.isAuthorized = (this._authentication.role === 'ROLE_ADMIN') ? true : false;
  }

  getTax(){
    this.taxService.getTaxList().subscribe(data =>{
    this.taxes = new MatTableDataSource(data); 
    this.taxes.sort = this.sort;
    this.taxes.paginator = this.paginator;
    this.isLoadingResults = false;
    this.isRateLimitReached = false;
    }, error => {
      this.isLoadingResults = false;
      this.isRateLimitReached = true;
      this.errorMessage = (error.status === 0 || error.status === 404 || error.status === 403 || error.status === 401) ? error.error : 'Error in loading data';
    })
  }
  
  deleteTax(taxId: number){
      console.log(taxId);
    this.taxService.deleteTax(taxId).subscribe(data =>{
       this.notificationService.showNoitfication('Successfully delete', 'OK', 'success', () => {  this.getTax();  });
       
    },
      error =>  { let message = (error.status === 0 || error.status === 400  || error.status === 403 || error.status === 401) ? error.error : 'Cannot proceed the request. please try again'
                  this.notificationService.showNoitfication(message, 'OK', 'error', null); }
      );
  }

  updatetax(taxId: number){
    this.Router.navigate(['updatetax',taxId]);
  } 

  gotocreatetax(): void{
    this.Router.navigate(['createtax']);
  }

  applyFilter(filterValue: string) {
    this.taxes.filter = filterValue.trim().toLowerCase();
  }
}
