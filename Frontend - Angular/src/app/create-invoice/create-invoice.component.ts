import { element } from 'protractor';
import { InvoiceService } from './../invoice.service';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { delay } from 'rxjs/internal/operators/delay';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { map } from 'rxjs/internal/operators/map';
import { NotificationService } from '../shared/notification.service';
import { PaymentService } from '../payment.service';

@Component({
  selector: 'app-create-invoice',
  templateUrl: './create-invoice.component.html',
  styleUrls: ['./create-invoice.component.scss']
})
export class CreateInvoiceComponent implements OnInit {

  piNo: number;
  showme:boolean=false;

  frequencyList = [];
  taxList = [];

  public isLoadingResults = true;
  public isRateLimitReached = false;
  public errorMessage = "Unknown Error"
  private deptId: number;
  private amc_no: String;
  
  private invoiceForm$: Observable<any>;
  public isDesabled = false;
  public type: any;
  public invoiceSavingProgress = false;

  constructor(
    private fb: FormBuilder,
    private invoiceService: InvoiceService,
    private router: Router,
    private route: ActivatedRoute,
    private notificationService: NotificationService,
    private paymentService: PaymentService,
  ) { }

  addinvoiceForm = this.fb.group({
    piNo:['',[Validators.required],[this.existInvoiceValidator()], blur],
    piDate:['',[Validators.required]],
    exchageRate:['',[Validators.required]],
    totalTax:[''],
    totalAmt:['',[Validators.required]],
    totalAmtLkr:['',[Validators.required]],
    remark:['',[Validators.required]],
    taxApplicable:[''],
    totalpayble:['',[Validators.required]],
    totalpayblelkr:['',[Validators.required]],
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
      }),
      tax:this.fb.group({
        taxId:[''],
        taxRate:['']
      })
  })

  ngOnInit(): void {
    this.loadSelectionData()
    this.checkStatus()
    this.calculate();
    this.amc_no = this.route.snapshot.params['amc_no'];
    this.route.queryParams.subscribe(params => {
      let value = JSON.parse(params["data"]);
      this.deptId = value.id;
      this.addinvoiceForm.patchValue({ 
        amcMaster:{ amcNo:this.amc_no },
        clientDepartment:{deptId:this.deptId}
       })
    });
    this.paymentService.getAMcSerialdetails(this.amc_no).subscribe(data=>{
      this.addinvoiceForm.patchValue({ 
        currency:{ currencyId:data.currency_id},
        category:{ categoryId:data.category_id}
       })
       },
    error => console.log(error));
  }

  onSubmit(){
    console.log(this.addinvoiceForm.value);
    this.saveInvoice(); 
  }

  Showtoggle(){
    this.showme=!this.showme
  }

  saveInvoice(){ 
    if(this.addinvoiceForm.valid){
    this.invoiceService.createInvoice(this.addinvoiceForm.value).subscribe(data =>{
      this.invoiceSavingProgress = true; 
       this.notificationService.showNoitfication('Successfully done', 'OK', 'success', () => { this.router.navigate(['/invoicelist']) });
       
    },
      error =>  { let message = (error.status === 501) ? error.error.message : 'Cannot proceed the request. Try again'
                  this.notificationService.showNoitfication(message, 'OK', 'error', null); }
      );
    }
  }

  private loadSelectionData() {
    let frequencyListLoad = false;
    let taxListLoad = false;
    this.invoiceService.getFrequency().subscribe(response => {
      this.frequencyList = response;
      this.isLoadingResults = ((frequencyListLoad = true) && taxListLoad ) ? false : true;
    }, error => {
      this.isLoadingResults = false;
      this.isRateLimitReached = true;
      this.errorMessage = error;
    });
    this.invoiceService.findactiveTax().subscribe(response => {
      this.taxList = response;
      this.isLoadingResults = ((taxListLoad = true) && frequencyListLoad ) ? false : true;
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

  calculate(): void{
    this.invoiceService.calculateAmountValueByExRate(this.addinvoiceForm),
    this.invoiceService.calculateTaxValueByTaxRate(this.addinvoiceForm) ,
    this.invoiceService.totalpayble(this.addinvoiceForm) 
  }

  findtaxRate(taxId){
  this.invoiceService.getTaxRate(taxId).subscribe(data=>{
    this.addinvoiceForm.patchValue({ 
      tax:{taxRate:data}
     })
     },
  error => console.log(error));
     }
  
}

 
