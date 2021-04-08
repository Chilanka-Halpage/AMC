import { NotificationService } from './../../shared/notification.service';
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
import { Location } from '@angular/common';

@Component({
  selector: 'app-create-amc-master',
  templateUrl: './create-amc-master.component.html',
  styleUrls: ['./create-amc-master.component.css']
})
export class CreateAmcMasterComponent implements OnInit {

  private clientId: number;
  private clientName: string;
  private deptName: string;
  private deptId: number;
  private amcNo: string;
  public currencyList: Currency[];
  public frequencyList: Frequency[];
  public amcMasterForm: FormGroup;
  public amcMasterProgress = false;
  public isCreate = true;
  public isLoadingResults = true;
  public isRateLimitReached = false;
  public errorMessage = "Unknown Error"
  public heading = 'Create New AMC';
  public description = 'AMC general details';
  @ViewChild('autosize') autosize: CdkTextareaAutosize;

  constructor(
    private formBuilder: FormBuilder,
    private amcMasterservice: AmcMasterService,
    private notificationService: NotificationService,
    private elementRef: ElementRef,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private ngZone: NgZone,
    private http: HttpClient,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      let value = JSON.parse(params["data"]);
      this.clientId = value.cid
      this.clientName = value.cname;
      this.deptId = value.did;
      this.deptName = value.dname;
      this.amcNo = value.amcNo;
      this.isCreate = (value.type === "%c1%") ? true : false; //type define whether the request is for creating new AMC or editing. %c1% -> creating new AMC
    });
    this.createForm();
    this.calculate(); 
    this.loadSelectionData(); 
    if (!this.isCreate) this.loadData(); // when a edit rquest comes, get AMC data to the form fields 
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

  //Get frequency and currency data from backend
  private loadSelectionData() {
    let currencListLoad = false, frequencyListLoad = false;
    this.amcMasterservice.getCurrency().subscribe(response => {
      this.currencyList = response;
      this.isLoadingResults = ((currencListLoad = true) && frequencyListLoad) ? false : true;
    }, error => {
      this.isLoadingResults = false;
      this.isRateLimitReached = true;
      this.errorMessage = error;
    });
    this.amcMasterservice.getFrequency().subscribe(response => {
      this.frequencyList = response;
      this.isLoadingResults = ((frequencyListLoad = true) && currencListLoad) ? false : true;
    }, error => {
      this.isLoadingResults = false;
      this.isRateLimitReached = true;
      this.errorMessage = error;
    });
  }

  //Calculate Value in Lkr, as value in given currency and exchange rate chnages
  calculate(): void {
    this.amcMasterservice.calculateAmcValueByExRate(this.amcMasterForm);
  }

  // Get AMC data and set to the form fields
  loadData() {
    this.heading = 'Edit AMC'
    this.description = 'AMC general details Modification'
    this.amcMasterservice.getAmcData(this.amcNo).subscribe(response => {
      this.amcMasterForm.patchValue({
        startDate: response.startDate,
        frequency: response.frequency,
        exchangeRate: response.exchangeRate,
        totalValue: response.totalValue,
        totalValueLkr: response.totalValueLkr,
        remark: response.remark,
        invDesc: response.invDesc,
        active: response.active,
        currency: {
          currencyId: response.currency.currencyId
        }
      })
      this.isRateLimitReached = false;
    }, error => {
      console.log(error);
      this.errorMessage = error.error.message;

      this.isRateLimitReached = true;
    }).add(() => this.isLoadingResults = false);
  }

  // Edited data send to the backend
  saveChanges() {
    this.amcMasterProgress = true;
    this.amcMasterservice.updateAmcMaster(this.amcMasterForm.value, this.amcNo).subscribe(response => {
      console.log(response);
      this.notificationService.showNoitfication(response, 'OK', 'success', () => { this.location.back() });
    }, error => {
      console.log(error);
      let message = 'Cannot proceed the request. Try again'
      this.notificationService.showNoitfication(message, 'OK', 'error', null);
    }).add(() => this.amcMasterProgress = false);;
  }

  //Send data to backend to create a new AMC
  submitForm(): void {
    this.amcMasterProgress = true;
    if (this.amcMasterForm.valid) {
      this.amcMasterservice.saveAmcMaster(this.amcMasterForm.value, this.clientId).subscribe(
        response => {
          console.log(response);
          let navigationExtras: NavigationExtras = {
            queryParams: {
              data: JSON.stringify({
                amcNo: response,
                cname: this.clientName,
                did: this.deptId,
                dname: this.deptName
              })
            }
          };
          this.router.navigate(['/amc-serial/new'], navigationExtras);
        },
        error => {
          let message = (error.status === 501) ? error.error.message : 'Cannot proceed the request. Try again'
          this.notificationService.showNoitfication(message, 'OK', 'error', null);
        }
      ).add(() => this.amcMasterProgress = false);
    } else {
      this.amcMasterProgress = false;
      this.scrollToFirstInvalidControl();
    }
  }

  triggerResize(): void {
    // Wait for changes to be applied, then trigger textarea resize.
    this.ngZone.onStable.pipe(take(1))
      .subscribe(() => this.autosize.resizeToFitContent(true));
  }

  //reset form when it clickes on reset button in the form
  resetForm(): void {
    this.amcMasterForm.reset();
    this.elementRef.nativeElement.querySelector('#course-name').scrollIntoView();
  }

  //scrroll the form to first invalid form ,when it clicks on save button, if any invalid form is there
  scrollToFirstInvalidControl(): void {
    const firstInvalidControl: HTMLElement = this.elementRef.nativeElement.querySelector('form .ng-invalid');
    firstInvalidControl.scrollIntoView({ behavior: 'smooth' });
  }


}
