import { frequency } from './../frequencyy';
import { InvoiceService } from './../invoice.service';
import { Invoice } from './../invoice';
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

  constructor(
    private fb: FormBuilder,
    private invoiceService: InvoiceService,
    private router: Router,
  ) { }

 /*  addinvoiceTaxForm = this.fb.group({
    taxRate:[''],
    totalAmt: [''],
    invoice:this.fb.group({
      piNo:['']
    }),
    tax:this.fb.group({
      taxId:['']
    }),
    product:this.fb.group({
    productId:['']
    }),
    piDate: [''],
    exchageRate: [''],
    totalTax: ['',[Validators.required]],  
    totalAmtLkr: [''],
    remark:[''],
    cancel: false,
    cancelReason: ['',[Validators.required]],
    taxApplicable: false, 
    savedOn: [''],
    savedIp: [''],
    taxAmt:[''],
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
    })
  })


  ngOnInit(): void {
  }

 goToInvoiceList(){
    this.router.navigate(['/invoicelist']);
  }

  saveInvoice(){ 
      this.invoiceService.createInvoice(this.addinvoiceTaxForm.value).subscribe(data =>{
        console.log(data);
      this.goToInvoiceList();  
     },
        error => console.log(error));    
  }
  onSubmit(){
    console.log(this.addinvoiceTaxForm.value);
    this.saveInvoice();
  }
  Showtoggle(){
    this.showme=!this.showme
  }*/
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
}
 
