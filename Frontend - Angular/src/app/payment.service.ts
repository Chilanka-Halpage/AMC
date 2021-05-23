import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Payment } from './payment';

import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private baseURL = environment.baseServiceUrl;

  constructor(private HttpClient: HttpClient) { }
  
  getPaymetList(): Observable<Payment[]>{
      return this.HttpClient.get<Payment[]>(`${this.baseURL}receipt/findallreceipt`);     
  }
  
  createReceipt(payment): Observable<Object>{
    return this.HttpClient.post(`${this.baseURL}receipt/add`,payment, {responseType : "text" as "json"});
  }

  getactiveCurrency(): Observable<any>{
    return this.HttpClient.get<any>(`${this.baseURL}Currency/findactivecurrencies`);
  }

  getCategory(): Observable<any>{
    return this.HttpClient.get<any>(`${this.baseURL}category/findAllCategory`)
  }

  getActiveInvoices(): Observable<any>{
    return this.HttpClient.get<any>(`${this.baseURL}invoice/activeinvoices`) 
  }

  doesReceiptExists(recNo: string): Observable<boolean> {
    return this.HttpClient.get<boolean>(`${this.baseURL}receipt/exists/${recNo}`);
  }

  getAMcSerialdetails(amcSNo: String): Observable<any> {
    return this.HttpClient.get<any>(`${this.baseURL}amcSerial/get/recietde/${amcSNo}`);
  }
  
  calculateAmcValueByExRate(form: FormGroup) {
    form.get('exchageRate').valueChanges.subscribe((value: number) => {
      const totalLkr = form.get('total').value * value
      form.patchValue({ totalLkr: totalLkr });
    });
    form.get('total').valueChanges.subscribe((value: number) => {
      const totalLkr = form.get('exchageRate').value * value;
      form.patchValue({ totalLkr: totalLkr });
    })
  }
  
   calculatebalance(form: FormGroup) {
    form.get('exchageRate').valueChanges.subscribe((value: number) => {
      const total = form.get('balance').value * value
      form.patchValue({ balanceLkr: total });
    });
    form.get('balance').valueChanges.subscribe((value: number) => {
      const total = form.get('exchageRate').value * value;
      form.patchValue({ balanceLkr: total });
    })
  } 

}
