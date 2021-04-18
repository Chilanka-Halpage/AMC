import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FrequencyserviceService {

 
  private baseURL = environment.baseServiceUrl;

  constructor(private http:HttpClient) { }

  getFrequencyList(): Observable<any> {
    return this.http.get(`${this.baseURL}frequency/findAllFrequency`);
  }

  createFrequency(frequency: Object): Observable<Object> {
    return this.http.post(`${this.baseURL}frequency/AddFrequency`, frequency,{responseType : "text" as "json"});
  }

  getFrequency(id: number): Observable<any> {
    return this.http.get(`${this.baseURL}frequency/findFrequency/${id}`);
  }

  updateFrequency(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseURL}frequency/updateFrequency/${id}`, value,{responseType : "text" as "json"});
  }

  deleteFrequency(id: number): Observable<any> {
    return this.http.delete(`${this.baseURL}frequency/deleteFrequency/${id}`, { responseType: 'text' as "json" });
  }
  
  

}
