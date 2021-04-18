import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginDetails } from '../data/loginDetails/login-details'

@Injectable({
  providedIn: 'root'
})
export class LoginDetailsService {

  private baseURL ="http://localhost:8080";
  constructor( private httpClient: HttpClient ) { }

  getLoginDetails(): Observable<LoginDetails>{
    return this.httpClient.get<LoginDetails>(`${this.baseURL}/User/loginDetails`);
  }
}
