import { ProductserviceService } from './../productservice.service';
import { Component, OnInit,ViewChild } from '@angular/core';
import { product } from '../product';
import { Observable } from 'rxjs';
import { ActivatedRoute,Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import {FormGroup,FormControl,FormBuilder, Validators} from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.css']
})
export class ProductlistComponent implements OnInit {

  products: Observable<product[]>;
  productAddForm: FormGroup;
  submitted = false;
  id: number;
  showMe:boolean=false
  showMe2:boolean=false
  filterValue: string;
  listData: MatTableDataSource<any>;
  searchKey:string;
  
  

  
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  pagesize = 20;
  

  constructor(

    private _service: ProductserviceService,
    private router: Router,
    private formBuilder:FormBuilder,
    private route: ActivatedRoute
    ) { }

  displayedColumns: string[] = [
    'id',
    'productName',
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

  ngOnInit() {

    this.productAddForm=this.formBuilder.group(
      {
        productName:['',[Validators.required]],
        active:['',[Validators.required]]
      }
    )

    this._service.getProductList().subscribe(
      list => {
       this.listData = new MatTableDataSource(list);
       this.listData.sort= this.sort;
       this.listData.paginator=this.paginator;
        
      });
  }
  

  editProductList(row) {
    console.log(row);
    this.productAddForm.patchValue({
    productName: row.productName,
    active: row.active
   }); 
   }

  deleteProductList(id: number) {
    this._service.deleteProduct(id)
      .subscribe(
        data => {
          console.log(data);
          
        },
        error => console.log(error));
  }

 

  save() {
    this._service
    .createProduct(this.productAddForm.value).subscribe(data => {
      console.log(data)
      this.showTag()
    }, 
    error => console.log(error));
  }

  onSubmit() {
    console.log(this.productAddForm);
    this.submitted = true;
    this.save();    
  }

 

  showTag(){
    this.showMe=!this.showMe
  }
  showTag2(){
    this.showMe2=!this.showMe2
  }

  onEdit(){
    this._service.updateProduct(this.route.snapshot.params.id,this. productAddForm.value).subscribe(
      (result)=>{
        console.log(result,"data updated successfull")
      }
    )
    this.showTag2()
  }


  onSearchClear(){
    this.searchKey="";
    this.applyFilter();
  }

  applyFilter(){
    this.listData.filter=this.searchKey.trim().toLowerCase();
  }


}
