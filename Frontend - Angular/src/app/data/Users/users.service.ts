import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { from, Observable } from 'rxjs';
import {Users} from './users'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private baseURL =environment.baseServiceUrl;
  constructor( private httpClient: HttpClient ) { }
  

  getAllUsers(): Observable<Users[]>{
    return this.httpClient.get<Users[]>(`${this.baseURL}User/allusers`);
  }
  getUsersById(userId : String): Observable<Users>{
    return this.httpClient.get<Users>(`${this.baseURL}User/allusers/${userId}`);
  }
  updateUser(userId : String, value:any): Observable<object>{
    return this.httpClient.put(`${this.baseURL}User/update/${userId}`,value, {
      responseType: 'text' as 'json'
    });
  }
  updatePassword(userId : String, current_password : String, value:any): Observable<boolean>{
    return this.httpClient.put<boolean>(`${this.baseURL}User/updatePassword/${current_password}/${userId}`,value
    );
  }
}

