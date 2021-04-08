import { DuePaymentService } from './../due-payment.service';
import { DuePayment } from './../due-payment';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-dueinvoice',
  templateUrl: './create-dueinvoice.component.html',
  styleUrls: ['./create-dueinvoice.component.scss']
})
export class CreateDueinvoiceComponent implements OnInit {

  constructor( private fb: FormBuilder,private router: Router,private duePaymentService: DuePaymentService) { }
  
  id: number;

    adddueinvoiceForm = this.fb.group({
    id:[''],
    dueDate: ['',[Validators.required]],
    invoiceAmt: ['',[Validators.required]],
    invoiceBalance: ['', [Validators.required]],
    savedOn: [''],
    savedIp: [''],
    active: [''],
    amcMaster:this.fb.group({
      amcNo:['']
    }),
    amcSerial:this.fb.group({
      amcSerialNo:['']
    }),
    product:this.fb.group({
      productId:['']
    }),
    currency:this.fb.group({
      currencyId:['']
    })
  })

  ngOnInit(): void {
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
}




