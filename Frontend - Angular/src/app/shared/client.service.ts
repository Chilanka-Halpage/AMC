import { environment } from './../../environments/environment';
import { Client } from './../Model/client.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';



@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private baseURL = environment.baseServiceUrl;

  constructor(
    private http: HttpClient,
    public snackBar: MatSnackBar
  ) { }

  //call to backend to get all clients entities
  getAllClients(page: number, size: number, sort: string, ord: string): Observable<Client[]> {
    return this.http.get<Client[]>(`${this.baseURL}client/allclients?page=${page}&size=${size}&sort=${sort},${ord}`);
  }

  //call to backend to get a client entity by client id
  getClientByClientId(cid: number): Observable<Client> {
    return this.http.get<Client>(`${this.baseURL}client/${cid}`);
  }

  //send client and departmet data to backend
  saveClientAndDepartment(obj: any): Observable<any> {
    return this.http.post(`${this.baseURL}clientDept/departments/client`, obj);
  }

  //Send Department data to create new department entity for givebn client
  saveDepartmentByClientId(cid: number, dept): Observable<any> {
    return this.http.post(`${this.baseURL}clientDept/clients/${cid}/department`, dept, {
      responseType: 'text' as 'json'
    }
    );
  }

  //call to backend to get department entitis for given client
  getDepartmentsByClientId(cid: number): Observable<any> {
    return this.http.get(`${this.baseURL}clientDept/clients/${cid}/departments`);
  }

  getDepartmentsByUserId(userId: string): Observable<any> {
    return this.http.get(`${this.baseURL}clientDept/client/${userId}/departments`);
  }

  //Send client edited data to update client entity
  updateClient(client: any): Observable<any> {
    return this.http.put(`${this.baseURL}client/edit`, client, {
      responseType: 'text' as 'json'
    }
    );
  }

  //Send department edited data to update department entity
  updateDepartment(dept: any, clientId: number, deptId: number): Observable<any> {
    return this.http.put(`${this.baseURL}clientDept/edit/${clientId}/${deptId}`, dept, {
      responseType: 'text' as 'json'
    }
    );
  }

  //Send request to check whether a client exists or not from given client name
  doesClientExists(name: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseURL}client/exists/${name}`);
  }

  //Send request to check whether a department exists or not from given department name for given client
  doesDeptExists(name: string, clientId: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseURL}clientDept/exists/${clientId}/${name}`);
  }
}
