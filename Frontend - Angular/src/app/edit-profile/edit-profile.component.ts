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

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  panelOpenState = false;
  hide = true;

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private usersService: UsersService,
    private route: ActivatedRoute,
    private router: Router,
    private imageService: ImageService,
    private location: Location
  ) {
    //this.
  }
  form = this.fb.group({
    password: ['', [Validators.required]],
    confirm_password: ['', [Validators.required]]
  }, {
    validator: ConfirmedValidator('password', 'confirm_password')
  })
  
  public formData = new FormData();
  public selectedFile: File = null;
  public imageSrc: string;

  //form: FormGroup = new FormGroup({});
  users: Users = new Users();
  userId: String;

  editProfileForm = this.fb.group({
    contactNo: [''],
    email: [''],
    password: ['', [Validators.required]],
    confirm_password: ['', [Validators.required]]
  },{
    validator: ConfirmedValidator('password', 'confirm_password')
  } )

  //edit contact no, email----------------------------------
  onSubmit() {
    console.log(this.editProfileForm.value);
    this.usersService.updateUser(this.userId, this.editProfileForm.value).subscribe(
      Response => {console.log("success", Response)   
    },
      error => {console.log("Error!", error)
      this.location.back() 
    })
  }
  //reset password----------------------------
  SubmitPassword(){
    console.log(this.form.value);
    this.usersService.updatePassword(this.userId, this.form.value).subscribe(
      Response => {console.log("success", Response)
    },
      error => {console.log("Error!", error)
    })
    //this.panelOpenState=false
  }

  ngOnInit(): void {
    this.userId = this.route.snapshot.params.userId
    this.usersService.getUsersById(this.userId).subscribe(
      data => {
        this.editProfileForm.patchValue({
          contactNo: data.contactNo,
          email: data.email,
        })
      }
    ), console.error("error");
  }


  //upload image-----------------------------------
  onSelectFile(event) {
    this.selectedFile = event.target.files[event.target.files.length - 1] as File;
  }

  performUpload() {
    this.formData.append('file', this.selectedFile, `${this.userId}.jpg`);
    this.imageService.uploadImage(this.formData).subscribe(
      res => {
        this.imageSrc = res;
      },
    );
  }
  
  get f(){
    return this.form.controls;
  }
   
  submit(){
    console.log(this.form.value);
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