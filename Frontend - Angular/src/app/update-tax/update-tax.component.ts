import { Router, ActivatedRoute } from '@angular/router';
import { TaxService } from './../tax.service';
import { Component, OnInit } from '@angular/core';
import { Tax } from '../tax';
import { FormBuilder, Validators } from '@angular/forms';
import { NotificationService } from '../shared/notification.service';

@Component({
  selector: 'app-update-tax',
  templateUrl: './update-tax.component.html',
  styleUrls: ['./update-tax.component.scss']
})
export class UpdateTaxComponent implements OnInit {

  taxId: number;
  tax: Tax = new Tax();
  TaxSavingProgress = false; 

  constructor(
    private fb: FormBuilder,
    private taxService: TaxService,
    private route: ActivatedRoute,
    private router: Router,
    private notificationService: NotificationService,
  ) { }

  addtaxForm = this.fb.group({
    taxName: ['',[Validators.required]],
    shortName: ['',[Validators.required]],
    taxRate: ['', [Validators.required, Validators.max(999)]],
    taxId: [''],
    savedOn: [''],
    savedIp: [''],
    active: false
  })

  ngOnInit(): void {
    this.taxId = this.route.snapshot.params['taxId'];
    this.taxService.getTaxbyId(this.taxId).subscribe(data=>{
      this.tax = data;
    },error => console.log(error));
  }

  onSubmit(){
    if(this.addtaxForm.valid){
   this.taxService.updatetax(this.taxId, this.tax).subscribe(
     data => {this.TaxSavingProgress = true; 
      this.notificationService.showNoitfication('Successfully done', 'OK', 'success', () => { this.router.navigate(['/taxlist']) });
      
   },
     error =>  { let message = (error.status === 501) ? error.error.message : 'Cannot proceed the request. Try again'
                 this.notificationService.showNoitfication(message, 'OK', 'error', null); }
     );
   }else{
     this.TaxSavingProgress = false; 
   }
  }
  goToTaxList(){
    this.router.navigate(['/taxlist']);
}

}
