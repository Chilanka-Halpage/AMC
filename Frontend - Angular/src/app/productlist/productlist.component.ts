import { ProductserviceService } from './../productservice.service';
import { Component, OnInit,ViewChild } from '@angular/core';
import { product } from '../product';

import { merge, Observable, of as observableOf } from 'rxjs';
import { of } from 'rxjs/internal/observable/of';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { delay } from 'rxjs/internal/operators/delay';
import { map } from 'rxjs/internal/operators/map';
import { ActivatedRoute,Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import {FormGroup,FormBuilder, Validators, AsyncValidatorFn, AbstractControl, ValidationErrors} from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { NotificationService } from 'src/app/shared/notification.service';
import { AuthenticationService } from '../_helpers/authentication.service';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.css']
})
export class ProductlistComponent implements OnInit {
  public isDesabled= false;
  errorMessage: any;
  
  constructor(
    private _service: ProductserviceService,
    private router: Router,
    private formBuilder:FormBuilder,
    private route: ActivatedRoute,
    private notificationService: NotificationService,
    private authService: AuthenticationService
    ) { }
    //public products: Observable<product[]>;
   
    private productForm$: Observable<any>;
    public type: any;
    public productAddForm: FormGroup;
    public submitted = false;
    public edit=false;
    public filterValue: string;
    listData: MatTableDataSource<any>;
    public searchKey:string;
    public dataSavingProgress = false;
    public resultsLength = 0;
    public isLoadingResults = true;
    public isRateLimitReached = false;
    public popoverTitle = 'Delete Row';
    public popoverMessage = 'Are you sure to want to Delete ?';
    public confirmClicked = false;
    public cancelClicked = false;
    productId:number;
    public isAuthorized: boolean;

  displayedColumns: string[] = [
    'id',
    'productName',
    'active', 
    'savedBy', 
    'savedOn', 
    'savedIp',
    'lastModifiedBy',
    'lastModifiedOn',
    'action'
  ];

  @ViewChild(MatSort) sort:MatSort;
  @ViewChild(MatPaginator) paginator:MatPaginator;

  ngOnInit() {
    
    this.isAuthorized = (this.authService.role === 'ROLE_ADMIN') ? true : false;
    
    this.productAddForm=this.formBuilder.group(
      {
        productName:['',[Validators.required],[this.existTaxValidator()], blur],
        active:['',[Validators.required]]
      }
    )
    this.checkStatus();

    this._service.getProductList().subscribe(
      list => {
       this.listData = new MatTableDataSource(list);
       this.listData.sort= this.sort;
       this.listData.paginator=this.paginator;
       this.isLoadingResults = false;
      }),
      catchError( error => {
        this.errorMessage = (error.status === 0 || error.status === 404 || error.status === 403 || error.status === 401) ? error.error : 'Error in loading data';
        this.isLoadingResults = false;
        // set flag to identify that errors ocuured
        this.isRateLimitReached = true;
        return observableOf([]);
      })
  }

  editProductList(row) {
    this.edit=true;
    this.productId=row.productId;
    console.log(row);
    this.productAddForm.patchValue({
    productName: row.productName,
    active: row.active
   }); 
   }

  deleteProductList(id: number) {
    this._service.deleteProduct(id)
      .subscribe(
        data => {
          this.notificationService.showNoitfication('Successfully done', 'OK', 'success', () => { window.location.reload()});  
        },
        error => {
          console.log(error);
          this.notificationService.showNoitfication('Cannot delete a parent row: a foreign key constraint fails !', 'OK', 'error', null);
        }).add(()=>this.dataSavingProgress=false);
  }
  save() {
    this.dataSavingProgress = true;
    this._service
    .createProduct(this.productAddForm.value).subscribe(data => {
      this.notificationService.showNoitfication('Successfully done', 'OK', 'success', () => { window.location.reload()});
      this.dataSavingProgress = false;
      console.log(data) 
    }, 
    (error) => {
      let message = (error.status === 0 || error.status === 403 || error.status === 401) ? error.error : 'Cannot proceed the request. Try again'
      this.notificationService.showNoitfication(message, 'OK', 'error', null);
    }).add(()=>this.dataSavingProgress=false)
  }

  onSubmit() {
    console.log(this.productAddForm);
    this.submitted = true;
    this.save();    
  }
  onEdit(){
    this.dataSavingProgress = true;
    this._service.updateProduct(this.productId,this. productAddForm.value).subscribe(
      (result)=>{
        this.notificationService.showNoitfication('Successfully done', 'OK', 'success', () => { window.location.reload()});
        this.dataSavingProgress = false;
        console.log(result);
      }, (error) => {
        const errMessage = (error.status === 0 || error.status === 400 || error.status === 403 || error.status === 401) ? error.error : 'Error in loading data';
        this.notificationService.showNoitfication(errMessage, 'OK', 'error', null);
      }).add(()=>this.dataSavingProgress=false)   
  }
  

  onSearchClear(){
    this.searchKey="";
    this.applyFilter();
  }

  applyFilter(){
    this.listData.filter=this.searchKey.trim().toLowerCase();
  }

  private checkStatus(): void {
    this.productForm$ = this.productAddForm.statusChanges;
    this.productForm$.subscribe(response => {
      if (response === 'PENDING') {
        setTimeout(() => {
          this.productAddForm.updateValueAndValidity();
        }, 2000);
      }
    })
  }

  private existTaxValidator():AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (!this.type) {
        return of(control.value).pipe(
          delay(500),
          switchMap((productName: string) => this._service.doesProductExists(productName)),
          map(response => {
           this.isDesabled=response;
            return response ? { productNameExists: true } : null
          })
        )
      }
      return of(null);
    };
  }
}
