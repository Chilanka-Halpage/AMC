import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms'
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AlertComponent } from '../alert/alert.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hide = false;
  error: any;

  loginForm: FormGroup = this.fb.group({
    userId: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  });

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,    
    private dialog:MatDialog,
  ) {}

  ngOnInit(): void {
  }
  onLogin(): void {
    /*
    response {
      status: true if login successful, false if login unsuccessful,
      token: JWT token,
      message: login successful or username/password incorrect,
      role: admin/user
    }
    */
    this.error = '';
    if (this.loginForm.valid) {
      this.http.post<any>('http://localhost:8080/authenticate', this.loginForm.value).subscribe(
        response => {
            
            const currentUser = {
              token: response.jwt,
              role: response.role
            }
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
             if (response.role == "ROLE_admin") {
              this.router.navigate(['/home']);
              console.log(response)
             } else {
               this.router.navigate(['/dashboard']);
             }
        }, error => {
          this.error = error;
          console.error(error);
          this.dialog.open(AlertComponent);
        }
      );
    }
    console.log(this.loginForm.value);
  }
}