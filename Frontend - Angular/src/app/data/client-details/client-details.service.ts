import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { from, Observable } from 'rxjs';
import { ClientDetails } from './client-details'

@Injectable({
  providedIn: 'root'
})
export class ClientDetailsService {

  private baseURL ="http://localhost:8080/AllClients";
  constructor( private httpClient: HttpClient ) { }

  ClientDetails(Date1 ,Date2): Observable<ClientDetails>{
    return this.httpClient.get<ClientDetails>(`${this.baseURL}/${Date1}/${Date2}`);
  }
}
