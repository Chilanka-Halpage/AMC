import { AmcMaster } from './../Model/amc-master.model';
import { Category } from './../Model/category';
import { PaymentService } from './../payment.service';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, ValidationErrors, Validators } from '@angular/forms';
import { Router, CanActivate, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { delay } from 'rxjs/internal/operators/delay';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { map } from 'rxjs/internal/operators/map';
import { CompileShallowModuleMetadata } from '@angular/compiler';
import { throwMatDialogContentAlreadyAttachedError } from '@angular/material/dialog';
import { NotificationService } from '../shared/notification.service';

@Component({
  selector: 'app-create-receipt',
  templateUrl: './create-receipt.component.html',
  styleUrls: ['./create-receipt.component.scss']
})
export class CreateReceiptComponent implements OnInit {
  
  invoiceList = [];
  categoryList = [];
  currencyList = [];
  public isLoadingResults = true;
  public isRateLimitReached = false;
  public errorMessage = "Unknown Error"
  receiptProgress = false
 
  private deptId: number;
  private amc_no: number;
  pi_no: number; 
  private receiptForm$: Observable<any>;
  public isDesabled = false;
  public type: any;
  public ReceiptSavingProgress = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private paymentService: PaymentService,
    private route: ActivatedRoute,
    private notificationService: NotificationService,
  ) { }

  addReceiptForm = this.fb.group({
    recNo: ['', [Validators.required],[this.existReceiptValidator()], blur],
    recDate: ['',[Validators.required]],
    cancel: false,
    cancelReason: ['', [Validators.required]],
    exchageRate: [''],
    description: ['', [Validators.required]],
    payMode: ['',[Validators.required]],
    total: ['',[Validators.required]],
    balance: [''],
    totalLkr: [''],
    balanceLkr: [''],
    savedIp: [''],
    canceledBy: [''],
    canceledOn: [''],
    amcMaster: this.fb.group({
      amcNo: ['']
    }),
    currency: this.fb.group({
      currencyId: ['']
    }),
    clientDepartment: this.fb.group({
      deptId: ['']
    }),
    category: this.fb.group({
      categoryId: ['']
    }),
    invoice: this.fb.group({
      piNo: ['']
    })
  })

  ngOnInit(): void { 
    this.checkStatus()
    this.route.queryParams.subscribe(params => {
      let value = JSON.parse(params["data"]);
      this.deptId = value.id;
      this.amc_no = value.amcno;
      this.addReceiptForm.patchValue({ 
        invoice:{ piNo:this.pi_no},
        amcMaster:{ amcNo:this.amc_no },
        clientDepartment:{deptId:this.deptId}
       })
    });
    console.log(this.pi_no)
  }

  saveReceipt() {
    this.paymentService.createReceipt(this.addReceiptForm.value).subscribe(data => {
      this.receiptProgress = true
      this.notificationService.showNoitfication('Successfully done', 'OK', 'success', () => {this.goTopaymentlist(); });  
    },
    error =>  { let message = (error.status === 501) ? error.error.message : 'Cannot proceed the request. Try again'
                this.notificationService.showNoitfication(message, 'OK', 'error', null); }
    );
  }

  goTopaymentlist() {
    this.router.navigate(['/paymentHlist']);
  }

  onSubmit() {
    console.log(this.addReceiptForm.value);
    this.saveReceipt();
  }
  private loadSelectionData() {
    let currencListLoad = false,categoryListLoad = false, invoiceListLoad = false;
    this.paymentService.getactiveCurrency().subscribe(response => {
      this.currencyList = response;
      this.isLoadingResults = ((currencListLoad = true) &&  categoryListLoad && invoiceListLoad) ? false : true  ;
    }, error => {
      this.isLoadingResults = false;
      this.isRateLimitReached = true;
      this.errorMessage = error;
    });
    this.paymentService.getCategory().subscribe(response => {
      this.categoryList = response;
      this.isLoadingResults = ((categoryListLoad = true) && currencListLoad) ? false : true;
    }, error => {
      this.isLoadingResults = false;
      this.isRateLimitReached = true;
      this.errorMessage = error;
    });
    this.paymentService.getActiveInvoices().subscribe(response => {
      this.invoiceList = response;
      this.isLoadingResults = ((invoiceListLoad = true) && currencListLoad) ? false : true;
    }, error => {
      this.isLoadingResults = false;
      this.isRateLimitReached = true;
      this.errorMessage = error;
    });  
    console.log(this.pi_no)
  }

  private checkStatus(): void {
    this.receiptForm$ = this.addReceiptForm.statusChanges;
    this.receiptForm$.subscribe(response => {
      if (response === 'PENDING') {
        setTimeout(() => {
          console.log("gg");
          this.addReceiptForm.updateValueAndValidity();
        }, 2000);
      }
    })
  }
  private existReceiptValidator():AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (!this.type) {
        return of(control.value).pipe(
          delay(500),
          switchMap((recNo: string) => this.paymentService.doesReceiptExists(recNo)),
          map(response => {
            this.isDesabled = response;
            return response ? { receiptExists: true } : null
          })
        )
      }
      return of(null);
    };
  }
}
