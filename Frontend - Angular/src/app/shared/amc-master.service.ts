import { RouterTestingModule } from '@angular/router/testing';
import { AmcData } from './../Model/amc-data.model';
import { AmcMaster } from './../Model/amc-master.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { timeout } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AmcMasterService {

  baseURL = "http://localhost:8080/"

  constructor(private http: HttpClient) { }

  calculateMtcAmountInLkr(event: any, form: FormGroup): void {
    const exchangeRate = form.get('amcMaster.exchangeRate').value;
    const valueLkr = event.srcElement.value * exchangeRate;
    const propertyName = event.srcElement.id + 'Lkr';
    form.patchValue({ [propertyName]: valueLkr });
  }

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
    form.get('amcMaster.frequency').valueChanges.subscribe((value: number) => {
      form.patchValue({frequency: value });
    })
  }

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

  saveAmcMaster(amc, clientId: number): Observable<any> {
    return this.http.post(`${this.baseURL}amcMaster/add/${clientId}`, amc);
  }

  saveAmcSerial(amcSerial, amcNo: string): Observable<any> {
    return this.http.post(`${this.baseURL}amcSerial/add/${amcNo}`, amcSerial, {
      responseType: 'text' as 'json'
    });
  }

  getAmcData(amcNo: string): Observable<any> {
    return this.http.get(`${this.baseURL}amcMaster/get/amcs/${amcNo}`);
  }

  getAmcMasterList(clientId: number): Observable<any> {
    return this.http.get(`${this.baseURL}amcMaster/get/clients/${clientId}`).pipe(timeout(5000));
  }

  getAmcSerilaList(deptId: number): Observable<any> {
    return this.http.get(`${this.baseURL}amcSerial/get/clients/depts/${deptId}`);
  }

  getAmcFullDataByAmcNo(amcNo: string): Observable<AmcData> {
    return this.http.get<AmcData>(`${this.baseURL}amcSerial/get/clients/amcs/${amcNo}`);
  }

  getAmcFullDataByAmSerialcNo(amcSerialNo: string): Observable<AmcData> {
    return this.http.get<AmcData>(`${this.baseURL}amcSerial/get/depts/amcs/${amcSerialNo}`);
  }

  getAmcScannedCopy(url: string): Observable<Blob> {
    return this.http.get(url, {
      responseType: 'blob'
    });
  }

  renewAmcByClientId(formData: FormData, amcNo: string): Observable<any> {
    return this.http.post(`${this.baseURL}amcSerial/renew/${amcNo}`, formData, {
      responseType: 'text' as 'json'
    });
  }

  updateAmcMaster(amcMater: any, amcNo: string): Observable<any>{
    return this.http.put(`${this.baseURL}amcMaster/edit/${amcNo}`, amcMater);
  }

}
