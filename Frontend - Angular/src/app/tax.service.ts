import { Tax } from './tax';
import { HttpClient, } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaxService {
  
  private baseURL = environment.baseServiceUrl;

  constructor(private HttpClient: HttpClient ) { }

  getTaxList(): Observable<Tax[]>{
    return this.HttpClient.get<Tax[]>(`${this.baseURL}tax/findalltaxes`);
  }
  createTax(tax: Tax): Observable<Object>{
    return this.HttpClient.post(`${this.baseURL}tax/add`,tax);
  }

  deleteTax(taxId: number): Observable<Object>{
    return this.HttpClient.delete(`${this.baseURL}tax/deleteTax/${taxId}`,{responseType:'text'});
  }  

  getTaxbyId(taxId: number): Observable<Tax>{
    return this.HttpClient.get<Tax>(`${this.baseURL}tax/findTax/${taxId}`)
  }

  updatetax(taxId: number, tax: Tax): Observable<Object>{
   return this.HttpClient.put(`${this.baseURL}tax/updateTax/${taxId}`,tax)
  }

  doesTaxExists(name: string): Observable<boolean> {
    return this.HttpClient.get<boolean>(`${this.baseURL}tax/exists/${name}`);
  }
}
