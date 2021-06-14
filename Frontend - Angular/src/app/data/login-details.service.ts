import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { LoginDetails } from '../data/loginDetails/login-details'
import { AuthenticationService } from '../_helpers/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class LoginDetailsService {

  private baseURL =environment.baseServiceUrl;
  constructor( 
    private httpClient: HttpClient,
    public _authentication: AuthenticationService,
    ) { }

  getLoginDetails(page: number, size: number, sort: string, ord: string): Observable<LoginDetails[]>{
    return this.httpClient.get<LoginDetails[]>(`${this.baseURL}User/loginDetails?page=${page}&size=${size}&sort=${sort},${ord}`);
  }

  logoutDetails(): Observable<object>{
    let userId = this._authentication.userId;
    this._authentication.logoutUser();
    console.log(userId);
    return this.httpClient.put(`${this.baseURL}User/logoutDetails/${userId}`,null);
  }
}