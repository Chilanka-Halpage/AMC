import { AmcMasterService } from './../../shared/amc-master.service';
import { Frequency } from './../../Model/frequency';
import { Currency } from './../../Model/currency.model';
import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { take } from 'rxjs/operators';
import { SharedAmcService } from 'src/app/shared/shared-amc.service';
import { ClientService } from 'src/app/shared/client.service';

@Component({
  selector: 'app-create-amc-master',
  templateUrl: './create-amc-master.component.html',
  styleUrls: ['./create-amc-master.component.css']
})
export class CreateAmcMasterComponent implements OnInit {

  currencyList: Currency[] = [
    { currencyId: 1, currencyName: 'LKR' },
    { currencyId: 2, currencyName: 'USD' },
  ];
  frequencyList: Frequency[] = [
    { frequencyId: 1, frequencyName: '3 Months' },
    { frequencyId: 2, frequencyName: '6 Months' },
  ];

  amcMasterForm: FormGroup;
  amcMasterProgress = false;
  @ViewChild('autosize') autosize: CdkTextareaAutosize;

  private clientId: number;

  constructor(
    private formBuilder: FormBuilder,
    private clientService: ClientService,
    private amcMasterservice: AmcMasterService,
    private sharedService: SharedAmcService,
    private elementRef: ElementRef,
    private router: Router,
    private ngZone: NgZone,
  ) { }

  ngOnInit(): void {
    this.amcMasterForm = this.formBuilder.group({
      client: this.formBuilder.group({
        clientName: [{ value: '', disabled: true }]
      }),
      startDate: [''],
      frequency: ['1'],
      exchangeRate: [''],
      totalValue: [''],
      totalValueLkr: [''],
      remark: [''],
      invDesc: [''],
      isActive: ['true'],
      currency: this.formBuilder.group({
        currencyId: ['1'],
      })
    });

    this.sharedService.dataChange.subscribe(value => {
      this.clientId = value.clietnID;
      this.amcMasterForm.patchValue({
        client: {
          //clientId: value.clietnID,
          clientName: value.clientName
        }
      });
    })

  }

  calculate(event: any): void {
    console.log(event);
    const value1 = event.srcElement.value;
    let value2 = 0;
    if (event.srcElement.id == 'exchangeRate') {
      value2 = this.amcMasterForm.get('totalValue').value;
    }

    else if (event.srcElement.id == 'totalValue') {
      value2 = this.amcMasterForm.get('exchangeRate').value;
    }

    let totalValueLKr = 0;
    totalValueLKr = value1 * value2;
    this.amcMasterForm.patchValue({ totalValueLkr: totalValueLKr })

  }

  triggerResize(): void {
    // Wait for changes to be applied, then trigger textarea resize.
    this.ngZone.onStable.pipe(take(1))
      .subscribe(() => this.autosize.resizeToFitContent(true));
  }

  submitForm(): void {
    console.log(this.amcMasterForm.value);
    this.amcMasterProgress = true;
    if (this.amcMasterForm.valid) {
      this.amcMasterservice.saveAmcMaster(this.amcMasterForm.value, this.clientId).subscribe(
        response => {
          console.log(response);
          this.clientService.success(response);
        },
        error => {
          console.error(error);
          this.clientService.warn('Submission Failed');
        }
      ).add(() => this.amcMasterProgress = false);
    } else {
      this.amcMasterProgress = false;
      this.scrollToFirstInvalidControl();
    }
  }
  ;
  resetForm(): void {
    this.amcMasterForm.reset();
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
