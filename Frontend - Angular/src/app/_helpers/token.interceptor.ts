import { catchError } from 'rxjs/operators';
import {Injectable, Injector} from '@angular/core';
import {HttpInterceptor, HttpRequest} from '@angular/common/http';
import {AuthenticationService} from './authentication.service';
import { Router } from '@angular/router';
import { LoginDetailsService } from '../data/login-details.service'
import { from, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private injector: Injector,
    private loginDetailsService:LoginDetailsService
  ) { }

  intercept(request: HttpRequest<any>, next: any): any {
    const authentication = this.injector.get(AuthenticationService);
    const currentUser = authentication.token; 
    if (currentUser) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUser}`
        }
      });
    }
    return next.handle(request)
    // .pipe(catchError(err => {
    //   if(err.status === 0) return throwError('Network connection failure');
    //   else if (err.status === 403) {
    //     console.log("hello")
    //     this.loginDetailsService.logoutDetails();
    //     return throwError(err.message);
    //   }
    //   return throwError(err);
    // }))
  }
}
