import { FrequencyserviceService } from './../frequencyservice.service';
import { Component, OnInit,ViewChild } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import {FormGroup,FormControl,FormBuilder, Validators} from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-frequency',
  templateUrl: './frequency.component.html',
  styleUrls: ['./frequency.component.css']
})
export class FrequencyComponent implements OnInit {

  frequencyAddForm: FormGroup;
  submitted = false;
  id: number;
  showMe:boolean=false
  showMe2:boolean=false
  searchKey:string;

  constructor(private _service: FrequencyserviceService, private router: Router,
    private formBuilder:FormBuilder,private route: ActivatedRoute) { }

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

  
  this.id = this.route.snapshot.params['id'];
  // this.reloadData();
this._service.getFrequencyList().subscribe(
  list => {

    this.listData = new MatTableDataSource(list);
    this.listData.sort= this.sort;
    this.listData.paginator=this.paginator;
  });

}

reloadData() {
// list=>
// this.listData = new MatTableDataSource(list);
}



editFrequencyList(row) {
console.log(row);
this.frequencyAddForm.patchValue({
 frequency: row.frequency,
 active: row.active
}); 
}

deleteFrequencyList(id: number) {
console.log(id);
this._service.deleteFrequency(id)

  .subscribe(
    data => {
      console.log(data);
      this.reloadData();
    },
    error => console.log(error));  
}

save() {
this._service
.createFrequency(this.frequencyAddForm.value).subscribe(data => {
  console.log(data)
  this.showTag()
}, 
error => console.log(error));
}

onSubmit() {
console.log(this.frequencyAddForm);
this.submitted = true;
this.save();    
}



onEdit(){

  this.showMe2
}
showTag(){
this.showMe=!this.showMe
}
showTag2(){
this.showMe2=!this.showMe2
}

onSearchClear(){
  this.searchKey="";
  this.applyFilter();
}

applyFilter(){
  this.listData.filter=this.searchKey.trim().toLowerCase();
}

}
