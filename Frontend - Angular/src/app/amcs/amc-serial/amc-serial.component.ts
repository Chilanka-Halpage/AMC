import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { Currency } from 'src/app/Model/currency.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { AmcMasterService } from 'src/app/shared/amc-master.service';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { ClientService } from 'src/app/shared/client.service';

@Component({
  selector: 'app-amc-serial',
  templateUrl: './amc-serial.component.html',
  styleUrls: ['./amc-serial.component.css']
})
export class AmcSerialComponent implements OnInit {

  categoryList = [
    { categoryId: 1, categoryName: 'Software' },
    { categoryId: 2, categoryName: 'Software/Hardware' },
  ];


  amcSerialForm: FormGroup;
  amcSerialProgress = false;
  @ViewChild('autosize') autosize: CdkTextareaAutosize;

  constructor(
    private formBuilder: FormBuilder,
    private clientService: ClientService,
    private amcMasterservice: AmcMasterService,
    private elementRef: ElementRef,
    private router: Router,
    private ngZone: NgZone
  ) { }

  ngOnInit(): void {
    this.amcSerialForm = this.formBuilder.group({
      amcMaster: this.formBuilder.group({
        amcNo: [{ value: '', disabled: true }],
        frequency: [{ value: '', disabled: true }],
        currencyId: [{ value: '', disabled: true }],
        exchangeRate: [{ value: '', disabled: true }],
      }),
      clientDepartment: this.formBuilder.group({
        departmentName: [{ value: '', disabled: true }]
      }),
      category: this.formBuilder.group({
        categoryId: [{ value: '' }]
      }),
      mtcStartDate: [{ value: '' }], requency: ['1'],
      mtcEndDate: [{ value: '' }],
      renewalDate: [{ value: '' }],
      mtcQty: [{ value: '' }],
      mtcAmtPerAnnum: [{ value: '' }],
      mtcAmtPerAnnumLkr: [{ value: '' }],
      mtcAmtforfrequency: [{ value: '' }],
      mtcAmtforfrequencyLkr: [{ value: '' }],
      mtcAmtPerProduct: [{ value: '' }],
      mtcAmtPerProductLkr: [{ value: '' }],
      mtcAmtforfrequencyperItem: [{ value: '' }],
      mtcAmtforfrequencyperItemLk: [{ value: '' }],
      isActive: ['true'],
      remark: [{ value: '' }]
  });
}

calculate(event: any): void {
  console.log(event);
  const value1 = event.srcElement.value;
  let value2 = 0;
  if(event.srcElement.id == 'exchangeRate') {
  value2 = this.amcSerialForm.get('totalValue').value;
}

    else if (event.srcElement.id == 'totalValue') {
  value2 = this.amcSerialForm.get('exchangeRate').value;
}

let totalValueLKr = 0;
totalValueLKr = value1 * value2;
this.amcSerialForm.patchValue({ totalValueLkr: totalValueLKr })

  }

triggerResize(): void {
  // Wait for changes to be applied, then trigger textarea resize.
  this.ngZone.onStable.pipe(take(1))
    .subscribe(() => this.autosize.resizeToFitContent(true));
}

submitForm(): void {
  console.log(this.amcSerialForm.value);
  this.amcSerialProgress = true;
  if(this.amcSerialForm.valid) {
  this.amcMasterservice.saveAmcMaster(this.amcSerialForm.value, 1).subscribe(
    response => {
      console.log(response);
      this.clientService.success(response);
    },
    error => {
      console.error(error);
      this.clientService.warn('Submission Failed');
    }
  ).add(() => this.amcSerialProgress = false);
} else {
  this.amcSerialProgress = false;
  this.scrollToFirstInvalidControl();
}
  }

resetForm(): void {
  this.amcSerialForm.reset();
  this.elementRef.nativeElement.querySelector('#course-name').scrollIntoView();
}

scrollToFirstInvalidControl(): void {
  const firstInvalidControl: HTMLElement = this.elementRef.nativeElement.querySelector('form .ng-invalid');
  firstInvalidControl.scrollIntoView({ behavior: 'smooth' });
}

navigateToClientList(): void {
  this.router.navigateByUrl('clientView');
}

}
