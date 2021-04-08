import { Tax } from './tax';
import { HttpClient, } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaxService {
  private baseURL = "http://localhost:8080/tax";

  constructor(private HttpClient: HttpClient ) { }

  getTaxList(): Observable<Tax[]>{
    return this.HttpClient.get<Tax[]>(`${this.baseURL}/findalltaxes`);
  }
  createTax(tax: Tax): Observable<Object>{
    return this.HttpClient.post(`${this.baseURL}/add`,tax);
  }

  deleteTax(taxId: number): Observable<Object>{
    return this.HttpClient.delete(`${this.baseURL}/deleteTax/${taxId}`,{responseType:'text'});
  }  

  getTaxbyId(taxId: number): Observable<Tax>{
    return this.HttpClient.get<Tax>(`${this.baseURL}/findTax/${taxId}`)
  }

  updatetax(taxId: number, tax: Tax): Observable<Object>{
   return this.HttpClient.put(`${this.baseURL}/updateTax/${taxId}`,tax)
  }
}
