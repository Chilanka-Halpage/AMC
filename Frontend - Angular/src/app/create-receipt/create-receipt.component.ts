import { Invoice } from './../invoice';
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
  ReceiptSavingProgress = false
 
  private deptId: number;
  private amc_no: String;
  private deptName:String
  pi_no: number; 
  private receiptForm$: Observable<any>;
  public isDesabled = false;
  public type: any;

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
    cancelReason: [''],
    exchageRate: ['',[Validators.required]],
    description: ['', [Validators.required]],
    payMode: ['',[Validators.required]],
    total: ['',[Validators.required]],
    balance: ['',[Validators.required]],
    totalLkr: ['',[Validators.required]],
    balanceLkr: ['',[Validators.required]],
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
    this.calculate()
    this.pi_no = this.route.snapshot.params['pi_no'];
    this.route.queryParams.subscribe(params => {
      let value = JSON.parse(params["data"]);
      this.deptId = value.id;
      this.amc_no = value.amcno;
      this.deptName = value.dname
      this.addReceiptForm.patchValue({ 
        amcMaster:{ amcNo:this.amc_no },
        clientDepartment:{deptId:this.deptId},
        invoice:{piNo:this.pi_no}
       })
    });
    this.paymentService.getAMcSerialdetails(this.amc_no).subscribe(data=>{
      this.addReceiptForm.patchValue({ 
        currency:{ currencyId:data.currency_id},
        category:{ categoryId:data.category_id}
       })
       console.log(data)
       },
    error => console.log(error));
  }

  saveReceipt() {
    if(this.addReceiptForm.valid){
    this.paymentService.createReceipt(this.addReceiptForm.value).subscribe(data => {
      this.ReceiptSavingProgress = true
      this.notificationService.showNoitfication('Successfully done', 'OK', 'success', () => {this.goTopaymentlist(); });  
    },
    error =>  { let message = (error.status === 501) ? error.error.message : 'Cannot proceed the request. Try again'
                this.notificationService.showNoitfication(message, 'OK', 'error', null); }
    );
  }else{
    this.ReceiptSavingProgress = false; 
  }
   
  }

  goTopaymentlist() {
    this.router.navigate(['/paymentHlist']);
  }

  onSubmit() {
    console.log(this.addReceiptForm.value);
    this.saveReceipt();
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
  
  calculate(): void{
    this.paymentService.calculateAmcValueByExRate(this.addReceiptForm)
  }
  
}
