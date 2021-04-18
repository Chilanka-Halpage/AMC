import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FrequencyserviceService {

 

  private baseURL='http://localhost:8086/frequency/';

  constructor(private http:HttpClient) { }

  getFrequencyList(): Observable<any> {
    return this.http.get(`${this.baseURL}findAllFrequency`);
  }

  createFrequency(frequency: Object): Observable<Object> {
    return this.http.post(`${this.baseURL}AddFrequency`, frequency,{responseType : "text" as "json"});
  }

  getFrequency(id: number): Observable<any> {
    return this.http.get(`${this.baseURL}findFrequency/${id}`);
  }

  updateFrequency(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseURL}updateFrequency/${id}`, value,{responseType : "text" as "json"});
  }

  deleteFrequency(id: number): Observable<any> {
    return this.http.delete(`${this.baseURL}deleteFrequency/${id}`, { responseType: 'text' as "json" });
  }
  
  

}
