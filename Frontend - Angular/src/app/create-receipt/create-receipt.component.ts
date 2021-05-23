import { Invoice } from './../invoice';
import { AmcMaster } from './../Model/amc-master.model';
import { Category } from './../Model/category';
import { PaymentService } from './../payment.service';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, ValidationErrors, Validators, FormGroup } from '@angular/forms';
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
  addReceiptForm: FormGroup
 
  private deptId: number;
  private amc_no: String;
  private deptname:String
  serial:String
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

  ngOnInit(): void { 
    this.pi_no = this.route.snapshot.params['pi_no'];
    this.route.queryParams.subscribe(params => {
      let value = JSON.parse(params["data"]);
      this.deptId = value.id;
      this.amc_no = value.amcno;
      this.deptname = value.dname;
      this.serial = value.serial
    });
    this.details()
    this.createform()
    this.checkStatus()
    this.calculate()
  }

  details(){
    this.paymentService.getAMcSerialdetails(this.serial).subscribe(data=>{
      this.addReceiptForm.patchValue({ 
        currency:{currencyId:data.currency_id},    
        currencyName:data.currency_name,
        category:{ categoryId:data.category_id },
        categoryName:data.category_name
       })
       console.log(data)
       },
    error => console.log(error));
    console.log(this.deptname)
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
    this.paymentService.calculatebalance(this.addReceiptForm) 
  }

  createform(){
    this.addReceiptForm = this.fb.group({
      recNo: ['', [Validators.required],[this.existReceiptValidator()], blur],
      recDate: ['',[Validators.required]],
      cancel: false,
      cancelReason: [''],
      exchageRate: ['',[Validators.required, Validators.pattern(/^[\d]{1,3}(\.[\d]{1,2})?$/)]],
      description: ['', [Validators.required]],
      payMode: ['',[Validators.required]],
      total: ['',[Validators.required]],
      balance: ['',[Validators.required]],
      totalLkr: ['',[Validators.required]],
      balanceLkr: ['',[Validators.required]],
      savedIp: [''],
      canceledBy: [''],
      canceledOn: [''],
      currencyName:['']  ,
      categoryName:[''],
      amcMaster: this.fb.group({
        amcNo: [this.amc_no]
      }),
      currency: this.fb.group({
        currencyId: ['']
      }),
      clientDepartment: this.fb.group({
        deptId: [this.deptId],
        deptName:[{ value: this.deptname, disabled: true }] 
      }),
      category: this.fb.group({
        categoryId: ['']
      }),
      invoice: this.fb.group({
        piNo: [this.pi_no]
      })
    })
  }
}
