import { FormBuilder, FormGroup,Validators} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { PageserviceService } from 'src/app/pageservice.service';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification.service';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {

  constructor(private _service: PageserviceService,private notificationService: NotificationService, private router: Router, private formBuilder:FormBuilder) { }

  emailAddForm: FormGroup;
  submitted = false;
  hide = true;
  alert:boolean=false;
  public dataSavingProgress = false;

  ngOnInit(): void {
    this.emailAddForm=this.formBuilder.group(
      {
        email:['',[Validators.required,Validators.pattern(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)]]
        
      }
    )

  }


  save() {
    this.dataSavingProgress = true;
    this._service.sentEmail(this.emailAddForm.value).subscribe(data => {
      this.notificationService.showNoitfication('We have sent reset password link to your email. Please check!', 'OK', 'success', () => { null});
      this.dataSavingProgress = false;
      console.log(data);
      console.log("check email");
      
    },
    error => {
      console.log(error);
      let message = (error.status === 200) ? error.error.message : 'Cannot proceed the request. Try again'
      this.notificationService.showNoitfication(message, 'OK', 'error', null);
    }).add(()=>this.dataSavingProgress=false)

  }
    
    onSubmit() {
    this.alert=true;
    //this.notificationService.showNoitfication('We have sent reset password link to your email. Please check!', 'OK', 'success', () => { null});
    //console.log(this.emailAddForm);
    this.submitted = true;
    
    this.save();    
    }
    
    gotoList() {
    this.router.navigate(['']);
    }

    closeAlert(){
      this.alert=false;
      
    }

}
