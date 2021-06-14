import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryserviceService {

  private baseURL = environment.baseServiceUrl;

  constructor(private http:HttpClient) { }

  getCategoryList(): Observable<any> {
    return this.http.get(`${this.baseURL}category/findAllCategory`);
  }

  createCategory(category: Object): Observable<Object> {
    return this.http.post(`${this.baseURL}category/AddCategory`, category,{responseType : "text" as "json"});
  }

  getCategory(id: number): Observable<any> {
    return this.http.get(`${this.baseURL}category/findAllCategory/${id}`);
  }

  updateCategory(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseURL}category/UpdateCategory/${id}`, value,{responseType : "text" as "json"});
  }

  deleteCategory(id: number): Observable<any> {
    return this.http.delete(`${this.baseURL}category/deleteCategory/${id}`, { responseType: 'text' });
  }
  doesCategoryExists(categoryName: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseURL}category/exists/${categoryName}`);
  }
  

}
