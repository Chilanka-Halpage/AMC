import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { InvoiceService } from '../invoice.service';

@Component({
  selector: 'app-edit-invoice',
  templateUrl: './edit-invoice.component.html',
  styleUrls: ['./edit-invoice.component.scss']
})
export class EditInvoiceComponent implements OnInit {

  piNo: number;
  showme:boolean=false;

  constructor(private invoiceService: InvoiceService,
              private router: Router,
              private fb: FormBuilder,           
              private route: ActivatedRoute,) { }

  addinvoiceForm = this.fb.group({
    piNo: [''],
    piDate: [''],
    exchageRate: [''],
    totalTax: [''],
    totalAmt: [''],
    totalAmtLkr: [''],
    remark: [''],
    taxApplicable: [''],
    cancel: [''],
    cancelReason: [''],
    clientDepartment: this.fb.group({
      deptId: ['']
    }),
    category: this.fb.group({
      categoryId: ['']
    }),
    amcMaster: this.fb.group({
      amcNo: ['']
    }),
    currency: this.fb.group({
      currencyId: ['']
    }),
    frequency: this.fb.group({
      frequencyId: ['']
    })
  })

  ngOnInit(): void {
    this.piNo = this.route.snapshot.params['piNo'];
    this.invoiceService.getinvoicebyId(this.piNo).subscribe(data=>{
      this.addinvoiceForm.patchValue({ 
        piNo:data.pi_no,
        piDate:data.pi_date, 
        exchageRate:data.exchage_rate,
        totalTax:data.total_tax,
        totalAmt:data.total_amount,
        totalAmtLkr:data.total_amount_lkr,
        remark:data.remark,
        product:{ productId:data.product_id},
        currency:{ currencyId:data.currency_id},
        amcSerial:{ amcSerialNo:data.amc_serialno}
       })
       },
    error => console.log(error));
  }
   
  Showtoggle(){
    this.showme=!this.showme
  }

  onSubmit(){

  }

}
