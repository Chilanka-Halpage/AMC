import { AmcData } from './../Model/amc-data.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { timeout } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';
import { Frequency } from '../Model/frequency';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AmcMasterService {

  private baseURL = environment.baseServiceUrl;

  constructor(private http: HttpClient) { }

  //calculate maintenace value in LKR and set to relevant form field
  calculateMtcAmountInLkr(event: any, form: FormGroup): void {
    const exchangeRate = form.get('amcMaster.exchangeRate').value;
    const valueLkr = Math.round(event.srcElement.value * exchangeRate * 100) / 100;
    const propertyName = event.srcElement.id + 'Lkr';
    form.patchValue({ [propertyName]: valueLkr });
  }

  //calculate maintenace values, total amc value in LKR and set those to relevant field. And set frequency to amc serial, as frequncy changes in amc master 
  calculateMtcAmountByExRate(form: FormGroup) {
    form.get('amcMaster.exchangeRate').valueChanges.subscribe((value: number) => {
      const mtcAmtPerAnnumLkr = Math.round(form.get('mtcAmtPerAnnum').value * value * 100) / 100;
      const mtcAmtPerProductLkr = Math.round(form.get('mtcAmtPerProduct').value * value * 100) / 100;
      const mtcAmtforfrequencyLkr = Math.round(form.get('mtcAmtforfrequency').value * value * 100) / 100;
      const mtcAmtforfrequencyPerItemLkr = Math.round(form.get('mtcAmtforfrequencyPerItem').value * value * 100) / 100;
      const totalValueLkr = Math.round(form.get('amcMaster.totalValue').value * value * 100) / 100;
      form.patchValue({
        mtcAmtPerAnnumLkr: mtcAmtPerAnnumLkr,
        mtcAmtPerProductLkr: mtcAmtPerProductLkr,
        mtcAmtforfrequencyLkr: mtcAmtforfrequencyLkr,
        mtcAmtforfrequencyPerItemLkr: mtcAmtforfrequencyPerItemLkr,
        amcMaster: { totalValueLkr: totalValueLkr }
      });
    });
    form.get('amcMaster.totalValue').valueChanges.subscribe((value: number) => {
      const totalValueLkr = Math.round(form.get('amcMaster.exchangeRate').value * value * 100) / 100;
      form.patchValue({
        amcMaster: { totalValueLkr: totalValueLkr }
      });
    })
    form.get('amcMaster.frequency').valueChanges.subscribe((value: string) => {
      form.patchValue({ frequency: value });
    })
  }

  //calclulate sales revenue (Total Value of amc product details) in given currency and in LKR, when product price and quantity change
  calculateTotalByPriceAndQuantity(form: FormGroup) {
    form.get('amcProduct.price').valueChanges.subscribe((value: number) => {
      const totalValue = form.get('amcProduct.quantity').value * value;
      const exchangeRate = form.get('amcMaster.exchangeRate').value;
      const totalValueLkr = Math.round(totalValue * exchangeRate * 100) / 100;
      form.patchValue({
        amcProduct: {
          totalValue: totalValue,
          totalValueLkr: totalValueLkr
        }
      });
    })
    form.get('amcProduct.quantity').valueChanges.subscribe((value: number) => {
      const totalValue = form.get('amcProduct.price').value * value;
      const exchangeRate = form.get('amcMaster.exchangeRate').value;
      const totalValueLkr = Math.round(totalValue * exchangeRate * 100) / 100;
      form.patchValue({
        amcProduct: {
          totalValue: totalValue,
          totalValueLkr: totalValueLkr
        }
      });
    })
  }

  //when exchangeRate and totalValue fields values change, totalValueLkr is calculated and set to form field accordingly
  calculateAmcValueByExRate(form: FormGroup) {
    form.get('exchangeRate').valueChanges.subscribe((value: number) => {
      const totalValueLkr = Math.round(form.get('totalValue').value * value * 100) / 100;
      form.patchValue({ totalValueLkr: totalValueLkr });
    });
    form.get('totalValue').valueChanges.subscribe((value: number) => {
      const totalValueLkr = Math.round(form.get('exchangeRate').value * value * 100) / 100;
      form.patchValue({ totalValueLkr: totalValueLkr });
    })
  }

  //Send new Amc master data to backend
  saveAmcMaster(amc: any, clientId: number): Observable<any> {
    return this.http.post(`${this.baseURL}amcMaster/add/${clientId}`, amc, {
      responseType: 'text' as 'json'
    });
  }

  //Send new Amc serial data to backend
  saveAmcSerial(amcSerial, amcNo: string): Observable<any> {
    return this.http.post(`${this.baseURL}amcSerial/add/${amcNo}`, amcSerial, {
      responseType: 'text' as 'json'
    });
  }

  //Get AMC data fully from backend
  getAmcData(amcNo: string): Observable<any> {
    return this.http.get(`${this.baseURL}amcMaster/get/amcs/${amcNo}`);
  }

  //Get AMC master data
  getAmcMasterList(clientId: number): Observable<any> {
    return this.http.get(`${this.baseURL}amcMaster/get/clients/${clientId}`).pipe(timeout(5000));
  }

  //Get AMC master data related to a client
  getAmcMasterListForClient(userId: string): Observable<any> {
    return this.http.get(`${this.baseURL}amcMaster/get/client/${userId}`).pipe(timeout(5000));
  }

  //Get AMC serial data
  getAmcSerilaList(deptId: number): Observable<any> {
    return this.http.get(`${this.baseURL}amcSerial/get/clients/depts/${deptId}`);
  }

  //Get AMC data from backend by amcNo 
  getAmcFullDataByAmcNo(amcNo: string): Observable<AmcData> {
    return this.http.get<AmcData>(`${this.baseURL}amcSerial/get/clients/amcs/${amcNo}`);
  }

  //Get AMC data from backend by amcSerialNo 
  getAmcFullDataByAmSerialcNo(amcSerialNo: string): Observable<AmcData> {
    return this.http.get<AmcData>(`${this.baseURL}amcSerial/get/depts/amcs/${amcSerialNo}`);
  }

  //Get uploaded contract copy
  getAmcScannedCopy(url: string): Observable<Blob> {
    return this.http.get(url, {
      responseType: 'blob'
    });
  }

  //Send renewed data to the beckend
  renewAmcByClientId(formData: FormData, amcNo: string, amcSerialNo: string): Observable<any> {
    return this.http.post(`${this.baseURL}amcSerial/renew/${amcNo}/${amcSerialNo}`, formData, {
      responseType: 'text' as 'json'
    });
  }

  //Send updated data to the backend
  updateAmcMaster(amcMater: any, amcNo: string, amcSerialNo: String): Observable<any> {
    return this.http.put(`${this.baseURL}amcMaster/edit/${amcNo}/${amcSerialNo}`, amcMater, {
      responseType: 'text' as 'json'
    });
  }

  getAmcHistoryData(amcNo: string): Observable<any> {
    return this.http.get(`${this.baseURL}amcHistory/all/${amcNo}`);
  }

  getCategory(): Observable<any> {
    return this.http.get<any>(`${this.baseURL}category/findActiveCategoy`)
  }
  getFrequency(): Observable<Frequency[]> {
    return this.http.get<Frequency[]>(`${this.baseURL}frequency/findActiveFrequency`);
  }
  getProduct(): Observable<any> {
    return this.http.get<any>(`${this.baseURL}Product/findActiveProduct`);
  }

}

export function DateValidator(controlName1: string, controlName2: string) {
  return (formGroup: FormGroup) => {
    const formControl1 = formGroup.controls[controlName1];
    const formControl2 = formGroup.controls[controlName2];

    if (!formControl1.value || !formControl2.value) return;

    const formControl1Value = new Date(formControl1.value);
    const formControl2Value = new Date(formControl2.value);

    if (formControl1Value > formControl2Value) {
      formControl1.setErrors({ invalidDate: true });
      formControl2.setErrors({ invalidDate: true });
    } else {
      (formControl1.errors?.required) ? formControl1.setErrors({ invalidDate: false }) : formControl1.setErrors(null);
      (formControl2.errors?.required) ? formControl2.setErrors({ invalidDate: false }) : formControl2.setErrors(null);
    }
  }
}
