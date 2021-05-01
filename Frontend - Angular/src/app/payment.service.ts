import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Payment } from './payment';

import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

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

}
