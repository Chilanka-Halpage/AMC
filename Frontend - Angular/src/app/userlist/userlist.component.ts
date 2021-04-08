
import { Component, OnInit,ViewChild } from '@angular/core';

import { ActivatedRoute,Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import {FormGroup,FormControl,FormBuilder, Validators} from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { UserserviceService } from '../userservice.service';


@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {
  id: number;
  addForm: FormGroup;
  searchKey:string;

  constructor(private _service: UserserviceService, private router: Router,
    private route: ActivatedRoute) { }

  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['id', 'uname','role', 'active', 'email','contactNo','action'];
  @ViewChild(MatSort) sort:MatSort;
  @ViewChild(MatPaginator) paginator:MatPaginator;


  ngOnInit(){
    this.id = this.route.snapshot.params['id'];
    this._service.getUserList().subscribe(
      list => {

        this.listData = new MatTableDataSource(list);
        this.listData.sort= this.sort;
        this.listData.paginator=this.paginator;
      });


  }
   
  editUserList(id) {
    this.router.navigate(['editUser', id]);
    
   } 
   

   deleteUserList(id: number) {
    console.log(id);
    this._service.deleteUser(id)
    
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error));  
  }

  addUser(){
    this.router.navigate(['user']);
  }
  reloadData(){
    this.router.navigate(['userList'])
  }

  onSearchClear(){
    this.searchKey="";
    this.applyFilter();
  }

  applyFilter(){
    this.listData.filter=this.searchKey.trim().toLowerCase();
  }




}
