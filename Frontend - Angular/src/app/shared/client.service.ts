import { Client } from './../Model/client.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MatSnackBarConfig, MatSnackBar } from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(
    private http: HttpClient,
    public snackBar: MatSnackBar
  ) { }

  baseURL = 'http://localhost:8080/'

  config: MatSnackBarConfig = {
    duration: 3000,
    horizontalPosition: 'right',
    verticalPosition: 'top'
  }

  getAllClients(page: number, size: number, sort: string, ord: string): Observable<Client[]> {
    return this.http.get<Client[]>(`${this.baseURL}client/allclients?page=${page}&size=${size}&sort=${sort},${ord}`);
  }

  getClientByClientId(cid: number): Observable<Client> {
    return this.http.get<Client>(`${this.baseURL}client/${cid}`);
  }

  saveClientAndDepartment(obj): Observable<any> {
    return this.http.post(`${this.baseURL}clientDept/departments/client`, obj);
  }
  saveDepartmentByClientId(cid: number, dept): Observable<any> {
    return this.http.post(`${this.baseURL}clientDept/clients/${cid}/department`, dept, {
      responseType: 'text' as 'json'
    }
    );
  }

  getDepartmentsByClientId(cid: number): Observable<any> {
    return this.http.get(`${this.baseURL}clientDept/clients/${cid}/departments`);
  }

  updateClient(client: any): Observable<any> {
    return this.http.put(`${this.baseURL}client/edit`, client, {
      responseType: 'text' as 'json'
    }
    );
  }

  updateDepartment(dept: any, clientId: number, deptId: number): Observable<any> {
    return this.http.put(`${this.baseURL}clientDept/edit/${clientId}/${deptId}`, dept, {
      responseType: 'text' as 'json'
    }
    );
  }

  doesClientExists(name: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseURL}client/exists/${name}`);
  }

  doesDeptExists(name: string, clientId: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseURL}clientDept/exists/${clientId}/${name}`);
  }

  success(msg) {
    this.config['panelClass'] = ['notification', 'success'];
    this.snackBar.open(msg, '', this.config);
  }

  warn(msg) {
    this.config['panelClass'] = ['notification', 'warn'];
    this.snackBar.open(msg, '', this.config);
  }
}
