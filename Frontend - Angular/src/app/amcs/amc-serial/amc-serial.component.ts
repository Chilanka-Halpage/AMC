import { NotificationService } from './../../shared/notification.service';
import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { AmcMasterService, DateValidator } from 'src/app/shared/amc-master.service';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-amc-serial',
  templateUrl: './amc-serial.component.html',
  styleUrls: ['./amc-serial.component.css']
})
export class AmcSerialComponent implements OnInit {

  categoryList = [];
  productList = [];

  amcSerialForm: FormGroup;
  amcSerialProgress = false;
  @ViewChild('autosize') autosize: CdkTextareaAutosize;
  private clientName: string;
  private deptId: number;
  private deptName: string;
  private amcNo: string;
  private amcFile: File;
  public isLoadingResults = true;
  public isRateLimitReached = false;
  public errorMessage = "Unknown Error"

  constructor(
    private formBuilder: FormBuilder,
    private amcMasterservice: AmcMasterService,
    private elementRef: ElementRef,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private ngZone: NgZone,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      const value = JSON.parse(params["data"]);
      this.amcNo = value.amcNo;
      this.clientName = value.cname;
      this.deptId = value.did;
      this.deptName = value.dname;
    });
    this.createForm();
    this.loadData();
    this.loadSelectionData();
    this.calculateTotal();
  }

  private createForm(): void {
    this.amcSerialForm = this.formBuilder.group({
      amcMaster: this.formBuilder.group({
        amcNo: [{ value: '', disabled: true }],
        frequency: [{ value: '', disabled: true }],
        currency: this.formBuilder.group({
          currencyName: [{ value: '', disabled: true }]
        }),
        exchangeRate: [{ value: '', disabled: true }],
      }),
      clientDepartment: this.formBuilder.group({
        deptId: [''],
        departmentName: [{ value: '', disabled: true }]
      }),
      category: this.formBuilder.group({
        categoryId: ['', [Validators.required]]
      }),
      amcProduct: this.formBuilder.group({
        product: this.formBuilder.group({
          productId: ['', [Validators.required]]
        }),
        lifeStartDate: ['', [Validators.required]],
        lifeEndDate: ['', [Validators.required]],
        productDescription: ['', [Validators.required]],
        price: ['', [Validators.required, Validators.pattern(/^[\d]+(\.[\d]{1,2})?$/)]],
        quantity: ['', [Validators.required, Validators.pattern(/^[\d]{1,2}$/)]],
        exchangeRate: [''],
        totalValue: ['', [Validators.required, Validators.pattern(/^[\d]+(\.[\d]{1,2})?$/)]],
        totalValueLkr: ['', [Validators.required, Validators.pattern(/^[\d]+(\.[\d]{1,2})?$/)]]
      }, {
        validator: DateValidator('lifeStartDate', 'lifeEndDate')
      }),
      currency: this.formBuilder.group({
        currencyId: ['', [Validators.required]],
      }),
      frequency: ['', [Validators.required]],
      mtcStartDate: ['', [Validators.required]],
      mtcEndDate: ['', [Validators.required]],
      renewalDate: ['', [Validators.required]],
      mtcQty: ['', [Validators.required, Validators.pattern(/^[\d]{1,2}$/)]],
      mtcAmtPerAnnum: ['', [Validators.required, Validators.pattern(/^[\d]+(\.[\d]{1,2})?$/)]],
      mtcAmtPerAnnumLkr: ['', [Validators.required, Validators.pattern(/^[\d]+(\.[\d]{1,2})?$/)]],
      mtcAmtforfrequency: ['', [Validators.required, Validators.pattern(/^[\d]+(\.[\d]{1,2})?$/)]],
      mtcAmtforfrequencyLkr: ['', [Validators.required, Validators.pattern(/^[\d]+(\.[\d]{1,2})?$/)]],
      mtcAmtPerProduct: ['', [Validators.required, Validators.pattern(/^[\d]+(\.[\d]{1,2})?$/)]],
      mtcAmtPerProductLkr: ['', [Validators.required, Validators.pattern(/^[\d]+(\.[\d]{1,2})?$/)]],
      mtcAmtforfrequencyPerItem: ['', [Validators.required, Validators.pattern(/^[\d]+(\.[\d]{1,2})?$/)]],
      mtcAmtforfrequencyPerItemLkr: ['', [Validators.required, Validators.pattern(/^[\d]+(\.[\d]{1,2})?$/)]],
      active: ['true'],
      remark: ['', [Validators.required]]
    }, {
      validator: [DateValidator('mtcEndDate', 'renewalDate'), DateValidator('mtcStartDate', 'mtcEndDate')]
    });
  }

  //Get product and category data from backend
  private loadSelectionData() {
    let productListLoad = false, categoryListLoad = false;
    this.amcMasterservice.getProduct().subscribe(response => {
      this.productList = response;
      this.isLoadingResults = ((productListLoad = true) && categoryListLoad) ? false : true;
    }, error => {
      this.isLoadingResults = false;
      this.isRateLimitReached = true;
      this.errorMessage = error;
    });
    this.amcMasterservice.getCategory().subscribe(response => {
      this.categoryList = response;
      this.isLoadingResults = ((categoryListLoad = true) && productListLoad) ? false : true;
    }, error => {
      this.isLoadingResults = false;
      this.isRateLimitReached = true;
      this.errorMessage = error;
    });
  }

  //Get and Set amc general data to the serial form field
  private loadData(): void {
    this.amcMasterservice.getAmcData(this.amcNo).subscribe(data => {
      this.amcSerialForm.patchValue({
        amcMaster: {
          amcNo: this.amcNo,
          frequency: data.frequency,
          exchangeRate: data.exchangeRate,
          currency: {
            currencyName: data.currency.currencyName
          }
        },
        clientDepartment: {
          deptId: this.deptId,
          departmentName: this.deptName
        },
        amcProduct: {
          exchangeRate: data.exchangeRate
        },
        currency: {
          currencyId: data.currency.currencyId
        },
        frequency: data.frequency
      })
    })
  }

  //Calculate Value in Lkr acording to gurrency and exchange rate
  calculateLkr(event: any): void {
    this.amcMasterservice.calculateMtcAmountInLkr(event, this.amcSerialForm);
  }

  //calclulate totla value of amc product details
  private calculateTotal(): void {
    this.amcMasterservice.calculateTotalByPriceAndQuantity(this.amcSerialForm);
  }

  triggerResize(): void {
    // Wait for changes to be applied, then trigger textarea resize.
    this.ngZone.onStable.pipe(take(1))
      .subscribe(() => this.autosize.resizeToFitContent(true));
  }

  submitForm(): void {
    this.amcSerialProgress = true;
    if (this.amcSerialForm.valid) {
      const amcNo = this.amcSerialForm.get('amcMaster.amcNo').value;
      const formData = new FormData();
      const amcSerial = this.amcSerialForm.value;
      formData.append("data", JSON.stringify(amcSerial));
      formData.append("file", this.amcFile);
      this.amcMasterservice.saveAmcSerial(formData, amcNo).subscribe(
        response => {
          let navigationExtras: NavigationExtras = {
            queryParams: {
              "data": JSON.stringify({
                "cname": this.clientName,
                "did": this.deptId,
                "dname": this.deptName
              })
            }
          };
          this.notificationService.showNoitfication(response, 'OK', 'success', () => this.router.navigate([`/clients/depts/${this.deptId}/amc-list`], navigationExtras));
        },
        error => {
          let message = (error.status === 400) ? error.error.message : 'Cannot proceed the request. Try again'
          this.notificationService.showNoitfication(message, 'OK', 'error', null);
        }
      ).add(() => this.amcSerialProgress = false);
    } else {
      this.amcSerialProgress = false;
      this.scrollToFirstInvalidControl();
    }
  }

  //set selected file to amcFile variable;
  onFileChanged(event: any) {
    this.amcFile = event.target.files[0];
  }

  //reset form when it clickes on reset button in the form
  resetForm(): void {
    this.amcSerialForm.reset();
    this.elementRef.nativeElement.querySelector('#course-name').scrollIntoView();
  }

  //scrroll the form to first invalid form ,when it clicks on save button, if any invalid form is there
  scrollToFirstInvalidControl(): void {
    const firstInvalidControl: HTMLElement = this.elementRef.nativeElement.querySelector('form .ng-invalid');
    firstInvalidControl.scrollIntoView({ behavior: 'smooth' });
  }

  navigateToClientList(): void {
    this.router.navigateByUrl('clientView');
  }

  get product(): AbstractControl {
    return this.amcSerialForm.get('amcProduct.product.productId');
  }
  get lifeStartDate(): AbstractControl {
    return this.amcSerialForm.get('amcProduct.lifeStartDate');
  }
  get lifeEndDate(): AbstractControl {
    return this.amcSerialForm.get('amcProduct.lifeEndDate');
  }
  get productDes(): AbstractControl {
    return this.amcSerialForm.get('amcProduct.productDescription');
  }
  get price(): AbstractControl {
    return this.amcSerialForm.get('amcProduct.price');
  }
  get quantity(): AbstractControl {
    return this.amcSerialForm.get('amcProduct.quantity');
  }
  get exchangeRate(): AbstractControl {
    return this.amcSerialForm.get('amcProduct.exchangeRate');
  }
  get salesValue(): AbstractControl {
    return this.amcSerialForm.get('amcProduct.totalValue');
  }
  get salesValueLkr(): AbstractControl {
    return this.amcSerialForm.get('amcProduct.totalValueLkr');
  }
  get frequency(): AbstractControl {
    return this.amcSerialForm.get('frequency');
  }
  get category(): AbstractControl {
    return this.amcSerialForm.get('category.categoryId');
  }
  get mtcStartDate(): AbstractControl {
    return this.amcSerialForm.get('mtcStartDate');
  }
  get mtcEndDate(): AbstractControl {
    return this.amcSerialForm.get('mtcEndDate');
  }
  get renewalDate(): AbstractControl {
    return this.amcSerialForm.get('renewalDate');
  }
  get mtcQty(): AbstractControl {
    return this.amcSerialForm.get('mtcQty');
  }
  get mtcAmtPerAnnum(): AbstractControl {
    return this.amcSerialForm.get('mtcAmtPerAnnum');
  }
  get mtcAmtPerAnnumLkr(): AbstractControl {
    return this.amcSerialForm.get('mtcAmtPerAnnumLkr');
  }
  get mtcAmtforfrequency(): AbstractControl {
    return this.amcSerialForm.get('mtcAmtforfrequency');
  }
  get mtcAmtforfrequencyLkr(): AbstractControl {
    return this.amcSerialForm.get('mtcAmtforfrequencyLkr');
  }
  get mtcAmtPerProduct(): AbstractControl {
    return this.amcSerialForm.get('mtcAmtPerProduct');
  }
  get mtcAmtPerProductLkr(): AbstractControl {
    return this.amcSerialForm.get('mtcAmtPerProductLkr');
  }
  get mtcAmtforfrequencyPerItem(): AbstractControl {
    return this.amcSerialForm.get('mtcAmtforfrequencyPerItem');
  }
  get mtcAmtforfrequencyPerItemLkr(): AbstractControl {
    return this.amcSerialForm.get('mtcAmtforfrequencyPerItemLkr');
  }
  get remark(): AbstractControl {
    return this.amcSerialForm.get('remark');
  }

}

