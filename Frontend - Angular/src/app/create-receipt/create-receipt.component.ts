import { Category } from './../Model/category';
import { PaymentService } from './../payment.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, CanActivate } from '@angular/router';

@Component({
  selector: 'app-create-receipt',
  templateUrl: './create-receipt.component.html',
  styleUrls: ['./create-receipt.component.scss']
})
export class CreateReceiptComponent implements OnInit {

  /*  payment: Payment = new Payment(); */
  showme: boolean = false;
  
  invoiceList = [];
  categoryList = [];
  currencyList = [];
  public isLoadingResults = true;
  public isRateLimitReached = false;
  public errorMessage = "Unknown Error"

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private paymentService: PaymentService
  ) { }

  addReceiptForm = this.fb.group({
    recNo: ['', [Validators.required]],
    recDate: [''],
    cancel: false,
    cancelReason: ['', [Validators.required]],
    exchageRate: [''],
    description: ['', [Validators.required]],
    payMode: [''],
    total: [''],
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
    this.loadSelectionData()
  }

  saveReceipt() {
    this.paymentService.createReceipt(this.addReceiptForm.value).subscribe(data => {
      console.log(data);
      this.goTopaymentlist();
    },
      error => console.log(error));
  }

  goTopaymentlist() {
    this.router.navigate(['/paymentHlist']);
  }

  onSubmit() {
    console.log(this.addReceiptForm.value);
    this.saveReceipt();
  }

  Showtoggle() {
    this.showme = !this.showme
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
  }

}
