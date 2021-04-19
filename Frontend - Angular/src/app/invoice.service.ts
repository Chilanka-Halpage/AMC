import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Invoice } from './invoice';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  private baseURL = "http://localhost:8080/";

  constructor(private HttpClient: HttpClient) { }
  
  getInvoiceList(): Observable<Invoice[]>{
    return this.HttpClient.get<Invoice[]>(`${this.baseURL}invoice/findAllInvoices`);
  }

  createInvoice(invoice: Invoice): Observable<Object>{
    return this.HttpClient.post(`${this.baseURL}invoice/add`,invoice,{responseType : "text" as "json"});
  }
  
  deleteinvoice(pi_no: number): Observable<Object>{
  return this.HttpClient.delete(`${this.baseURL}invoice/deleteinvoice/${pi_no}`,{responseType:'text'});
  }

  getactiveCurrency(): Observable<any>{
    return this.HttpClient.get<any>(`${this.baseURL}Currency/findactivecurrencies`);
  }
  getCategory(): Observable<any>{
    return this.HttpClient.get<any>(`${this.baseURL}category/findAllCategory`)
  }
  getFrequency(): Observable<any>{
    return this.HttpClient.get<any>(`${this.baseURL}frequency/findActiveFrequency`)
  }

}  
