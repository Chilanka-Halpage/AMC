import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { from, Observable } from 'rxjs';
import {AllAmcs} from './all-amcs'
import { AllAmcFilterComponent } from 'src/app/Filters/all-amc-filter/all-amc-filter.component';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AllAmcsService {
  private baseURL =environment.baseServiceUrl;
  constructor( private httpClient: HttpClient ) { }
  
  getAllAmcs(Date1 ,Date2): Observable<AllAmcs>{
    return this.httpClient.get<AllAmcs>(`${this.baseURL}AllAmcs/${Date1}/${Date2}`);
  }
  AllAmcs(): Observable<AllAmcs[]>{
    return this.httpClient.get<AllAmcs[]>(`${this.baseURL}AllAmcs`);
  }
}
