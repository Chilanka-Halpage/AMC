import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { Notification } from './notification/notification'

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private baseURL ="http://localhost:8080";
  constructor( private httpClient: HttpClient ) { }

  getNotification(userId): Observable<Notification>{
    return this.httpClient.get<Notification>(`${this.baseURL}/notification/getNotification/${userId}`);
  }
  getNotificationNo(userId): Observable<any>{
    return this.httpClient.get<any>(`${this.baseURL}/notification/getNotificationNo/${userId}`);
  }

  updateIsRead(userId : String): Observable<any> {
    return this.httpClient.put(`${this.baseURL}/notification/notificationIsRead/${userId}`, {
      responseType: 'text' as 'json'
    }
    );
  }
}