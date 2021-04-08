import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Payment } from './payment';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private baseURL = "Http://localhost:8080/receipt";

  constructor(private HttpClient: HttpClient) { }
  
  getPaymetList(): Observable<Payment[]>{
      return this.HttpClient.get<Payment[]>(`${this.baseURL}/findallreceipt`);     
  }
  
  createReceipt(payment): Observable<Object>{
    return this.HttpClient.post(`${this.baseURL}/add`,payment, {responseType : "text" as "json"});
  }
}