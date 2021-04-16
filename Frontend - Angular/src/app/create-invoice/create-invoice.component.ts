import { InvoiceService } from './../invoice.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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

  constructor(
    private fb: FormBuilder,
    private invoiceService: InvoiceService,
    private router: Router,
  ) { }

  addinvoiceForm = this.fb.group({
    piNo:[''],
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
      console.log(data);
    this.goToInvoiceList();  
   },
      error => console.log(error));    
  }

  goToInvoiceList(){
    this.router.navigate(['/invoicelist']);
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
}
 
