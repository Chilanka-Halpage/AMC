import { Router, ActivatedRoute } from '@angular/router';
import { TaxService } from './../tax.service';
import { Component, OnInit } from '@angular/core';
import { Tax } from '../tax';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-tax',
  templateUrl: './update-tax.component.html',
  styleUrls: ['./update-tax.component.scss']
})
export class UpdateTaxComponent implements OnInit {

  taxId: number;
  tax: Tax = new Tax();
  constructor(
    private fb: FormBuilder,
    private taxService: TaxService,
    private route: ActivatedRoute,
    private router: Router
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
   this.taxService.updatetax(this.taxId, this.tax).subscribe(
     data => {
       this.goToTaxList();
     }
     ,error => console.log(error));
  }
  goToTaxList(){
    this.router.navigate(['/taxlist']);
}

}
