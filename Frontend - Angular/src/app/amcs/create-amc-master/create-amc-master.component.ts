import { HttpClient } from '@angular/common/http';
import { element } from 'protractor';
import { AmcMasterService } from './../../shared/amc-master.service';
import { Frequency } from './../../Model/frequency';
import { Currency } from './../../Model/currency.model';
import { Component, ElementRef, NgZone, OnInit, ViewChild, Pipe } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { take } from 'rxjs/operators';
import { ClientService } from 'src/app/shared/client.service';

@Component({
  selector: 'app-create-amc-master',
  templateUrl: './create-amc-master.component.html',
  styleUrls: ['./create-amc-master.component.css']
})
export class CreateAmcMasterComponent implements OnInit {

  currencyList: Currency[];
  frequencyList: Frequency[];

  amcMasterForm: FormGroup;
  amcMasterProgress = false;
  isCreate = true;
  isLoadingResults = true;
  isRateLimitReached = false;
  errorMessage = "Unknown Error"
  @ViewChild('autosize') autosize: CdkTextareaAutosize;

  private clientId: number;
  private clientName: string;
  private deptName: any;
  private deptId: any;
  private amcNo: any;

  constructor(
    private formBuilder: FormBuilder,
    private clientService: ClientService,
    private amcMasterservice: AmcMasterService,
    private elementRef: ElementRef,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private ngZone: NgZone,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      let value = JSON.parse(params["data"]);
      this.clientId = value.cid
      this.clientName = value.cname;
      this.deptId = value.did;
      this.deptName = value.dname;
      this.amcNo = value.amcNo;
      this.isCreate = (value.type === "%c1%") ? true : false;
    });
    this.createForm();
    this.calculate();
    this.loadSelectionData();
    if (!this.isCreate) this.loadData();
  }

  private createForm(): void {
    this.amcMasterForm = this.formBuilder.group({
      client: this.formBuilder.group({
        clientName: [{ value: this.clientName, disabled: true }]
      }),
      startDate: [''],
      frequency: [''],
      exchangeRate: [''],
      totalValue: [''],
      totalValueLkr: [''],
      remark: [''],
      invDesc: [''],
      active: ['true'],
      currency: this.formBuilder.group({
        currencyId: [],
      })
    });
  }

  private loadSelectionData() {
    let currencListLoad = false, frequencyListLoad = false;
    this.http.get<Currency[]>('http://localhost:8080/Currency/findAllCurrency').subscribe(response => {
      this.currencyList = response;
      this.isLoadingResults = ((currencListLoad = true) && frequencyListLoad) ? false : true;
    }, error => {
      this.isLoadingResults = false;
      this.isRateLimitReached = true;
      this.errorMessage = error;
    });
    this.http.get<Frequency[]>('http://localhost:8080/frequency/findAllFrequency').subscribe(response => {
      this.frequencyList = response;
      this.isLoadingResults = ((frequencyListLoad = true) && currencListLoad) ? false : true;
    }, error => {
      this.isLoadingResults = false;
      this.isRateLimitReached = true;
      this.errorMessage = error;
    });
  }

  calculate(): void {
    this.amcMasterservice.calculateAmcValueByExRate(this.amcMasterForm);
  }

  loadData() {
    this.amcMasterservice.getAmcData(this.amcNo).subscribe(response => {
      let frequencyId: number;
      this.frequencyList.map(element => {
        if (element.frequencyName === response.frequency) frequencyId = element.frequencyId;
      })
      this.amcMasterForm.patchValue({
        startDate: response.startDate,
        frequency: 1,
        exchangeRate: response.exchangeRate,
        totalValue: response.totalValue,
        totalValueLkr: response.totalValueLkr,
        remark: response.remark,
        invDesc: response.invDesc,
        active: response.active,
        currency: {
          currencyId: 1
        }
      })
      this.isRateLimitReached = false;
    }, error => {
      console.log(error);
      this.errorMessage = error.error.message;

      this.isRateLimitReached = true;
    }).add(() => this.isLoadingResults = false);
  }

  saveChanges() {
    console.log("jdhdjbc")
    this.amcMasterservice.updateAmcMaster(this.amcMasterForm.value, this.amcNo).subscribe(response => {
      console.log(response);
    }, error => {
      console.log("eroorrr")
      console.log(error);
    });
  }

  triggerResize(): void {
    // Wait for changes to be applied, then trigger textarea resize.
    this.ngZone.onStable.pipe(take(1))
      .subscribe(() => this.autosize.resizeToFitContent(true));
  }

  submitForm(): void {
    this.amcMasterProgress = true;
    if (this.amcMasterForm.valid) {
      this.amcMasterservice.saveAmcMaster(this.amcMasterForm.value, this.clientId).subscribe(
        response => {
          console.log(response);
          let navigationExtras: NavigationExtras = {
            queryParams: {
              "data": JSON.stringify({
                "amcNo": response.amcNo,
                "did": this.deptId,
                "dname": this.deptName
              })
            }
          };
          this.router.navigate(['/amc-serial/new'], navigationExtras);
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
