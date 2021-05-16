import { AuthenticationService } from './../_helpers/authentication.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AlertComponent } from '../alert/alert.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private redirectURL: any;
  userId: String
  hide = false;
  error: any;
  isLoadingResults = false;
  isRateLimitReached = false;
  errorMessage = "Unknown Error"

  loginForm: FormGroup = this.fb.group({
    userId: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  });


  private baseURL = environment.baseServiceUrl;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    private _authservice: AuthenticationService
  ) { }

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
      this.isLoadingResults = true
      this.http.post<any>(`${this.baseURL}authenticate`, this.loginForm.value).subscribe(
        response => {
          const currentUser = {
            token: response.jwt,
            role: response.role,
            username: response.username,
            userId: response.userId
          }
          localStorage.setItem('currentUser', JSON.stringify(currentUser));
          let params = this.activatedRoute.snapshot.queryParams;
          if (params['redirectURL'])
            this.redirectURL = params['redirectURL'];
          if (this.redirectURL) {
            this.router.navigateByUrl(this.redirectURL).catch(() => {
              this.navigatePage(response);
            })
          } else {
            this.navigatePage(response);
          }
        }, error => {
          this.error = error;
          this.dialog.open(AlertComponent);
          this.isLoadingResults = false
        }
      );
    }
  }

  forgotpassword() {
    this.router.navigate(['login/forgetPassword'])
  }

  navigatePage(response: any) {
    if (response.role == "ROLE_ADMIN" || response.role == "ROLE_AMC_COORDINATOR" || response.role == "ROLE_ACCOUNTANT") {
      this.router.navigate(['/adminhome']);
    } else if (response.role == "ROLE_CLIENT") {
      this.router.navigate(['/clienthome']);
    } else {
      this.dialog.open(AlertComponent);
    }
  }


}

/* ('http://localhost:8080/authenticate', this.loginForm.value) */