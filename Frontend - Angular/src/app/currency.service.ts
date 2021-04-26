
import { HttpClient, } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Currency } from './Model/currency.model';



@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  private baseURL = environment.baseServiceUrl;

  constructor(private HttpClient: HttpClient  ) { }

  getCurrencyList(): Observable<Currency[]>{
    return this.HttpClient.get<Currency[]>(`${this.baseURL}Currency/findAllCurrency`);
  }
  deleteCurrency(currencyId: number): Observable<Object>{
    return this.HttpClient.delete(`${this.baseURL}Currency/deleteCurrency/${currencyId}`,{responseType:'text'});
  }  
  createCurrency(currency): Observable<Object>{
    return this.HttpClient.post(`${this.baseURL}Currency/add`,currency);
  }
  getactiveCurrency(): Observable<Currency[]>{
    return this.HttpClient.get<Currency[]>(`${this.baseURL}Currency/findactivecurrencies`);
  }
  doesCurrencyExists(currencyName: string): Observable<boolean> {
    return this.HttpClient.get<boolean>(`${this.baseURL}Currency/exists/${currencyName}`);
  }
}
