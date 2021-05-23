import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../data/Users/users.service';
import { Users } from '../data/Users/users'
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { error } from '@angular/compiler/src/util';
import { ImageService } from '../data/image-service.service'
import { from } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Location } from '@angular/common';
import { NotificationService } from '../shared/notification.service';
import { base64ToFile, ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  panelOpenState = false;
  hide1 = true;
  hide2 = true;
  hide3 = true;
  matchCurrentPassword = true;
  public isLoadingResults = true;
  public isRateLimitReached =false;
  public savingImage = false;

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private usersService: UsersService,
    private route: ActivatedRoute,
    private router: Router,
    private imageService: ImageService,
    private notificationService: NotificationService,
    private location: Location
  ) {
    //this.
  }
  form = this.fb.group({
    current_password: ['', [Validators.required]],
    password: ['', [Validators.required,
      Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?#&])[A-Za-z\d$@$!%#*?&].{8,}')]],
    confirm_password: ['', [Validators.required]]
  }, {
    validator: ConfirmedValidator('password', 'confirm_password')
  })

  public formData = new FormData();
  public selectedFile: File = null;
  public imageSrc: string;

  users: Users = new Users();
  userId: String;

  editProfileForm = this.fb.group({
    contactNo: ['', [Validators.required, Validators.pattern(/^(0[1-9][0-9]{8})|(\+94[1-9][0-9]{8})$/)]],
    email: ['', [Validators.required, Validators.pattern(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)]],
  }
  )
  // getErrorMessage() {
  //   if (this.editProfileForm.value.email.hasError('required')) {
  //     return 'You must enter a value';
  //   }

  //   return this.editProfileForm.value.email.hasError('email') ? 'Not a valid email' : '';
  // }
  // getErrorMessageContactNo() {
  //   if (this.editProfileForm.value.contactNo.hasError('required')) {
  //     return 'You must enter a value';
  //   }

  //   return this.editProfileForm.value.contactNo.hasError('email') ? 'Not a valid email' : '';
  // }

  ngOnInit(): void {
    this.userId = this.route.snapshot.params.userId
    this.usersService.getUsersById(this.userId).subscribe(
      data => {
        this.editProfileForm.patchValue({
          contactNo: data.contactNo,
          email: data.email,
          
        });
        this.isLoadingResults = false;
      }
    ),
      (error)=>{
        const errMessage =(error.status === 0 || error.status===401 || error.status===403)?error.error : 'Cannot proceed the request. try again!'
        this.notificationService.showNoitfication(errMessage, 'OK', 'error', null);
      }
  }

  //edit contact no and email
  onSubmit() {
    console.log(this.editProfileForm.value);
    this.usersService.updateUser(this.userId, this.editProfileForm.value).subscribe(
      Response => {
        console.log("success", Response)
        this.notificationService.showNoitfication('Successfully done', 'OK', 'success', () => { this.location.back() });
      },
      (error) => {
        console.log("error", error);
        let message = (error.status === 501) ? error.error.message : 'Cannot proceed the request. Try again'
        this.notificationService.showNoitfication(message, 'OK', 'error', null);
      })
  }
  //reset password----------------------------
  SubmitPassword() {
    console.log(this.form.value);
    this.usersService.updatePassword(this.userId, this.form.value.current_password, this.form.value).subscribe(
      Response => {
        console.log(Response)
        this.matchCurrentPassword = Response;
        if(Response==true){
          this.notificationService.showNoitfication('Successfully done', 'OK', 'success',null);
        }
      }, (error) => {
        console.log("error", error);
        let message = (error.status === 501 || error.status === 0 || error.status===401 || error.status===403) ? error.error.message : 'Cannot proceed the request. Try again'
        
        this.notificationService.showNoitfication(message, 'OK', 'error', null);
      })
  }

  //upload image-----------------------------------
  onSelectFile(event) {
    this.selectedFile = event.target.files[event.target.files.length - 1] as File;
  }

  performUpload() {
    this.savingImage = true;
    this.formData.append('file', this.selectedFile, `${this.userId}.jpg`);
    this.imageService.uploadImage(this.formData).subscribe(
      res => {
        this.savingImage = false;
        this.imageSrc = res;
        //window.location.reload();
        this.notificationService.showNoitfication('Successfully done', 'OK', 'success',() => { window.location.reload(); });
      },
      (error) => {
        console.log("error", error);
        let message = (error.status === 501 || error.status === 0 || error.status===401 || error.status===403) ? error.error.message : 'Cannot proceed the request. Try again'
        this.notificationService.showNoitfication(message, 'OK', 'error', null);
      }
    );
  }

  get f() {
    return this.form.controls;
  }

  submit() {
    console.log(this.form.value);
  }

  //------------------------------------------
  imageChangedEvent: any = '';
  croppedImage: any = '';

  fileChangeEvent(event: any): void {
      this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
      this.selectedFile = this.base64ToFile(
          event.base64,
          this.imageChangedEvent.target.files[0].name,
        )
  }
  base64ToFile(data, filename) {

    const arr = data.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    let u8arr = new Uint8Array(n);

    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  }
  imageLoaded(image: HTMLImageElement) {
      // show cropper
  }
  cropperReady() {
      // cropper ready
  }
  loadImageFailed() {
      // show message
  }
  //----------------------------------------
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