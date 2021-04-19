import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginDetails } from '../data/loginDetails/login-details'

@Injectable({
  providedIn: 'root'
})
export class LoginDetailsService {

  private baseURL =environment.baseServiceUrl;
  constructor( private httpClient: HttpClient ) { }

  getLoginDetails(): Observable<LoginDetails>{
    return this.httpClient.get<LoginDetails>(`${this.baseURL}User/loginDetails`);
  }
}
