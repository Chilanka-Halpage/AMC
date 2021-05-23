import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AmcMasterService, DateValidator } from 'src/app/shared/amc-master.service';
import { Component, ElementRef, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AmcData } from 'src/app/Model/amc-data.model';
import { Frequency } from 'src/app/Model/frequency';
import { NotificationService } from 'src/app/shared/notification.service';

@Component({
  selector: 'app-amc-renew-edit',
  templateUrl: './amc-renew-edit.component.html',
  styleUrls: ['./amc-renew-edit.component.css']
})
export class AmcRenewEditComponent implements OnInit {

  public data: AmcData;
  private isDesabled = true;
  public amcFile: File;
  public frequencyList: Frequency[];
  public amcFullDataForm: FormGroup;
  public clientName: string;
  public isLoadingResults = true;
  public isRateLimitReached = false;
  public errorMessage = "Unknown Error"
  public registerStudentProgress = false;

  constructor(
    private formBuilder: FormBuilder,
    private amcService: AmcMasterService,
    private notificationService: NotificationService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private elementRef: ElementRef,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      let value = JSON.parse(params["data"]);
      this.clientName = value.cname;
      this.loadSelectionData();
      this.loadData(value.serial);
    });
  }

  private createForm(): void {
    this.amcFullDataForm = this.formBuilder.group({
      amcMaster: this.formBuilder.group({
        amcNo: [{ value: this.data.amc_no, disabled: this.isDesabled }],
        startDate: [{ value: this.data.start_date, disabled: this.isDesabled }, [Validators.required]],
        active: [{ value: this.data.amc_active ? "active" : "Inactive", disabled: this.isDesabled }, [Validators.required]],
        frequency: [{ value: this.data.frequency, disabled: !this.isDesabled }, [Validators.required]],
        exchangeRate: [{ value: this.data.exchange_rate, disabled: !this.isDesabled }, [Validators.required, Validators.pattern(/^[\d]{1,3}(\.[\d]{1,2})?$/)]],
        totalValue: [{ value: this.data.total_value, disabled: !this.isDesabled }, [Validators.required, Validators.pattern(/^[\d]+(\.[\d]{1,2})?$/)]],
        totalValueLkr: [{ value: this.data.total_value_lkr, disabled: !this.isDesabled }, [Validators.required, Validators.pattern(/^[\d]+(\.[\d]{1,2})?$/)]],
        remark: [{ value: this.data.amc_remark, disabled: this.isDesabled }, [Validators.required]],
        invDesc: [{ value: this.data.inv_desc, disabled: this.isDesabled }, [Validators.required]],
        currencyName: [{ value: this.data.currency_name, disabled: this.isDesabled }, [Validators.required]],
        categoryName: [{ value: this.data.category_name, disabled: this.isDesabled }, [Validators.required]]
      }),
      amcProduct: this.formBuilder.group({
        amcProdNo: [this.data.amc_product_id],
        productName: [{ value: this.data.product_name, disabled: this.isDesabled }, [Validators.required]],
        lifeStartDate: [{ value: this.data.life_start_date, disabled: this.isDesabled }, [Validators.required]],
        lifeEndDate: [{ value: this.data.life_end_date, disabled: !this.isDesabled }, [Validators.required]],
        productDescription: [{ value: this.data.product_description, disabled: this.isDesabled }, [Validators.required]],
        price: [{ value: this.data.price, disabled: this.isDesabled }, [Validators.required]],
        quantity: [{ value: this.data.quantity, disabled: this.isDesabled }, [Validators.required]],
        totalValue: [{ value: this.data.sales_revenue, disabled: this.isDesabled }, [Validators.required]],
        totalValueLkr: [{ value: this.data.sales_revenue_lkr, disabled: this.isDesabled }, [Validators.required]],
      }, {
        validator: DateValidator('lifeStartDate', 'lifeEndDate')
      }),
      frequency: [this.data.frequency],
      mtcStartDate: [this.data.mtc_start_date, [Validators.required]],
      mtcEndDate: [this.data.mtc_end_date, [Validators.required]],
      renewalDate: [this.data.renewal, [Validators.required]],
      mtcQty: [this.data.mtc_qty, [Validators.required, Validators.pattern(/^[\d]{1,2}$/)]],
      mtcAmtPerAnnum: [this.data.mtc_amount_for_given_annum, [Validators.required, Validators.pattern(/^[\d]+(\.[\d]{1,2})?$/)]],
      mtcAmtPerAnnumLkr: [this.data.mtc_amount_for_given_annum_lkr, [Validators.required, Validators.pattern(/^[\d]+(\.[\d]{1,2})?$/)]],
      mtcAmtforfrequency: [this.data.mtc_amount_for_given_frequency, [Validators.required, Validators.pattern(/^[\d]+(\.[\d]{1,2})?$/)]],
      mtcAmtforfrequencyLkr: [this.data.mtc_amount_for_given_frequency_lkr, [Validators.required, Validators.pattern(/^[\d]+(\.[\d]{1,2})?$/)]],
      mtcAmtPerProduct: [this.data.mtc_amount_per_product, [Validators.required, Validators.pattern(/^[\d]+(\.[\d]{1,2})?$/)]],
      mtcAmtPerProductLkr: [this.data.mtc_amount_per_product_lkr, [Validators.required, Validators.pattern(/^[\d]+(\.[\d]{1,2})?$/)]],
      mtcAmtforfrequencyPerItem: [this.data.mtc_amount_for_given_frequency_item, [Validators.required, Validators.pattern(/^[\d]+(\.[\d]{1,2})?$/)]],
      mtcAmtforfrequencyPerItemLkr: [this.data.mtc_amount_for_given_frequency_item_lkr, [Validators.required, Validators.pattern(/^[\d]+(\.[\d]{1,2})?$/)]],
      active: [true],
      remark: [this.data.remark, [Validators.required]],
      currency: this.formBuilder.group({
        currencyId: [this.data.currency_id]
      }),
      category: this.formBuilder.group({
        categoryId: [this.data.category_id]
      }),
      clientDepartment: this.formBuilder.group({
        deptId: [this.data.client_dept_id]
      })
    }, {
      validator: [DateValidator('mtcEndDate', 'renewalDate'), DateValidator('mtcStartDate', 'mtcEndDate')]
    });
  }

  private loadData(serialNo: string): void {
    this.amcService.getAmcFullDataByAmSerialcNo(serialNo).subscribe(response => {
      this.data = response;
      this.createForm();
      this.calculateValuByExRate();
      this.isLoadingResults = false;
      this.isRateLimitReached = false;
    }, (error) => {
      this.errorMessage = (error.status === 0 || error.status === 404 || error.status === 403 || error.status === 401) ? error.error : 'Error in loading data';
      this.isLoadingResults = false;
      this.isRateLimitReached = true;
    });
  }

  private loadSelectionData() {
    this.amcService.getFrequency().subscribe(response => {
      this.frequencyList = response;
      this.isLoadingResults = false;
    }, (error) => {
      this.isLoadingResults = false;
      this.isRateLimitReached = true;
      this.errorMessage = (error.status === 0) ? error.error : "Error in loading data";
    });
  }

  private calculateValuByExRate() {
    //calculate mtc amount in lkr for annum, product, frequency in trems of changes in exchange rate
    this.amcService.calculateMtcAmountByExRate(this.amcFullDataForm);
  }

  calculateLkr(event: any): void {
    this.amcService.calculateMtcAmountInLkr(event, this.amcFullDataForm);
  }

  submitForm(): void {
    if (!this.amcFile) {
      this.amcFile = null;
      document.getElementById("invalidScannedCopy").scrollIntoView({behavior: 'smooth'});
      return;
    }
    if (this.amcFullDataForm.valid) {
      this.registerStudentProgress = true;
      const formData = new FormData();
      formData.append("data", JSON.stringify(this.amcFullDataForm.value));
      formData.append("file", this.amcFile);
      this.amcService.renewAmcByClientId(formData, this.data.amc_no, this.data.amc_serial_no).subscribe(response => {
        let navigationExtras: NavigationExtras = {
          queryParams: {
            "data": JSON.stringify({
              "cname": this.clientName,
              "did": this.data.client_dept_id,
              "dname": this.data.department_name
            })
          }
        };
        this.notificationService.showNoitfication(response, 'OK', 'success', () => this.router.navigate([`/clients/depts/${this.data.client_dept_id}/amc-list`], navigationExtras));
      }, error => {
        let message = (error.status === 0 || error.status === 404 || error.status === 501 || error.status === 403 || error.status === 401) ? error.error : 'Cannot proceed the request. Try again'
        this.notificationService.showNoitfication(message, 'OK', 'error', null);
      }).add(() => this.registerStudentProgress = false);
    } else {
      this.scrollToFirstInvalidControl();
    }
  }

  onFileChanged(event: any) {
    this.amcFile = event.target.files[0];
  }

  //scrroll the form to first invalid form ,when it clicks on save button, if any invalid form is there
  scrollToFirstInvalidControl(): void {
    const firstInvalidControl: HTMLElement = this.elementRef.nativeElement.querySelector('form .ng-invalid');
    firstInvalidControl.scrollIntoView({ behavior: 'smooth' });
  }

  get frequency(): AbstractControl {
    return this.amcFullDataForm.get('amcMaster.frequency');
  }
  get exchangeRate(): AbstractControl {
    return this.amcFullDataForm.get('amcMaster.exchangeRate');
  }
  get totalValue(): AbstractControl {
    return this.amcFullDataForm.get('amcMaster.totalValue');
  }
  get totalValueLkr(): AbstractControl {
    return this.amcFullDataForm.get('amcMaster.totalValueLkr');
  }
  get mtcStartDate(): AbstractControl {
    return this.amcFullDataForm.get('mtcStartDate');
  }
  get mtcEndDate(): AbstractControl {
    return this.amcFullDataForm.get('mtcEndDate');
  }
  get renewalDate(): AbstractControl {
    return this.amcFullDataForm.get('renewalDate');
  }
  get mtcQty(): AbstractControl {
    return this.amcFullDataForm.get('mtcQty');
  }
  get mtcAmtPerAnnum(): AbstractControl {
    return this.amcFullDataForm.get('mtcAmtPerAnnum');
  }
  get mtcAmtPerAnnumLkr(): AbstractControl {
    return this.amcFullDataForm.get('mtcAmtPerAnnumLkr');
  }
  get mtcAmtforfrequency(): AbstractControl {
    return this.amcFullDataForm.get('mtcAmtforfrequency');
  }
  get mtcAmtforfrequencyLkr(): AbstractControl {
    return this.amcFullDataForm.get('mtcAmtforfrequencyLkr');
  }
  get mtcAmtPerProduct(): AbstractControl {
    return this.amcFullDataForm.get('mtcAmtPerProduct');
  }
  get mtcAmtPerProductLkr(): AbstractControl {
    return this.amcFullDataForm.get('mtcAmtPerProductLkr');
  }
  get mtcAmtforfrequencyPerItem(): AbstractControl {
    return this.amcFullDataForm.get('mtcAmtforfrequencyPerItem');
  }
  get mtcAmtforfrequencyPerItemLkr(): AbstractControl {
    return this.amcFullDataForm.get('mtcAmtforfrequencyPerItemLkr');
  }
  get remark(): AbstractControl {
    return this.amcFullDataForm.get('remark');
  }
  get lifeEndDate(): AbstractControl {
    return this.amcFullDataForm.get('amcProduct.lifeEndDate');
  }

}
