import { AmcMaster } from './../Model/amc-master.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AmcMasterService {

  baseURL = "http://localhost:8080/"

  constructor(private http: HttpClient) { }

  saveAmcMaster(amc, clientId: number): Observable<any>{
    return this.http.post(`${this.baseURL}amcMaster/add/${clientId}`, amc);
  }

}
