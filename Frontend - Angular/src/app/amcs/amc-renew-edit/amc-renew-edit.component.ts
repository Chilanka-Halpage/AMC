import { ActivatedRoute } from '@angular/router';
import { AmcMasterService } from 'src/app/shared/amc-master.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AmcData } from 'src/app/Model/amc-data.model';

@Component({
  selector: 'app-amc-renew-edit',
  templateUrl: './amc-renew-edit.component.html',
  styleUrls: ['./amc-renew-edit.component.css']
})
export class AmcRenewEditComponent implements OnInit {

  
  private isDesabled = true;
  private amcFile: File;
  amcFullDataForm: FormGroup;
  clientName: string;
  data: AmcData;
  isLoadingResults = true;
  isRateLimitReached = false;
  errorMessage = "Unknown Error"
  registerStudentProgress = false;
  

  constructor(
    private formBuilder: FormBuilder,
    private amcService: AmcMasterService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      let value = JSON.parse(params["data"]);
      this.clientName = value.cname;
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
        exchangeRate: [{ value: this.data.exchage_rate, disabled: !this.isDesabled }, [Validators.required]],
        totalValue: [{ value: this.data.total_value, disabled: !this.isDesabled }, [Validators.required]],
        totalValueLkr: [{ value: this.data.total_value_lkr, disabled: !this.isDesabled }, [Validators.required]],
        remark: [{ value: this.data.amc_remark, disabled: this.isDesabled }, [Validators.required]],
        invDesc: [{ value: this.data.inv_desc, disabled: this.isDesabled }, [Validators.required]],
        currencyName: [{ value: this.data.currency_name, disabled: this.isDesabled }, [Validators.required]],
        categoryName: [{ value: this.data.category_name, disabled: this.isDesabled }, [Validators.required]]
      }),
      amcProduct: this.formBuilder.group({
        amcProdNo:[this.data.amc_product_id],
        productName: [{ value: this.data.product_name, disabled: this.isDesabled }, [Validators.required]],
        lifeStartDate: [{ value: this.data.life_start_date, disabled: this.isDesabled }, [Validators.required]],
        lifeEndDate: [{ value: this.data.life_end_date, disabled: !this.isDesabled }, [Validators.required]],
        productDescription: [{ value: this.data.product_description, disabled: this.isDesabled }, [Validators.required]],
        price: [{ value: this.data.price, disabled: this.isDesabled }, [Validators.required]],
        quantity: [{ value: this.data.quantity, disabled: this.isDesabled }, [Validators.required]],
        totalValue: [{ value: this.data.sales_revenue, disabled: this.isDesabled }, [Validators.required]],
        totalValueLkr: [{ value: this.data.sales_revenue_lkr, disabled: this.isDesabled }, [Validators.required]],
      }),
        frequency: [this.data.frequency],
        mtcStartDate: [this.data.mtc_start_date, [Validators.required]],
        mtcEndDate: [this.data.mtc_end_date, [Validators.required]],
        renewalDate: [this.data.renewal, [Validators.required]],
        mtcQty: [this.data.mtc_qty, [Validators.required]],
        mtcAmtPerAnnum: [this.data.mtc_amount_for_given_annum, [Validators.required]],
        mtcAmtPerAnnumLkr: [this.data.mtc_amount_for_given_annum_lkr, [Validators.required]],
        mtcAmtforfrequency: [this.data.mtc_amount_for_given_frequency, [Validators.required]],
        mtcAmtforfrequencyLkr: [this.data.mtc_amount_for_given_frequency_lkr, [Validators.required]],
        mtcAmtPerProduct: [this.data.mtc_amount_per_product, [Validators.required]],
        mtcAmtPerProductLkr: [this.data.mtc_amount_per_product_lkr, [Validators.required]],
        mtcAmtforfrequencyPerItem: [this.data.mtc_amount_for_given_frequency_item, [Validators.required]],
        mtcAmtforfrequencyPerItemLkr: [this.data.mtc_amount_for_given_frequency_item_lkr, [Validators.required]],
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
    });
  }

  private loadData(serialNo: string): void {
    this.amcService.getAmcFullDataByAmSerialcNo(serialNo).subscribe(response => {
      this.data = response;
      this.createForm();
      this.calculateValuByExRate();
      this.isLoadingResults = false;
      this.isRateLimitReached = false;
    }, error => {
      this.errorMessage = error.error.message;
      this.isLoadingResults = false;
      this.isRateLimitReached = true;
    });
  }

  private calculateValuByExRate(){
    //calculate mtc amount in lkr for annum, product, frequency in trems of changes in exchange rate
    this.amcService.calculateMtcAmountByExRate(this.amcFullDataForm);
  }

  calculateLkr(event: any): void {
    this.amcService.calculateMtcAmountInLkr(event, this.amcFullDataForm);
   }

  submitForm(): void {
    console.log(this.amcFullDataForm.value);
    this.registerStudentProgress = true;
    const formData = new FormData();
    formData.append("data", JSON.stringify(this.amcFullDataForm.value));
    formData.append("file", this.amcFile);
    this.amcService.renewAmcByClientId(formData, this.data.amc_no).subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error);
    }).add(() => this.registerStudentProgress = false);
  }

  onFileChanged(event: any) {
    this.amcFile = event.target.files[0];
  }

}
