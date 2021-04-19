import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductserviceService {

  private baseURL = environment.baseServiceUrl;

  constructor(private http:HttpClient) { }
  getProductList(): Observable<any> {
    return this.http.get(`${this.baseURL}Product/findAllProduct`);
  }

  createProduct(product: Object): Observable<Object> {
    return this.http.post(`${this.baseURL}Product/AddProduct`, product,{responseType : "text" as "json"});
  }
 
  getProduct(id: number): Observable<any> {
    return this.http.get(`${this.baseURL}Product/findAllProduct/${id}`);
  }

  updateProduct(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseURL}Product/updateProduct/${id}`, value,{responseType : "text" as "json"});
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.baseURL}Product/deleteProduct/${id}`, { responseType : "text" as "json"});
  }


}
