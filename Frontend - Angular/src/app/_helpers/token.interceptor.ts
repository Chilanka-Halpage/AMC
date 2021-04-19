import { catchError } from 'rxjs/operators';
import {Injectable, Injector} from '@angular/core';
import {HttpInterceptor, HttpRequest} from '@angular/common/http';
import {AuthenticationService} from './authentication.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private injector: Injector
  ) { }

  intercept(request: HttpRequest<any>, next: any): any {
    const authentication = this.injector.get(AuthenticationService);
    const currentUser = authentication.token; 
    if (currentUser) {
      request = request.clone({
        setHeaders: {
<<<<<<< HEAD
          Authorization: `Bearer ${currentUser}`
=======
          Authorization: `Bearer ${currentUser}`,
>>>>>>> 1f6024e9948f0afb60c7ba9f2bf64a5666adc762
        }
      });
    }
    return next.handle(request)
  }
}
