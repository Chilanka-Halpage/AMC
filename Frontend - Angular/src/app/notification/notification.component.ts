import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
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

  notifications: MatTableDataSource<Notification>;
  userId :any
  public isLoadingResults = true;
  public resultsLength = 0;
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
        this.notifications = new MatTableDataSource(data);
        console.log(data)
        this.isLoadingResults=false;
        this.resultsLength = this.notifications.data.length;
       // this.a=data.is_read
      })
  }

  notViewedNotifications(){
    //this.notifications.is_read==false
  }

displayedColumns: string[] = ['savedDate', 'notification'];

}
