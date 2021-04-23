import { AmcData } from './../Model/amc-data.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { timeout } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';
import { Currency } from '../Model/currency.model';
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
    const valueLkr = event.srcElement.value * exchangeRate;
    const propertyName = event.srcElement.id + 'Lkr';
    form.patchValue({ [propertyName]: valueLkr });
  }

  //calculate maintenace values, total amc value in LKR and set those to relevant field. And set frequency to amc serial, as frequncy changes in amc master 
  calculateMtcAmountByExRate(form: FormGroup) {
    form.get('amcMaster.exchangeRate').valueChanges.subscribe((value: number) => {
      const mtcAmtPerAnnumLkr = form.get('mtcAmtPerAnnum').value * value;
      const mtcAmtPerProductLkr = form.get('mtcAmtPerProduct').value * value;
      const mtcAmtforfrequencyLkr = form.get('mtcAmtforfrequency').value * value;
      const mtcAmtforfrequencyPerItemLkr = form.get('mtcAmtforfrequencyPerItem').value * value;
      const totalValueLkr = form.get('amcMaster.totalValue').value * value;
      form.patchValue({
        mtcAmtPerAnnumLkr: mtcAmtPerAnnumLkr,
        mtcAmtPerProductLkr: mtcAmtPerProductLkr,
        mtcAmtforfrequencyLkr: mtcAmtforfrequencyLkr,
        mtcAmtforfrequencyPerItemLkr: mtcAmtforfrequencyPerItemLkr,
        amcMaster: { totalValueLkr: totalValueLkr }
      });
    });
    form.get('amcMaster.totalValue').valueChanges.subscribe((value: number) => {
      const totalValueLkr = form.get('amcMaster.exchangeRate').value * value;
      form.patchValue({
        amcMaster: { totalValueLkr: totalValueLkr }
      });
    })
    form.get('amcMaster.frequency').valueChanges.subscribe((value: string) => {
      form.patchValue({frequency: value });
    })
  }

  //calclulate sales revenue (Total Value of amc product details) in given currency and in LKR, when product price and quantity change
  calculateTotalByPriceAndQuantity(form: FormGroup) {
    form.get('amcProduct.price').valueChanges.subscribe((value: number) => {
      const totalValue = form.get('amcProduct.quantity').value * value;
      const exchangeRate = form.get('amcMaster.exchangeRate').value;
      const totalValueLkr = totalValue * exchangeRate;
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
      const totalValueLkr = totalValue * exchangeRate;
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
      const totalValueLkr = form.get('totalValue').value * value
      form.patchValue({ totalValueLkr: totalValueLkr });
    });
    form.get('totalValue').valueChanges.subscribe((value: number) => {
      const totalValueLkr = form.get('exchangeRate').value * value;
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
  updateAmcMaster(amcMater: any, amcNo: string, amcSerialNo: String): Observable<any>{
    return this.http.put(`${this.baseURL}amcMaster/edit/${amcNo}/${amcSerialNo}`, amcMater, {
      responseType: 'text' as 'json'
    });
  }

  getAmcHistoryData(amcNo: string): Observable<any>{
    return this.http.get(`${this.baseURL}amcHistory/all/${amcNo}`);
  }
  
  getCategory(): Observable<any>{
    return this.http.get<any>(`${this.baseURL}category/findAllCategory`)
  }
  getFrequency(): Observable<Frequency[]>{
    return this.http.get<Frequency[]>(`${this.baseURL}frequency/findAllFrequency`);
  }
  getProduct(): Observable<any>{
    return this.http.get<any>(`${this.baseURL}Product/findAllProduct`);
  }

}
