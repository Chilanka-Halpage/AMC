
import { HttpClient, } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Currency } from './Model/currency.model';



@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  private baseURL = "http://localhost:8080/Currency";

  constructor(private HttpClient: HttpClient  ) { }

  getCurrencyList(): Observable<Currency[]>{
    return this.HttpClient.get<Currency[]>(`${this.baseURL}/findAllCurrency`);
  }
  deleteCurrency(currencyId: number): Observable<Object>{
    return this.HttpClient.delete(`${this.baseURL}/deleteCurrency/${currencyId}`,{responseType:'text'});
  }  
  createCurrency(currency: Currency): Observable<Object>{
    return this.HttpClient.post(`${this.baseURL}/add`,currency);
  }

}
