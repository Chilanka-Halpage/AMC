import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit ,ViewChild} from '@angular/core';
import { TaxService } from '../tax.service';

@Component({
  selector: 'app-tax-list',
  templateUrl: './tax-list.component.html',
  styleUrls: ['./tax-list.component.scss']
})
export class TaxListComponent implements OnInit {

  taxes: MatTableDataSource<any>;
 
  constructor(private taxService: TaxService , private Router: Router) { }

  displayedColumns:string[] = ['taxName','shortName','taxRate','savedOn','savedIp','Status','Action','update'];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this.getTax();
  }

  getTax(){
    this.taxService.getTaxList().subscribe(data =>{
    this.taxes = new MatTableDataSource(data); 
    this.taxes.sort = this.sort;
    this.taxes.paginator = this.paginator;
    });
  }
  
  deleteTax(taxId: number){
      console.log(taxId);
    this.taxService.deleteTax(taxId).subscribe(data =>{
      console.log(data);
      this.getTax();
    })
  }

  updatetax(taxId: number){
    this.Router.navigate(['updatetax',taxId]);
  } 

  gotocreatetax(): void{
    this.Router.navigate(['createtax']);
  }

  applyFilter(filterValue: string) {
    this.taxes.filter = filterValue.trim().toLowerCase();
  }
}
