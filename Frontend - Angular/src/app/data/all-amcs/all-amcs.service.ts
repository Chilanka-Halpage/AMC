import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { from, Observable } from 'rxjs';
import {AllAmcs} from './all-amcs'
import { AllAmcFilterComponent } from 'src/app/Filters/all-amc-filter/all-amc-filter.component';

@Injectable({
  providedIn: 'root'
})
export class AllAmcsService {
  private baseURL ="http://localhost:8080/AllAmcs";
  constructor( private httpClient: HttpClient ) { }
  
  getAllAmcs(Date1 ,Date2): Observable<AllAmcs>{
    return this.httpClient.get<AllAmcs>(`${this.baseURL}/${Date1}/${Date2}`);
  }
  AllAmcs(): Observable<AllAmcs[]>{
    return this.httpClient.get<AllAmcs[]>(`${this.baseURL}`);
  }
}
