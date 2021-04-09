import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { TaxService } from '../tax.service';
import { Router } from '@angular/router';
import { Tax } from './../tax';

@Component({
  selector: 'app-tax-f',
  templateUrl: './tax-f.component.html',
  styleUrls: ['./tax-f.component.scss']
})
export class TaxFComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private taxService: TaxService,
    private router: Router,
  ) { }

  tax: Tax = new Tax();
  taxId: number;

  addtaxForm = this.fb.group({
    taxName: ['', [Validators.required]],
    shortName: ['', [Validators.required]],
    taxRate: ['', [Validators.required, Validators.max(999)]],
    taxId: [''],
    savedOn: [''],
    savedIp: [''],
    active: ['']
  })

  ngOnInit(): void {
  }

  saveTax() {
    this.taxService.createTax(this.tax).subscribe(data => {
      console.log(data);
      this.goToTaxList();
    },
      error => console.log(error));
  }
  goToTaxList() {
    this.router.navigate(['/taxlist']);
  }
  onSubmit() {
    console.log(this.addtaxForm.value);
    this.saveTax();
  }
}


