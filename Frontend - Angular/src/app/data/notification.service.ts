import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Notification } from './notification/notification'

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private baseURL =environment.baseServiceUrl;
  constructor( private httpClient: HttpClient ) { }

  getNotification(userId): Observable<Notification[]>{
    return this.httpClient.get<Notification[]>(`${this.baseURL}notification/getNotificationsPageable/${userId}`);
  }
  getNotifications(page: number, size: number, sort: string, ord: string, userId): Observable<Notification[]>{
    return this.httpClient.get<Notification[]>(`${this.baseURL}notification/getNotificationsPageable?page=${page}&size=${size}&sort=${sort},${ord}/${userId}`);
  }

  getNotificationNo(userId): Observable<any>{
    return this.httpClient.get<any>(`${this.baseURL}notification/getNotificationNo/${userId}`);
  }

  updateIsRead(userId : String): Observable<any> {
    return this.httpClient.put(`${this.baseURL}notification/notificationIsRead/${userId}`, {
      responseType: 'text' as 'json'
    }
    );
  }
}