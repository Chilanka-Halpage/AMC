import { InvoiceService } from './../invoice.service';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { delay } from 'rxjs/internal/operators/delay';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { map } from 'rxjs/internal/operators/map';
import { NotificationService } from '../shared/notification.service';

@Component({
  selector: 'app-create-invoice',
  templateUrl: './create-invoice.component.html',
  styleUrls: ['./create-invoice.component.scss']
})
export class CreateInvoiceComponent implements OnInit {

  piNo: number;
  showme:boolean=false;

  categoryList = [];
  currencyList = [];
  frequencyList = [];

  public isLoadingResults = true;
  public isRateLimitReached = false;
  public errorMessage = "Unknown Error"
  
  private invoiceForm$: Observable<any>;
  public isDesabled = false;
  public type: any;
  public invoiceSavingProgress = false;

  constructor(
    private fb: FormBuilder,
    private invoiceService: InvoiceService,
    private router: Router,
    private notificationService: NotificationService,
  ) { }

  addinvoiceForm = this.fb.group({
    piNo:['',[Validators.required],[this.existInvoiceValidator()], blur],
    piDate:[''],
    exchageRate:[''],
    totalTax:[''],
    totalAmt:[''],
    totalAmtLkr:[''],
    remark:[''],
    taxApplicable:[''],
    cancel:[''],
    cancelReason:[''],
    clientDepartment:this.fb.group({
      deptId:['']
      }),
      category:this.fb.group({
      categoryId:['']
      }),
      amcMaster:this.fb.group({
        amcNo:['']
      }),
      currency:this.fb.group({
        currencyId:['']
      }),
      frequency:this.fb.group({
        frequencyId:['']
      })
  })

  ngOnInit(): void {
    this.loadSelectionData()
    this.checkStatus()
  }

  onSubmit(){
    console.log(this.addinvoiceForm.value);
    this.saveInvoice(); 
  }

  Showtoggle(){
    this.showme=!this.showme
  }

  saveInvoice(){ 
    this.invoiceService.createInvoice(this.addinvoiceForm.value).subscribe(data =>{
      this.invoiceSavingProgress = true; 
       this.notificationService.showNoitfication('Successfully done', 'OK', 'success', () => { this.router.navigate(['/invoicelist']) });
       
    },
      error =>  { let message = (error.status === 501) ? error.error.message : 'Cannot proceed the request. Try again'
                  this.notificationService.showNoitfication(message, 'OK', 'error', null); }
      );
  }

  private loadSelectionData() {
    let currencyListLoad = false, categoryListLoad = false ,frequencyListLoad = false;
    this.invoiceService.getactiveCurrency().subscribe(response => {
      this.currencyList = response;
      this.isLoadingResults = ((currencyListLoad = true) && categoryListLoad && frequencyListLoad) ? false : true;
    }, error => {
      this.isLoadingResults = false;
      this.isRateLimitReached = true;
      this.errorMessage = error;
    });
    this.invoiceService.getCategory().subscribe(response => {
      this.categoryList = response;
      this.isLoadingResults = ((categoryListLoad = true) && currencyListLoad && frequencyListLoad) ? false : true;
    }, error => {
      this.isLoadingResults = false;
      this.isRateLimitReached = true;
      this.errorMessage = error;
    });
    this.invoiceService.getFrequency().subscribe(response => {
      this.frequencyList = response;
      console.log(response)
      this.isLoadingResults = ((frequencyListLoad = true) && currencyListLoad && categoryListLoad ) ? false : true;
    }, error => {
      this.isLoadingResults = false;
      this.isRateLimitReached = true;
      this.errorMessage = error;
    });
  }

  private checkStatus(): void {
    this.invoiceForm$ = this.addinvoiceForm.statusChanges;
    this.invoiceForm$.subscribe(response => {
      if (response === 'PENDING') {
        setTimeout(() => {
          console.log("gg");
          this.addinvoiceForm.updateValueAndValidity();
        }, 2000);
      }
    })
  }

  private existInvoiceValidator():AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (!this.type) {
        return of(control.value).pipe(
          delay(500),
          switchMap((piNo: string) => this.invoiceService.doesInvoiceExists(piNo)),
          map(response => {
            this.isDesabled = response;
            return response ? { invoiceExists: true } : null
          })
        )
      }
      return of(null);
    };
  }
}

 
