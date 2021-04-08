import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserserviceService {

  private baseURL='http://localhost:8086/User';

  constructor(private http:HttpClient) { }
  getUserList(): Observable<any> {
    return this.http.get(`${this.baseURL}/findAllUser`);
  }

  createUser(user: Object): Observable<Object> {
    return this.http.post(`${this.baseURL}/AddUser`, user);
  }
 
  getUser(id: number): Observable<any> {
    return this.http.get(`${this.baseURL}/findUser/${id}`);
  }

  updateUser(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseURL}/updateUser/${id}`, value);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.baseURL}/deleteUser/${id}`, { responseType: 'text' });
  }

  sentEmail(user: Object): Observable<Object> {
    return this.http.post(`${this.baseURL}/AddUser`, user);
  }


}
