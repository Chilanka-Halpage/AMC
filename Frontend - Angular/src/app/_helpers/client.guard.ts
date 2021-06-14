import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthenticationService} from '../_helpers/authentication.service';

@Injectable({
  providedIn: 'root'
})

export class ClientGuard implements CanActivate {

  constructor(
    private authentication: AuthenticationService,
    private router: Router
  ) {}

  canActivate() {
    console.log(this.authentication.role);
        if (this.authentication.role !== 'ROLE_CLIENT') {    
        return true;     
    } else {/* 
        this.authentication.logoutUser; */
        return false;
    }
  }
}
