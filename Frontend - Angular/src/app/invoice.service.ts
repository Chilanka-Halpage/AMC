import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Invoice } from './invoice';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  private baseURL = "http://localhost:8080/invoice";
  private baseURL2 = "http://localhost:8080/invoiceandTax";

  constructor(private HttpClient: HttpClient) { }
  
  getInvoiceList(): Observable<Invoice[]>{
    return this.HttpClient.get<Invoice[]>(`${this.baseURL}/findAllInvoices`);
  }

  createInvoice(invoice: Invoice): Observable<Object>{
    return this.HttpClient.post(`${this.baseURL}/add`,invoice,{responseType : "text" as "json"});
  }
  
  deleteinvoice(pi_no: number): Observable<Object>{
  return this.HttpClient.delete(`${this.baseURL}/deleteinvoice/${pi_no}`,{responseType:'text'});
  }

}  
