import { element } from 'protractor';
import { Category } from './../category';
import { Component, OnInit,ViewChild } from '@angular/core';

import { Observable } from 'rxjs';
import { CategoryserviceService } from '../categoryservice.service';
import { ActivatedRoute,Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import {FormGroup,FormControl,FormBuilder, Validators} from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-listcategory',
  templateUrl: './listcategory.component.html',
  styleUrls: ['./listcategory.component.css']
})
export class ListcategoryComponent implements OnInit {
  
  categoryAddForm: FormGroup;
  submitted = false;
  id: number;
  showMe:boolean=false;
  showMe2:boolean=false;
  searchKey:string;
  showMyMessage = false;

  constructor(private _service: CategoryserviceService, private router: Router,private formBuilder:FormBuilder,private route: ActivatedRoute) { }

  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['id', 'categoryName', 'active', 'savedBy', 'savedOn', 'savedIp','lastModifiedBy','lastModifiedOn','action'];
  
  @ViewChild(MatSort) sort:MatSort;
  @ViewChild(MatPaginator) paginator:MatPaginator;

  ngOnInit() {
    this. categoryAddForm=this.formBuilder.group(
      {
        categoryName:['',[Validators.required]],
        active:['',[Validators.required]]
      }
    )

   
     
    this._service.getCategoryList().subscribe(
      list => {

        this.listData = new MatTableDataSource(list);
        this.listData.sort= this.sort;
        this.listData.paginator=this.paginator;
      });

  }

 editCategoryList(row) {
    console.log(row);
   this.categoryAddForm.patchValue({
     id:row.id,
     categoryName: row.categoryName,
     active: row.active
   });
   
   }

  deleteCategoryList(id: number) {
    console.log(id);
    this._service.deleteCategory(id)
    
      .subscribe(
        data => {
          console.log(data);
         
        },
        error => console.log(error));  
  }

  save() {
    this._service
    .createCategory(this.categoryAddForm.value).subscribe(data => {
      console.log(data)
     
      this.showTag();
    }, 
    error => console.log(error));
  }

  onSubmit() {
    console.log(this.categoryAddForm);
    this.submitted = true;
    this.save();    
  }



  onEdit(){
     
    error => console.log(error);

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
