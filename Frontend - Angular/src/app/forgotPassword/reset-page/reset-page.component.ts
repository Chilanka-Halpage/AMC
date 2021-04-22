import { FormBuilder, FormGroup,Validators} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { PageserviceService } from 'src/app/pageservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification.service';

@Component({
  selector: 'app-reset-page',
  templateUrl: './reset-page.component.html',
  styleUrls: ['./reset-page.component.css']
})
export class ResetPageComponent implements OnInit {

  constructor(
  private _service: PageserviceService,
  private notificationService: NotificationService,
  private router: Router,
  private route: ActivatedRoute,
  private fb:FormBuilder) {}

  public passwordAddForm: FormGroup;
  public submitted = false;
  public hide = true;
  public errorMessage: string;
  public successMessage: string;
  public resetToken: null;
  public CurrentState: any;
  public IsResetFormValid = true;
  public dataSavingProgress = false;
 
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
       this.resetToken = params.token;
        console.log(this.resetToken);
        
      });

    this.passwordAddForm = this.fb.group(
      { 
        passwordOne: ['', [Validators.required, Validators.minLength(8)]],
        passwordTwo: ['', [Validators.required, Validators.minLength(8)]], 
      }, {
        validator: ConfirmedValidator('passwordOne', 'passwordTwo')
      });

    // this.Init();
  }
  ResetPassword(form) {
    let password1= form.get('passwordOne').value
     let password2=form.get('passwordTwo').value
    // if(password1 == '')
    // alert ("Please enter Password");

    // else if (password2 == '')
    //                 alert ("Please enter confirm password");
    //                 else if (password1 != password2) {
    //                   alert ("\nPassword did not match: Please try again...")
    //                   return false;
    //               }
     // else if(password1==password2)  {           
    //console.log(form.get('passwordTwo'));
    
    this.dataSavingProgress = true;
      this._service.newPassword(password2,this.resetToken).subscribe(data => {
          this.notificationService.showNoitfication('Reset change is successfull', 'OK', 'success', () => { this.navigateToLoginPage()});
          this.dataSavingProgress = false;
        },
          error => {
            console.log(error);
            let message = (error.status === 200) ? error.error.message : 'Cannot proceed the request. Try again'
            this.notificationService.showNoitfication(message, 'OK', 'error', null);
          }).add(()=>this.dataSavingProgress=false)
        }
  //}

      navigateToLoginPage(){
        this.router.navigate(['login']);
      }     
}

export function ConfirmedValidator(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];
    if (matchingControl.errors && !matchingControl.errors.confirmedValidator) {
      return;
    }
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ confirmedValidator: true });
    } else {
      matchingControl.setErrors(null);
    }
  }
}
