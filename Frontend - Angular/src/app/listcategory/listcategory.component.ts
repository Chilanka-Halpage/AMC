import { Component, OnInit, ViewChild } from '@angular/core';
import { NotificationService } from 'src/app/shared/notification.service';
import { CategoryserviceService } from '../categoryservice.service';
import { MatTableDataSource } from '@angular/material/table';
import { FormGroup, FormBuilder, Validators, AsyncValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { AuthenticationService } from '../_helpers/authentication.service';
import { Observable, of as observableOf } from 'rxjs';
import { of } from 'rxjs/internal/observable/of';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { delay } from 'rxjs/internal/operators/delay';
import { map } from 'rxjs/internal/operators/map';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-listcategory',
  templateUrl: './listcategory.component.html',
  styleUrls: ['./listcategory.component.css']
})
export class ListcategoryComponent implements OnInit {

  constructor(
    private _service: CategoryserviceService, 
    private notificationService: NotificationService, 
    private formBuilder: FormBuilder, 
    private authService: AuthenticationService) {}
    public resultsLength = 0;
    public isLoadingResults = true;
    public isRateLimitReached = false;
    public categoryAddForm: FormGroup;
    public submitted = false;
    public searchKey: string;
    public showMyMessage = false;
    public edit = false;
    public alert: boolean = false;
    public dataSavingProgress = false;
    public popoverTitle = 'Delete Row';
    public popoverMessage = 'Are you sure to want to Delete ?';
    public confirmClicked = false;
    public cancelClicked = false;
    listData: MatTableDataSource<any>;
    categoryId:number;
    public isAuthorized: boolean;
    public isDesabled= false;
    private categoryForm$: Observable<any>;
    public type: any;
    public errorMessage: "Unknown Error";
    

  displayedColumns: string[] = [
    'id', 
    'categoryName', 
    'active', 
    'savedBy', 
    'savedOn', 
    'savedIp', 
    'lastModifiedBy', 
    'lastModifiedOn', 
    'action'];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.isAuthorized = (this.authService.role === 'ROLE_ADMIN') ? true : false;
 
    this.categoryAddForm = this.formBuilder.group(
      {
        categoryName: ['',[Validators.required],[this.existTaxValidator()], blur],
        active: ['', [Validators.required]]
      }
    )
    this.checkStatus();
    this._service.getCategoryList().subscribe(
      list => {
        this.listData = new MatTableDataSource(list);
        this.listData.sort = this.sort;
        this.listData.paginator = this.paginator;
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
 
  editCategoryListe(row) {
   this.categoryId=row.categoryId;
    this.edit = true;

    this.categoryAddForm.patchValue({
      categoryName: row.categoryName,
      active: row.active
    });

  }
  deleteCategoryList(id: number) {
    this._service.deleteCategory(id).subscribe(
      data => {
        this.notificationService.showNoitfication('Successfully done', 'OK', 'success', () => {window.location.reload()}); 
      },
      (error) => {
        let message = (error.status === 0 || error.status === 403 || error.status === 401 || error.status === 501 || error.status == 400) ? error.error : 'Cannot proceed the request. Try again'
        this.notificationService.showNoitfication(message, 'OK', 'error', null);
      }).add(()=>this.dataSavingProgress=false);  
  }

  save() {
    if(this.categoryAddForm.valid){
    this.dataSavingProgress = true;
    this._service
      .createCategory(this.categoryAddForm.value).subscribe(data => {
        this.notificationService.showNoitfication('Successfully done', 'OK', 'success', () => { window.location.reload()});
        this.dataSavingProgress = false;
      },
      (error) => {
        let message = (error.status === 0 || error.status === 403 || error.status === 401 || error.status === 501 || error.status === 400) ? error.error : 'Cannot proceed the request. Try again'
        this.notificationService.showNoitfication(message, 'OK', 'error', null);
      }).add(()=>this.dataSavingProgress=false)}
      else{
        this.notificationService.showNoitfication('invalid input', 'OK', 'error', () => {null});
      } 
  }

  onSubmit() {
    this.submitted = true;
    this.save();
  }

  onEdit() {
    
    this.dataSavingProgress = true;
    this._service.updateCategory(this.categoryId, this.categoryAddForm.value).subscribe(
      (result) => {
        this.notificationService.showNoitfication('Successfully done', 'OK', 'success', () => {window.location.reload()});
        this.dataSavingProgress = false;
      }, (error) => {
        const errMessage = (error.status === 0 || error.status === 400 || error.status === 403 || error.status === 401) ? error.error : 'Error in loading data';
        this.notificationService.showNoitfication(errMessage, 'OK', 'error', null);
      }).add(()=>this.dataSavingProgress=false)
     
    }

  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }

  private checkStatus(): void {
    this.categoryForm$ = this.categoryAddForm.statusChanges;
    this.categoryForm$.subscribe(response => {
      if (response === 'PENDING') {
        setTimeout(() => {
          this.categoryAddForm.updateValueAndValidity();
        }, 2000);
      }
    })
  }
  
  private existTaxValidator():AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (!this.type) {
        return of(control.value).pipe(
          delay(500),
          switchMap((categoryName: string) => this._service.doesCategoryExists(categoryName)),
          map(response => {
           this.isDesabled=response;
            return response ? { categoryNameExists: true } : null
          })
        )
      }
      return of(null);
    };
  }
}
