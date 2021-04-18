import { FormBuilder, FormGroup,Validators} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { PageserviceService } from 'src/app/pageservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification.service';
//import { ConfirmedValidator } from 'src/app/edit-profile/edit-profile.component';

@Component({
  selector: 'app-reset-page',
  templateUrl: './reset-page.component.html',
  styleUrls: ['./reset-page.component.css']
})
export class ResetPageComponent implements OnInit {

  constructor(private _service: PageserviceService, private notificationService: NotificationService,private router: Router, private route: ActivatedRoute, private fb:FormBuilder) {
    {}
    
   }

  passwordAddForm: FormGroup;
  submitted = false;
  hide = true;
  alert:boolean=false;

  // ResponseResetForm: FormGroup;
  errorMessage: string;
  successMessage: string;
  resetToken: null;
  CurrentState: any;
  IsResetFormValid = true;
  public dataSavingProgress = false;
 


  ngOnInit() {
    this.route.queryParams.subscribe(params => {
       this.resetToken = params.token;
        console.log(this.resetToken);
        //this.VerifyToken();
      });

    this.passwordAddForm = this.fb.group(
      {
        
        passwordOne: ['', [Validators.required, Validators.minLength(8)]],
        passwordTwo: ['', [Validators.required, Validators.minLength(8)]],
        
      }, {
        //validator: ConfirmedValidator('passwordOne', 'passwordTwo')
      });

    // this.Init();
  }

  // VerifyToken() {
  //   this._service.ValidPasswordToken({ resettoken: this.resetToken }).subscribe(
  //     data => {
  //       console.log(data);
  //       this.CurrentState = 'Verified';
  //     },
  //     err => {
  //       this.CurrentState = 'NotVerified';
  //     }
  //   );
  //}

  // Init() {
  //   this.passwordAddForm = this.fb.group(
  //     {
  //       resettoken: [this.resetToken],
  //       passwordOne: ['', [Validators.required, Validators.minLength(8)]],
  //       passwordTwo: ['', [Validators.required, Validators.minLength(8)]]
  //     }
  //   );
  // }

  // Validate(passwordOne:String,passwordTwo:String) {
  //   return(passwordFormGroup:FormGroup)=>{
  //   const new_password = passwordFormGroup.controls.passwordOne.value;
  //   const confirm_password = passwordFormGroup.controls.passwordTwo.value;

  //   if (confirm_password.length <= 0) {
  //     return null;
  //   }

  //   if (confirm_password !== new_password) {
  //     return {
  //       doesNotMatch: true
  //     };
  //   }

  //   return null;
  // }
  // }


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
