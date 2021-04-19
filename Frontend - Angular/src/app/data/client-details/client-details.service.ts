import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { from, Observable } from 'rxjs';
import { ClientDetails } from './client-details'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientDetailsService {

  private baseURL =environment.baseServiceUrl;
  constructor( private httpClient: HttpClient ) { }

  ClientDetails(Date1 ,Date2): Observable<ClientDetails>{
    return this.httpClient.get<ClientDetails>(`${this.baseURL}AllClients/${Date1}/${Date2}`);
  }
}
