import { Router } from '@angular/router';
import { NotifierComponent } from './../notifier/notifier.component';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  data: any;
  private dataChange: Subject<any> = new Subject<any>();

  constructor(
    private snackBar: MatSnackBar
  ) {
    this.dataChange.subscribe(value => this.data = value);
  }

  showNoitfication(displayMessage: string, buttonText: string, messageType: 'error' | 'success', fun: Function) {
    let snackBar: MatSnackBarRef<NotifierComponent> = this.snackBar.openFromComponent(NotifierComponent, {
      data: {
        message: displayMessage,
        buttonText: buttonText,
        type: messageType,
      },
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      duration: 5000,
      panelClass: messageType,
    });
    snackBar.afterDismissed().subscribe(() => {
      if (messageType === 'success')
        fun();
    })
  }

  changeData(data: any): void {
    this.dataChange.next(data);
  }
}
