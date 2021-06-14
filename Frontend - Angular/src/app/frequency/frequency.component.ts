import { FrequencyserviceService } from './../frequencyservice.service';
import { Component, OnInit,ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {FormGroup,FormBuilder, Validators, AsyncValidatorFn, AbstractControl, ValidationErrors} from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { NotificationService } from 'src/app/shared/notification.service';
import { AuthenticationService } from '../_helpers/authentication.service';
import { Observable, of as observableOf } from 'rxjs';
import { of } from 'rxjs/internal/observable/of';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { delay } from 'rxjs/internal/operators/delay';
import { map } from 'rxjs/internal/operators/map';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-frequency',
  templateUrl: './frequency.component.html',
  styleUrls: ['./frequency.component.css']
})
export class FrequencyComponent implements OnInit {

  constructor(
    private _service: FrequencyserviceService,
    private formBuilder:FormBuilder,
    private notificationService: NotificationService,
    private authService: AuthenticationService) { }

    public frequencyAddForm: FormGroup;
    public submitted = false;
    public searchKey:string;
    public edit=false;
    public dataSavingProgress = false;
    public resultsLength = 0;
    public isLoadingResults = true;
    public isRateLimitReached = false;
    public popoverTitle = 'Delete Row';
    public popoverMessage = 'Are you sure to want to Delete ?';
    public confirmClicked = false;
    public cancelClicked = false;
    listData: MatTableDataSource<any>;
    frequencyId:number;
    public isAuthorized: boolean;
    public isDesabled= false;
    private frequencyForm$: Observable<any>;
    public type: any;
    public errorMessage: "Unknown Error";

  displayedColumns: string[] = [
    'id', 
    'frequency', 
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

  ngOnInit(){
    this.isAuthorized = (this.authService.role === 'ROLE_ADMIN') ? true : false;
    this.frequencyAddForm=this.formBuilder.group(
      {
        frequency:['',[Validators.required,Validators.pattern(/(^0?[1-9]$)|(^1[0-2]$)/)],[this.existTaxValidator()]],
        active:['',[Validators.required]]
      }
    )
    this.checkStatus();
 
this._service.getFrequencyList().subscribe(
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


editFrequencyList(row) {
this.edit=true;
this.frequencyId=row.frequencyId;
this.frequencyAddForm.patchValue({
frequency: row.frequency,
active: row.active
}); 
}

deleteFrequencyList(id: number) {
this._service.deleteFrequency(id).subscribe(
    data => {
      this.notificationService.showNoitfication('Successfully done', 'OK', 'success', () => { window.location.reload()}); 
    },
    (error) => {
      let message = (error.status === 0 || error.status === 403 || error.status === 401 || error.status === 501 || error.status == 400) ? error.error : 'Cannot proceed the request. Try again'
      this.notificationService.showNoitfication(message, 'OK', 'error', null);
    }).add(()=>this.dataSavingProgress=false);  
}

save() {
  if(this.frequencyAddForm.valid){
this.dataSavingProgress = true;
this._service
.createFrequency(this.frequencyAddForm.value).subscribe(data => {
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

onEdit(){
  
  this.dataSavingProgress = true;
  this._service.updateFrequency(this.frequencyId,this.frequencyAddForm.value).subscribe(
    (result)=>{
      this.notificationService.showNoitfication('Successfully done', 'OK', 'success', () => { window.location.reload()});
      this.dataSavingProgress = false;
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
  this.frequencyForm$ = this.frequencyAddForm.statusChanges;
  this.frequencyForm$.subscribe(response => {
    if (response === 'PENDING') {
      setTimeout(() => {
        this.frequencyAddForm.updateValueAndValidity();
      }, 2000);
    }
  })
}

private existTaxValidator():AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    if (!this.type) {
      return of(control.value).pipe(
        delay(500),
        switchMap((frequency: string) => this._service.doesFrequencyExists(frequency)),
        map(response => {
         this.isDesabled=response;
          return response ? { frequencyNameExists: true } : null
        })
      )
    }
    return of(null);
  };
}

}


