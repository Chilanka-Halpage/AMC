import { catchError } from 'rxjs/operators';
import { Injectable, Injector, Pipe } from '@angular/core';
import {HttpInterceptor, HttpRequest} from '@angular/common/http';
import {AuthenticationService} from './authentication.service';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private injector: Injector,
    private router: Router,
    private authService: AuthenticationService
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
    return next.handle(request).pipe(catchError(err => {
      if(err.status === 0) return throwError('Network connection failure');
      else if (err.status === 403) {
        this.authService.logoutUser();
        this.router.navigate(['/login']);
        return throwError(err.message);
      }
      return throwError(err);
    }))
  }
}
