import { FrequencyserviceService } from './../frequencyservice.service';
import { Component, OnInit,ViewChild } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import {FormGroup,FormControl,FormBuilder, Validators} from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { NotificationService } from 'src/app/shared/notification.service';

@Component({
  selector: 'app-frequency',
  templateUrl: './frequency.component.html',
  styleUrls: ['./frequency.component.css']
})
export class FrequencyComponent implements OnInit {

  frequencyAddForm: FormGroup;
  submitted = false;
  id: number;
  searchKey:string;
  edit=false;
  public dataSavingProgress = false;
  public resultsLength = 0;
  public isLoadingResults = true;
  public isRateLimitReached = false;
  popoverTitle = 'Delete Row';
  popoverMessage = 'Are you sure to want to Delete ?';
  confirmClicked = false;
  cancelClicked = false;

  constructor(private _service: FrequencyserviceService, private router: Router,
    private formBuilder:FormBuilder,private notificationService: NotificationService,private route: ActivatedRoute) { }

  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['id', 'frequency', 'active', 'savedBy', 'savedOn', 'savedIp','lastModifiedBy','lastModifiedOn','action'];
  @ViewChild(MatSort) sort:MatSort;
  @ViewChild(MatPaginator) paginator:MatPaginator;

  ngOnInit(){
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
editFrequencysList(id){
  this.router.navigate(['frequency', id]);
}

editFrequencyList(row) {
this.edit=true;
console.log(row);
this.frequencyAddForm.patchValue({
frequency: row.frequency,
active: row.active
}); 
}

deleteFrequencyList(id: number) {
console.log(id);
this._service.deleteFrequency(id).subscribe(
    data => {
      console.log(data);
      this.reload();
    },
    error => {
      console.log(error);
      this.notificationService.showNoitfication('Cannot proceed the request.', 'OK', 'error', null);
    }).add(()=>this.dataSavingProgress=false);  
}

save() {
this.dataSavingProgress = true;
this._service
.createFrequency(this.frequencyAddForm.value).subscribe(data => {
  this.notificationService.showNoitfication('Successfully done', 'OK', 'success', () => { this.reload()});
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
console.log(this.frequencyAddForm);
this.submitted = true;
this.save();    
}



onEdit(){
  this.dataSavingProgress = true;
  this._service.updateFrequency(this.route.snapshot.params.id,this.frequencyAddForm.value).subscribe(
    (result)=>{
      this.notificationService.showNoitfication('Successfully done', 'OK', 'success', () => { this.reload()});
      this.dataSavingProgress = false;
    }, error => {
    console.log(error);
    let message = (error.status === 400) ? error.error.message : 'Cannot proceed the request. Try again'
    this.notificationService.showNoitfication(message, 'OK', 'error', null);
  }).add(()=>this.dataSavingProgress=false)
  
}
reload(){
  this._service.getFrequencyList().subscribe(
    list => {
  
      this.listData = new MatTableDataSource(list);
      this.listData.sort= this.sort;
      this.listData.paginator=this.paginator;
      this.resetForm();
    });
}
resetForm(): void {
  this.frequencyAddForm.reset();
}

onSearchClear(){
  this.searchKey="";
  this.applyFilter();
}

applyFilter(){
  this.listData.filter=this.searchKey.trim().toLowerCase();
}

}
function add(arg0: () => boolean) {
  throw new Error('Function not implemented.');
}

