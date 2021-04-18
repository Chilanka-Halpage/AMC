import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PageserviceService {

  private baseURL='http://localhost:8086/User/';

  constructor(private http:HttpClient) { }
  
  sentEmail(email: String): Observable<Object> {
    return this.http.post(`${this.baseURL}forgot_password`, email,{responseType : "text" as "json"});
  }

  // resetPassword():Observable<any>{
  //   return this.http.get(`${this.baseURL}reset_password`);
  // }


  newPassword(body,token:String): Observable<any> {
    return this.http.post(`${this.baseURL}change_password/${token}`, body,{responseType : "text" as "json"});
  }

  // ValidPasswordToken(body): Observable<any> {
  //   return this.http.post(`${this.baseURL}valid-password-token`, body);
  // }

  

}
