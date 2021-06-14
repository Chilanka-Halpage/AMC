import { DuePayment } from './../due-payment';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DuePaymentService } from '../due-payment.service';

@Component({
  selector: 'app-edit-dueinvoice',
  templateUrl: './edit-dueinvoice.component.html',
  styleUrls: ['./edit-dueinvoice.component.scss']
})
export class EditDueinvoiceComponent implements OnInit {
/* 
  duePayment: DuePayment = new DuePayment(); */
  id: number;
  productList = [];
  currencyList = [];
  public isLoadingResults = true;
  public isRateLimitReached = false;
  public errorMessage = "Unknown Error"


  constructor(
    private fb: FormBuilder,
    public duePaymentService: DuePaymentService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

    adddueinvoiceForm = this.fb.group({
    dueDate: ['',[Validators.required]],
    invoiceAmt: ['',[Validators.required]],
    invoiceBalance: ['', [Validators.required]],
    savedOn: [''],
    savedIp: [''],
    settle: [''],
    id:[''],
    amcMaster:this.fb.group({
      amcNo:['']
    }),
    currency:this.fb.group({
      currencyId:['']
    })
  })

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.duePaymentService.getdueinvoicebyid(this.id).subscribe(data=>{
      this.adddueinvoiceForm.patchValue({ 
        id:data.id,
        dueDate:data.due_date, 
        invoiceBalance:data.invoice_payble_lkr,
        invoiceAmt:data.invoice_amount,
        amcMaster:{ amcNo:data.amc_no},
        currency:{ currencyId:data.currency_id},
       })
       },
    error => console.log(error));
    this.loadSelectionData()
  }

  onSubmit(){
    this.duePaymentService.updatedueinvoice(this.id, this.adddueinvoiceForm.value).subscribe(
      data => {
        this.gotoDuepayemtlist();
      }
      ,error => console.log(error));
   }

   gotoDuepayemtlist(){
    this.router.navigate(['/duepayment']);
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
