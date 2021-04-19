
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DuePayment } from './due-payment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DuePaymentService {

  constructor(private HttpClient: HttpClient) { }

  private baseURL = "Http://localhost:8080";

  getDuepaymentList(): Observable<any>{
    return this.HttpClient.get<any>(`${this.baseURL}/amcDueInvoice/AllDueInvoice`);
  }
  deletedueinvoice(id: number): Observable<Object>{
    return this.HttpClient.delete(`${this.baseURL}/amcDueInvoice/deletedueinvoice/${id}`,{responseType:'text'})
  } 
  createdueinvoice(duePayment): Observable<Object>{
    return this.HttpClient.post(`${this.baseURL}/amcDueInvoice/add`,duePayment,{responseType : "text" as "json"});
  }
  updatedueinvoice(id: number, duePayment): Observable<Object>{
    return this.HttpClient.put(`${this.baseURL}/amcDueInvoice/editdueinvoice/${id}`,duePayment,{responseType : "text" as "json"})
  }
   getdueinvoicebyid(id: number): Observable<any>{
     return this.HttpClient.get<any>(`${this.baseURL}/amcDueInvoice/finddueinvoice/${id}`)
  }
  getsettleddetails(): Observable<any>{
    return this.HttpClient.get<any>(`${this.baseURL}/amcDueInvoice/settled`)
  }
  getProduct(): Observable<any>{
    return this.HttpClient.get<any>(`${this.baseURL}/Product/findAllProduct`);
  }
  getactiveCurrency(): Observable<any>{
    return this.HttpClient.get<any>(`${this.baseURL}/Currency/findactivecurrencies`);
  }

  }