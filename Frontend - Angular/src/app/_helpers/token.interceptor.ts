import { catchError } from 'rxjs/operators';
import { Injectable, Injector, Pipe } from '@angular/core';
import { HttpInterceptor, HttpRequest } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { Router } from '@angular/router';
import { LoginDetailsService } from '../data/login-details.service'
import { from, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private injector: Injector,
    private loginDetailsService: LoginDetailsService,
    private router: Router,
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
      .pipe(catchError(err => {
        if (err.status === 0) return throwError({ status: 0, error: 'Network connection failure' });
        else if (err.status === 401 || err.status === 403) {
          console.log(err);
          const redirectURL = this.router.url;
          if (!redirectURL.startsWith('/login')) {
            this.loginDetailsService.logoutDetails().subscribe(
              () => {
                this.router.navigate(['/login'], { queryParams: { 'redirectURL': redirectURL } });
              }
            );
          }
          return throwError(err);
        }
        return throwError(err);
      }))
  }
}
