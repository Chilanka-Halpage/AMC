import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router, RouterLinkWithHref } from '@angular/router';
import { UserserviceService } from '../userservice.service';

@Component({
  selector: 'app-user-adding',
  templateUrl: './user-adding.component.html',
  styleUrls: ['./user-adding.component.css']
})


export class UserAddingComponent implements OnInit {

  hide = true;
  alert: boolean = false;


  addForm: FormGroup;

  constructor(private fb: FormBuilder, private _service: UserserviceService, private _router: Router) { }

  ngOnInit() {
    this.addForm = this.fb.group(
      {
        userId: [''],
        uname: ['', [Validators.required]],
        role: ['', [Validators.required]],
        active: ['',[Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        contactNo: [''],


      }

    );

  }

  getErrorMessage() {
    if (this.addForm.get('email').hasError('required')) {
      return 'You must enter a value';
    }

    return this.addForm.get('email').hasError('email') ? 'Not a valid email' : '';
  }

  onAdd() {

    this._service.createUser(this.addForm.value).subscribe(
      (result) => {
        this.alert = true;
      }
      )
    this.emailSent();

  }
  goList() {
    this._router.navigate(['userList']);
  }

  get email() {
    return this.addForm.get('email')
  }

  closeAlert() {
    this.alert = false;
    this.goList();
  }

  emailSent() {
    this._service
      .sentEmail(this.addForm.value).subscribe(data => {
        console.log(data)

        console.log("check email")
      })
  }
  navigateTouserList(): void{
    this._router.navigateByUrl('userList');
 }

 resetForm(): void {
   this.addForm.reset(); 
 }


}




