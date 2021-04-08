import { Component, OnInit } from '@angular/core';
import { FormControl, Validators,FormGroup, FormBuilder } from '@angular/forms';
import { getMatTooltipInvalidPositionError } from '@angular/material/tooltip';
import { disableDebugTools } from '@angular/platform-browser';
import { ActivatedRoute,Router } from '@angular/router';
import { UserserviceService } from '../userservice.service';


@Component({
  selector: 'app-updateuser',
  templateUrl: './updateuser.component.html',
  styleUrls: ['./updateuser.component.css']
})
export class UpdateuserComponent implements OnInit {

  hide = true;
  alert:boolean=false;

  constructor(private fb:FormBuilder,private router:ActivatedRoute,private _service:UserserviceService,private _router: Router ) { }
  addForm=this.fb.group(
    {
      userId:new FormControl( {value: 'userId', disabled: true}),
      uname:new FormControl(),
      role:new FormControl(),
      active:new FormControl(),
      email:new FormControl(),
      password:new FormControl(),
      contactNo:new FormControl(),
    }
    );
   ngOnInit(): void {
     this._service.getUser(this.router.snapshot.params.id).subscribe(
       (result)=>{
        this.addForm=new FormGroup(
          {
            userId: new FormControl(result['userId']),
            uname:new FormControl(result['uname']),
            role:new FormControl(result['role']),
            active:new FormControl(result['active']),
            email:new FormControl(result['email']),
            password:new FormControl(result['password']),
            contactNo:new FormControl(result['contactNo']),
      
          }
          )
       }
     )
    }

getErrorMessage() {
if (this.addForm.get('email').hasError('required')) {
return 'You must enter a value';
}

return this.addForm.get('email').hasError('email') ? 'Not a valid email' : '';
}

onUpdate(){
  this._service.updateUser(this.router.snapshot.params.id,this.addForm.value).subscribe(
    (result)=>{
      console.log(result,"data update successfull")
    }
  )
  this.alert=true;
  
}

goList(){
  this._router.navigate(['userList']);
}

get email(){
return this.addForm.get('email')
}
closeAlert(){
  this.alert=false;
  this.goList();

}
}
