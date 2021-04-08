import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { from, Observable } from 'rxjs';
import {Users} from './users'

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private baseURL ="http://localhost:8080/allusers";
  private baseURL1="http://localhost:8080";
  constructor( private httpClient: HttpClient ) { }
  
  getAllUsers(): Observable<Users[]>{
    return this.httpClient.get<Users[]>(`${this.baseURL}`);
  }
  getUsersById(userId : String): Observable<Users>{
    return this.httpClient.get<Users>(`${this.baseURL}/${userId}`);
  }
  updateUser(userId : String, value:any): Observable<object>{
    return this.httpClient.put(`${this.baseURL1}/update/${userId}`,value);
  }
  updatePassword(userId : String, value:any): Observable<object>{
    return this.httpClient.put(`${this.baseURL1}/updatePassword/${userId}`,value);
  }
}

