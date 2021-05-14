import { FrequencyserviceService } from './../frequencyservice.service';
import { Component, OnInit,ViewChild } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import {FormGroup,FormBuilder, Validators} from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { NotificationService } from 'src/app/shared/notification.service';
import { AuthenticationService } from '../_helpers/authentication.service';

@Component({
  selector: 'app-frequency',
  templateUrl: './frequency.component.html',
  styleUrls: ['./frequency.component.css']
})
export class FrequencyComponent implements OnInit {

  constructor(
    private _service: FrequencyserviceService,
    private router: Router,
    private formBuilder:FormBuilder,
    private notificationService: NotificationService,
    private authService: AuthenticationService) { }

    public frequencyAddForm: FormGroup;
    public submitted = false;
    public searchKey:string;
    public edit=false;
    public dataSavingProgress = false;
    public resultsLength = 0;
    public isLoadingResults = true;
    public isRateLimitReached = false;
    public popoverTitle = 'Delete Row';
    public popoverMessage = 'Are you sure to want to Delete ?';
    public confirmClicked = false;
    public cancelClicked = false;
    listData: MatTableDataSource<any>;
    frequencyId:number;
    public isAuthorized: boolean;

  displayedColumns: string[] = [
    'id', 
    'frequency', 
    'active', 
    'savedBy', 
    'savedOn', 
    'savedIp',
    'lastModifiedBy',
    'lastModifiedOn',
    'action'
  ];
  @ViewChild(MatSort) sort:MatSort;
  @ViewChild(MatPaginator) paginator:MatPaginator;

  ngOnInit(){
    this.isAuthorized = (this.authService.role === 'ROLE_ADMIN') ? true : false;
    this.frequencyAddForm=this.formBuilder.group(
      {
        frequency:['',[Validators.required]],
        active:['',[Validators.required]]
      }
    )
 
this._service.getFrequencyList().subscribe(
  list => {
    this.listData = new MatTableDataSource(list);
    this.listData.sort= this.sort;
    this.listData.paginator=this.paginator;
    this.isLoadingResults = false;
  });

}


editFrequencyList(row) {
this.edit=true;
console.log(row);
this.frequencyId=row.frequencyId;
this.frequencyAddForm.patchValue({
frequency: row.frequency,
active: row.active
}); 
}

deleteFrequencyList(id: number) {
console.log(id);
this._service.deleteFrequency(id).subscribe(
    data => {
      this.notificationService.showNoitfication('Successfully done', 'OK', 'success', () => { window.location.reload()}); 
    },
    error => {
      console.log(error);
      this.notificationService.showNoitfication('Cannot delete a parent row: a foreign key constraint fails !', 'OK', 'error', null);
    }).add(()=>this.dataSavingProgress=false);  
}

save() {
this.dataSavingProgress = true;
this._service
.createFrequency(this.frequencyAddForm.value).subscribe(data => {
  this.notificationService.showNoitfication('Successfully done', 'OK', 'success', () => { window.location.reload()});
  this.dataSavingProgress = false;
  console.log(data)
 
}, 
error => {
  console.log(error);
  let message = (error.status === 400) ? error.error.message : 'Cannot proceed the request. Try again'
  this.notificationService.showNoitfication(message, 'OK', 'error', null);
}).add(()=>this.dataSavingProgress=false)
}

onSubmit() {
this.submitted = true;
this.save();    
}

onEdit(){
  this.dataSavingProgress = true;
  this._service.updateFrequency(this.frequencyId,this.frequencyAddForm.value).subscribe(
    (result)=>{
      this.notificationService.showNoitfication('Successfully done', 'OK', 'success', () => { window.location.reload()});
      this.dataSavingProgress = false;
    }, error => {
    console.log(error);
    let message = (error.status === 400) ? error.error.message : 'Cannot proceed the request. Try again'
    this.notificationService.showNoitfication(message, 'OK', 'error', null);
  }).add(()=>this.dataSavingProgress=false)
  
}
onSearchClear(){
  this.searchKey="";
  this.applyFilter();
}

applyFilter(){
  this.listData.filter=this.searchKey.trim().toLowerCase();
}

}
// function add(arg0: () => boolean) {
//   throw new Error('Function not implemented.');
// }

