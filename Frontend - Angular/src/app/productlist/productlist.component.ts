import { ProductserviceService } from './../productservice.service';
import { Component, OnInit,ViewChild } from '@angular/core';
import { product } from '../product';
import { Observable } from 'rxjs';
import { ActivatedRoute,Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import {FormGroup,FormControl,FormBuilder, Validators} from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { NotificationService } from 'src/app/shared/notification.service';

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.css']
})
export class ProductlistComponent implements OnInit {
  constructor(
    private _service: ProductserviceService,
    private router: Router,
    private formBuilder:FormBuilder,
    private route: ActivatedRoute,
    private notificationService: NotificationService
    ) { }
    public products: Observable<product[]>;
    public productAddForm: FormGroup;
    public submitted = false;
    //public id: number;
    public edit=false;
    public filterValue: string;
    listData: MatTableDataSource<any>;
    public searchKey:string;
    public dataSavingProgress = false;
    public resultsLength = 0;
    public isLoadingResults = true;
    public isRateLimitReached = false;
    public popoverTitle = 'Delete Row';
    public popoverMessage = 'Are you sure to want to Delete ?';
    public confirmClicked = false;
    public cancelClicked = false;
    productId:number;

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
       this.isLoadingResults = false;
      });
  }

  editProductList(row) {
    this.edit=true;
    this.productId=row.productId;
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
          this.notificationService.showNoitfication('Successfully done', 'OK', 'success', () => { this.reload()});  
        },
        error => {
          console.log(error);
          this.notificationService.showNoitfication('Cannot delete a parent row: a foreign key constraint fails !', 'OK', 'error', null);
        }).add(()=>this.dataSavingProgress=false);
  }
  save() {
    this.dataSavingProgress = true;
    this._service
    .createProduct(this.productAddForm.value).subscribe(data => {
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
    console.log(this.productAddForm);
    this.submitted = true;
    this.save();    
  }
  reload(){
    this.edit=false;
    this._service.getProductList().subscribe(
      list => {
       this.listData = new MatTableDataSource(list);
       this.listData.sort= this.sort;
       this.listData.paginator=this.paginator;
        
      });
      this.resetForm();
  }
  resetForm(): void {
    this.productAddForm.reset();
  }
  onEdit(){
    this.dataSavingProgress = true;
    this._service.updateProduct(this.productId,this. productAddForm.value).subscribe(
      (result)=>{
        this.notificationService.showNoitfication('Successfully done', 'OK', 'success', () => { this.reload()});
        this.dataSavingProgress = false;
        console.log(result);
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
