
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DuePayment } from './due-payment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DuePaymentService {

  constructor(private HttpClient: HttpClient) { }

  private baseURL = "Http://localhost:8080/amcDueInvoice";

  getDuepaymentList(): Observable<DuePayment[]>{
    return this.HttpClient.get<DuePayment[]>(`${this.baseURL}/AllDueInvoice`);
  }
  deletedueinvooice(id: number): Observable<Object>{
    return this.HttpClient.delete(`${this.baseURL}/deletedueinvoice/${id}`,{responseType:'text'})
  } 
  createdueinvoice(duePayment: DuePayment): Observable<Object>{
    return this.HttpClient.post(`${this.baseURL}/add`,duePayment,{responseType : "text" as "json"});
  }
  updatedueinvoice(id: number, duePayment): Observable<Object>{
    return this.HttpClient.put(`${this.baseURL}/editdueinvoice/${id}`,duePayment,{responseType : "text" as "json"})
   }
   getdueinvoicebyid(id: number): Observable<any>{
     return this.HttpClient.get<DuePayment>(`${this.baseURL}/finddueinvoice/${id}`)
   }
}