import { Router } from '@angular/router';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  static userId: any;

  constructor(
    private _router: Router,
  ) {
  }

  user(): any | null {
    const user = localStorage.getItem('currentUser');
    if (user) {
      return JSON.parse(user);
    } else {
      return null;
    }
  }

  get token(): string | null {
    try {
      const user = localStorage.getItem('currentUser');
      if (user) {
        return JSON.parse(user).token;
      } else {
        return null;
      }
    } catch (Exception) {
      return null;
    }
  }

  get role(): string | null {
    const user = this.user();
    if (user) {
      return user.role;
    } else {
      return null;
    }
  } 

  get name(): string | null {
    const user = this.user();
    if (user) {
      return user.username;
    } else {
      return null;
    }
  }

  loggedIn(): boolean {
    return !!localStorage.getItem('currentUser');
  }

  logoutUser(){
   return localStorage.removeItem('currentUser');
  
  }

  get username(): string | null {
    const user = this.user();
    if (user) {
      return user.username;
    } else {
      return null;
    }
  }

  get userId(): string | null{
    const user = this.user();
    if (user) {
      return user.userId;
    } else {
      return null;
    }
  }
    
}
