import { Component, OnInit, ElementRef } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router, RouterLinkWithHref } from '@angular/router';
import { UserserviceService } from '../userservice.service';
import { NotificationService } from 'src/app/shared/notification.service';

@Component({
  selector: 'app-user-adding',
  templateUrl: './user-adding.component.html',
  styleUrls: ['./user-adding.component.css']
})


export class UserAddingComponent implements OnInit {

  hide = true;
  alert: boolean = false;
  isDisabled=false;
  public userSavingProgress = false;
  addForm: FormGroup;

  constructor(private fb: FormBuilder, private _service: UserserviceService, private _router: Router,private elementRef: ElementRef,private notificationService: NotificationService) { }

  ngOnInit() {
    this.addForm = this.fb.group(
      {
        uname: ['', [Validators.required]],
        role: ['', [Validators.required]],
        active: ['',[Validators.required]],
        email: ['', [Validators.required,Validators.pattern(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)]],
        contactNo: ['',[Validators.required,Validators.pattern(/^(0[1-9][0-9]{8})|(\+94[1-9][0-9]{8})$/)]],


      }

    );

  }

  getErrorMessage() {
    if (this.addForm.get('email').hasError('required')) {
      return 'You must enter a value';
    }

    return this.addForm.get('email').hasError('email') ? 'Not a valid email' : '';
  }

  onAdd():void {
    if(this.addForm.valid){
      this.userSavingProgress = true;
    this._service.createUser(this.addForm.value).subscribe(
      (result) => {
        this.notificationService.showNoitfication('Successfully done', 'OK', 'success', () => { this.navigateTouserList()});
      },
      (error) => {
        let message = (error.status === 501) ? error.error.message : 'Cannot proceed the request. Try again'
        this.notificationService.showNoitfication(message, 'OK', 'error', null);
      }
      ).add(() => this.userSavingProgress = false);
    } else {
      this.scrollToFirstInvalidControl();
    }
    

  }
  goList() {
    this._router.navigate(['userList']);
  }

  get email() {
    return this.addForm.get('email');
  }

  closeAlert() {
    this.alert = false;
    this.goList();
  }


  navigateTouserList(): void{
     this._router.navigateByUrl('userList');
  }

  resetForm(): void {
    this.addForm.reset(); 
  }

  //scrroll the form to first invalid form ,when it clicks on save button, if any invalid form is there
  scrollToFirstInvalidControl(): void {
    const firstInvalidControl: HTMLElement = this.elementRef.nativeElement.querySelector('form .ng-invalid');
    firstInvalidControl.scrollIntoView({ behavior: 'smooth' });
  }
 


}




