import {Injectable, Injector} from '@angular/core';
import {HttpInterceptor, HttpRequest} from '@angular/common/http';

import {AuthenticationService} from './authentication.service';

@Injectable({
  providedIn: 'root'
})

export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private injector: Injector,
  ) { }

  intercept(request: HttpRequest<any>, next: any): any {
    const authentication = this.injector.get(AuthenticationService);
    const currentUser = authentication.token; 
    if (currentUser) {
      request = request.clone({
        setHeaders: {
          Authentication: `Bearer ${currentUser}`
        }
      });
    }
    return next.handle(request);
  }
}
