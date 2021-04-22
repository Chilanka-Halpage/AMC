import { Component, OnInit, ViewChild } from '@angular/core';
import { NotificationService } from 'src/app/shared/notification.service';
import { CategoryserviceService } from '../categoryservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-listcategory',
  templateUrl: './listcategory.component.html',
  styleUrls: ['./listcategory.component.css']
})
export class ListcategoryComponent implements OnInit {

  constructor(
    private _service: CategoryserviceService, 
    private notificationService: NotificationService, 
    private router: Router, 
    private formBuilder: FormBuilder, 
    private route: ActivatedRoute) {}

    public  categoryAddForm: FormGroup;
    public submitted = false;
    public id: number;
    public searchKey: string;
    public showMyMessage = false;
    public edit = false;
    public alert: boolean = false;
    public dataSavingProgress = false;
    public popoverTitle = 'Delete Row';
    public popoverMessage = 'Are you sure to want to Delete ?';
    public confirmClicked = false;
    public cancelClicked = false;
    listData: MatTableDataSource<any>;

  displayedColumns: string[] = [
    'id', 
    'categoryName', 
    'active', 
    'savedBy', 
    'savedOn', 
    'savedIp', 
    'lastModifiedBy', 
    'lastModifiedOn', 
    'action'];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this._service.getCategoryList().subscribe(
      list => {
        this.listData = new MatTableDataSource(list);
        this.listData.sort = this.sort;
        this.listData.paginator = this.paginator;
      });
    this.categoryAddForm = this.formBuilder.group(
      {
        categoryName: ['', [Validators.required]],
        active: ['', [Validators.required]]
      }
    )

  }
  editCategoryList(id) {
    this.router.navigate(['list', id]);
  }

  editCategoryListe(row) {
    this.router.navigate(['list', row.categoryId]);
    console.log(row);
    this.edit = true;

    this.categoryAddForm.patchValue({
      categoryName: row.categoryName,
      active: row.active
    });

  }
  deleteCategoryList(id: number) {
    console.log(id);
    this._service.deleteCategory(id).subscribe(
      data => {
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
      .createCategory(this.categoryAddForm.value).subscribe(data => {
        this.notificationService.showNoitfication('Successfully done', 'OK', 'success', () => { this.reload() });
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
    console.log(this.categoryAddForm);
    this.submitted = true;
    this.save();
  }

  onEdit() {
    this.dataSavingProgress = true;
    console.log(this.route.snapshot.params.id);
    this._service.updateCategory(this.route.snapshot.params.id, this.categoryAddForm.value).subscribe(
      (result) => {
        this.notificationService.showNoitfication('Successfully done', 'OK', 'success', () => { this.reload() });
        this.dataSavingProgress = false;
      }, error => {
        console.log(error);
        let message = (error.status === 400) ? error.error.message : 'Cannot proceed the request. Try again'
        this.notificationService.showNoitfication(message, 'OK', 'error', null);
      }).add(()=>this.dataSavingProgress=false)
    }

  reload() {
    this._service.getCategoryList().subscribe(
      list => {
        this.listData = new MatTableDataSource(list);
        this.listData.sort = this.sort;
        this.listData.paginator = this.paginator;
      });
    this.resetForm();
  }

  resetForm(): void {
    this.categoryAddForm.reset();
  }

  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }
  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }
}
