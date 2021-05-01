import { MatSort } from '@angular/material/sort';
import { CurrencyService } from './../currency.service';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, ValidationErrors, Validators } from '@angular/forms';
import { ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { AuthenticationService } from '../_helpers/authentication.service';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { delay } from 'rxjs/internal/operators/delay';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { map } from 'rxjs/internal/operators/map';

@Component({
  selector: 'app-currency-list',
  templateUrl: './currency-list.component.html',
  styleUrls: ['./currency-list.component.scss']
})
export class CurrencyListComponent implements OnInit {

  currencies: MatTableDataSource<any>;
  currencyId: number
  public isAuthorized: boolean;
  public isLoadingResults = true;
  public isRateLimitReached = false;
  public errorMessage = "Unknown Error"
  
  private currencyForm$: Observable<any>;
  public isDesabled = false;
  public type: any;
  public TaxSavingProgress = false;


  addcurrencyForm = this.fb.group({
    currencyName: ['', [Validators.required],[this.existTaxValidator()], blur],
    currencyId: [''],
    savedOn: [''],
    savedIp: [''],
    active: [''],
    savedBy: ['']
  })

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private currencyService: CurrencyService,
              private fb: FormBuilder,
              public _authentication: AuthenticationService,) { }

  displayedColumns:string[] = ['currencyId','currencyName','savedBy','Active','savedOn','savedIp','Action'];
 
  ngOnInit(): void {
    this.getCurrency();
    this.isAuthorized = (this._authentication.role === 'ROLE_ADMIN') ? true : false;
  }
  getCurrency(){
    this.currencyService.getCurrencyList().subscribe(data =>{
      this.currencies = new MatTableDataSource(data);  
      this.currencies.sort = this.sort;  
      this.currencies.paginator = this.paginator;
      this.isLoadingResults = false;
    });
  }
  deleteCurrency(currencyId: number){
    console.log(currencyId);
  this.currencyService.deleteCurrency(currencyId).subscribe(data =>{
    console.log(data);
    this.getCurrency();
  })
}
saveCurrency(){
  this.currencyService.createCurrency(this.addcurrencyForm.value).subscribe(data =>{
  this.getCurrency();  
 },
    error => console.log(error));    
}

onSubmit(){
  console.log(this.addcurrencyForm.value);
  this.saveCurrency();
}

applyFilter(filterValue: string) {
  this.currencies.filter = filterValue.trim().toLowerCase();
}
private existTaxValidator():AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    if (!this.type) {
      return of(control.value).pipe(
        delay(500),
        switchMap((currencyName: string) => this.currencyService.doesCurrencyExists(currencyName)),
        map(response => {
          this.isDesabled = response;
          return response ? { currencyNameExists: true } : null
        })
      )
    }
    return of(null);
  };
}

private checkStatus(): void {
  this.currencyForm$ = this.addcurrencyForm.statusChanges;
  this.currencyForm$.subscribe(response => {
    if (response === 'PENDING') {
      setTimeout(() => {
        console.log("gg");
        this.addcurrencyForm.updateValueAndValidity();
      }, 2000);
    }
  })
}

}

