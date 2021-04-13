import { CurrencyService } from './../currency.service';
import { DuePaymentService } from './../due-payment.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-dueinvoice',
  templateUrl: './create-dueinvoice.component.html',
  styleUrls: ['./create-dueinvoice.component.scss']
})
export class CreateDueinvoiceComponent implements OnInit {

  constructor( private fb: FormBuilder,
               private router: Router,
               private duePaymentService: DuePaymentService,
               ) { }
  
  id: number;
  productList = [];
  currencyList = [];
  public isLoadingResults = true;
  public isRateLimitReached = false;
  public errorMessage = "Unknown Error"

    adddueinvoiceForm = this.fb.group({
    id:[''],
    dueDate: ['',[Validators.required]],
    invoiceAmt: ['',[Validators.required]],
    invoiceBalance: ['', [Validators.required]],
    savedOn: [''],
    savedIp: [''],
    active: [''],
    amcMaster:this.fb.group({
      amcNo:['', [Validators.required]]
    }),
    amcSerial:this.fb.group({
      amcSerialNo:['', [Validators.required]]
    }),
    product:this.fb.group({
      productId:['', [Validators.required]]
    }),
    currency:this.fb.group({
      currencyId:['', [Validators.required]]
    })
  })

  ngOnInit(): void {
    this.loadSelectionData(); 
  }

  createdueinvoice(){
    this.duePaymentService.createdueinvoice(this.adddueinvoiceForm.value).subscribe(data =>{
      console.log(data);
    this.goTodueinvoicelist();  
   },
      error => console.log(error));    
  }

  goTodueinvoicelist(){
    this.router.navigate(['/duepayment']);
  }

onSubmit(){
  console.log(this.adddueinvoiceForm.value);
  this.createdueinvoice();
}
private loadSelectionData() {
  let currencyListLoad = false, productListLoad = false;
  this.duePaymentService.getactiveCurrency().subscribe(response => {
    this.currencyList = response;
    this.isLoadingResults = ((currencyListLoad = true) && productListLoad) ? false : true;
  }, error => {
    this.isLoadingResults = false;
    this.isRateLimitReached = true;
    this.errorMessage = error;
  });
  this.duePaymentService.getProduct().subscribe(response => {
    this.productList = response;
    this.isLoadingResults = ((productListLoad = true) && currencyListLoad) ? false : true;
  }, error => {
    this.isLoadingResults = false;
    this.isRateLimitReached = true;
    this.errorMessage = error;
  });
}
}




