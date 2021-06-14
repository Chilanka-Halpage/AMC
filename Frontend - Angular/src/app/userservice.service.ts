import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './Model/user.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserserviceService {
  
  private baseURL = environment.baseServiceUrl;
  

  constructor(private http:HttpClient) { }
  getUserList(): Observable<any> {
    return this.http.get<User[]>(`${this.baseURL}User/admin/findAllUser`);
  }

  createUser(user: Object): Observable<Object> {
    return this.http.post(`${this.baseURL}User/admin/AddUser`, user,{responseType : "text" as "json"});
  }
 
  getUser(id: number): Observable<any> {
    return this.http.get(`${this.baseURL}User/admin/findUser/${id}`);
  }

  updateUser(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseURL}User/admin/updateUser/${id}`, value,{responseType : "text" as "json"});
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.baseURL}User/admin/deleteUser/${id}`, { responseType: 'text' });
  }

  


}
