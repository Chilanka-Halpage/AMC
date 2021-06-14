import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PageserviceService {

  private baseURL = environment.baseServiceUrl;

  constructor(private http:HttpClient) { }
  
  sentEmail(email: String): Observable<Object> {
    return this.http.post(`${this.baseURL}User/forgot_password`, email,{responseType : "text" as "json"});
  }


  newPassword(body,token:String): Observable<any> {
    return this.http.post(`${this.baseURL}User/change_password/${token}`, body,{responseType : "text" as "json"});
  }


  

}
