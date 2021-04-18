import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryserviceService {

  private baseURL='http://localhost:8086/category/';

  constructor(private http:HttpClient) { }

  getCategoryList(): Observable<any> {
    return this.http.get(`${this.baseURL}findAllCategory`);
  }

  createCategory(category: Object): Observable<Object> {
    return this.http.post(`${this.baseURL}AddCategory`, category,{responseType : "text" as "json"});
  }

  getCategory(id: number): Observable<any> {
    return this.http.get(`${this.baseURL}findAllCategory/${id}`);
  }

  updateCategory(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseURL}UpdateCategory/${id}`, value,{responseType : "text" as "json"});
  }

  deleteCategory(id: number): Observable<any> {
    return this.http.delete(`${this.baseURL}deleteCategory/${id}`, { responseType: 'text' });
  }
  
  

}
