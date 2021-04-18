import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductserviceService {

  private baseURL='http://localhost:8086/Product/';

  constructor(private http:HttpClient) { }
  getProductList(): Observable<any> {
    return this.http.get(`${this.baseURL}findAllProduct`);
  }

  createProduct(product: Object): Observable<Object> {
    return this.http.post(`${this.baseURL}AddProduct`, product,{responseType : "text" as "json"});
  }
 
  getProduct(id: number): Observable<any> {
    return this.http.get(`${this.baseURL}findAllProduct/${id}`);
  }

  updateProduct(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseURL}updateProduct/${id}`, value,{responseType : "text" as "json"});
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.baseURL}deleteProduct/${id}`, { responseType : "text" as "json"});
  }


}
