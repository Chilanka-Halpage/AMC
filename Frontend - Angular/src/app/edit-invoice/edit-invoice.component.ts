import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router, Data } from '@angular/router';
import { InvoiceService } from '../invoice.service';
import { NotificationService } from '../shared/notification.service';

@Component({
  selector: 'app-edit-invoice',
  templateUrl: './edit-invoice.component.html',
  styleUrls: ['./edit-invoice.component.scss']
})
export class EditInvoiceComponent implements OnInit {

  piNo: number;
  showme:boolean=false;
  public invoiceSavingProgress = false;

  constructor(private invoiceService: InvoiceService,
              private router: Router,
              private fb: FormBuilder,           
              private route: ActivatedRoute,
              private notificationService: NotificationService,) { }

  addinvoiceForm = this.fb.group({
    piNo: [{value:'', disabled: true}],
    piDate: ['',[Validators.required]],
    exchageRate: ['',[Validators.required]],
    totalTax: ['',[Validators.required]],
    totalAmt: ['',[Validators.required]],
    totalAmtLkr: ['',[Validators.required]],
    remark: [''],
    taxApplicable: [''],
    cancel: [''],
    cancelReason: [''],
    clientDepartment: this.fb.group({
      deptId: [{value:'', disabled: true}]
    }),
    category: this.fb.group({
      categoryId: [{value:'', disabled: true}]
    }),
    amcMaster: this.fb.group({
      amcNo: [{value:'', disabled: true}]
    }),
    currency: this.fb.group({
      currencyId: [{value:'', disabled: true}]
    }),
    frequency: this.fb.group({
      frequencyId: [{value:'', disabled: true}]
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
        amcSerial:{ amcSerialNo:data.amc_serialno},
        clientDepartment:{deptId:data.client_dept_id},
        category:{categoryId:data.category_id},
        amcMaster:{amcNo:data.amc_no},
        frequency:{frequencyId:data.frequency_id}
       })
       },
       error =>  { let message = (error.status === 0 || error.status === 400  || error.status === 403 || error.status === 401) ? error.error : 'Cannot proceed the request. please try again'
       this.notificationService.showNoitfication(message, 'OK', 'error', null); }
       );
  }
   
  Showtoggle(){
    this.showme=!this.showme
  }

  onSubmit(){
    if(this.addinvoiceForm.valid){
    this.invoiceSavingProgress = true;
    this.invoiceService.updateInvoice(this.piNo,this.addinvoiceForm.value).subscribe(
      data => {
       this.notificationService.showNoitfication('Successfully done', 'OK', 'success', () => {  });
       this.invoiceSavingProgress = false;
    },
    error =>  { let message = (error.status === 0 || error.status === 400  || error.status === 403 || error.status === 401) ? error.error : 'Cannot proceed the request. please try again'
    this.notificationService.showNoitfication(message, 'OK', 'error', null); }
    );
    }
      else{
        this.invoiceSavingProgress = false;
      }
      
  }

}
