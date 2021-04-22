import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { NotificationService } from '../data/notification.service';
import { Notification } from '../data/notification/notification'
import { AuthenticationService } from '../_helpers/authentication.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  notifications: Notification;
  userId :any
  constructor(
    private notificationService: NotificationService,
    public _authentication: AuthenticationService,
  ) { }

  ngOnInit(): void {
    this.getNotifications()
    //this.updateIsRead()
  }

  getNotifications() {
    this.notificationService.getNotification(this._authentication.userId).subscribe(
      data => {
        this.notifications = data;
      })
  }

  notViewedNotifications(){
    //this.notifications.is_read==false
  }

displayedColumns: string[] = ['saved_date', 'notification'];

}
