import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class HomedetailsService {

  private baseURL = "http://localhost:8080/"

  constructor(private HttpClient: HttpClient) { }

  getActiveClient(): Observable<any>{
    return this.HttpClient.get<any>(`${this.baseURL}client/activeclient`,{responseType : 'text' as 'json'});
  }

  getActiveAmcCount(): Observable<any>{
    return this.HttpClient.get<any>(`${this.baseURL}amcMaster/activeAmcCount`,{responseType : 'text' as 'json'})
  }

  getTotalAmc(): Observable<any>{
    return this.HttpClient.get<any>(`${this.baseURL}amcMaster/totalAmc`,{responseType : 'text' as 'json'})
  }

  getInactiveAmcCount(): Observable<any>{
    return this.HttpClient.get<any>(`${this.baseURL}amcMaster/inactiveAmcCount`,{responseType : 'text' as 'json'})
  }

  Amcreminders(Date1 ,Date2): Observable<any>{
    return this.HttpClient.get<any>(`${this.baseURL}AmcReminders/${Date1}/${Date2}`);
  }

  RenewedAmcscount(Date1 ,Date2): Observable<any>{
    return this.HttpClient.get<any>(`${this.baseURL}RenewedAmccount/${Date1}/${Date2}`,{responseType : 'text' as 'json'});
  }
 
 expiredamcCount(Date1 ,Date2): Observable<any>{
  return this.HttpClient.get<any>(`${this.baseURL}ExpiredAmcscount/${Date1}/${Date2}`,{responseType : 'text' as 'json'});
 }

 lastyearrevanue(Date1 ,Date2): Observable<any>{
  return this.HttpClient.get<any>(`${this.baseURL}receipt/lastyearrevanue/${Date1}/${Date2}`,{responseType : 'text' as 'json'});
 }

 last2yearrevanue(Date1 ,Date2): Observable<any>{
  return this.HttpClient.get<any>(`${this.baseURL}receipt/last2yearrevanue/${Date1}/${Date2}`,{responseType : 'text' as 'json'});
 }

 last3yearrevanue(Date1 ,Date2): Observable<any>{
  return this.HttpClient.get<any>(`${this.baseURL}receipt/last3yearrevanue/${Date1}/${Date2}`,{responseType : 'text' as 'json'});
 }

 last4yearrevanue(Date1 ,Date2): Observable<any>{
  return this.HttpClient.get<any>(`${this.baseURL}receipt/last4yearrevanue/${Date1}/${Date2}`,{responseType : 'text' as 'json'});
 }
  
 last5yearrevanue(Date1 ,Date2): Observable<any>{
  return this.HttpClient.get<any>(`${this.baseURL}receipt/last5yearrevanue/${Date1}/${Date2}`,{responseType : 'text' as 'json'});
 }

 getclienthome(): Observable<any>{
  return this.HttpClient.get<any>(`${this.baseURL}lastyearrevanue`,{responseType : 'text' as 'json'});
 }
 
}
