import { MatSort } from '@angular/material/sort';
import { CurrencyService } from './../currency.service';
import { Currency } from './../Model/currency.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-currency-list',
  templateUrl: './currency-list.component.html',
  styleUrls: ['./currency-list.component.scss']
})
export class CurrencyListComponent implements OnInit {

  currencies: MatTableDataSource<any>;
  currency: Currency = new Currency();
  currencyId: number


  addcurrencyForm = this.fb.group({
    currencyName: [''],
    currencyId: [''],
    savedOn: [''],
    savedIp: [''],
    active: [''],
    savedBy: ['']
  })

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private currencyService: CurrencyService,private fb: FormBuilder,) { }

  displayedColumns:string[] = ['currencyId','currencyName','savedBy','savedOn','savedIp','Action'];
 
  ngOnInit(): void {
    this.getCurrency(
   
    );
  
  }
  getCurrency(){
    this.currencyService.getCurrencyList().subscribe(data =>{
      this.currencies = new MatTableDataSource(data);  
      this.currencies.sort = this.sort;  
      this.currencies.paginator = this.paginator;
    });
  }
  deleteCurrency(currencyId: number){
    console.log(currencyId);
  this.currencyService.deleteCurrency(currencyId).subscribe(data =>{
    console.log(data);
    this.getCurrency();
  })
}
saveCurrency(){
  this.currencyService.createCurrency(this.currency).subscribe(data =>{
    console.log(data);
  this.getCurrency();  
 },
    error => console.log(error));    
}

onSubmit(){
  console.log(this.addcurrencyForm.value);
  this.saveCurrency();
}

applyFilter(filterValue: string) {
  this.currencies.filter = filterValue.trim().toLowerCase();
}

}

