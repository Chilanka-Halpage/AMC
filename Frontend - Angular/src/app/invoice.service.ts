import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Invoice } from './invoice';
import { environment } from 'src/environments/environment';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  private baseURL = environment.baseServiceUrl;

  constructor(private HttpClient: HttpClient) { }
  
  getInvoiceList(): Observable<Invoice[]>{
    return this.HttpClient.get<Invoice[]>(`${this.baseURL}invoice/findAllInvoices`);
  }

  createInvoice(invoice: Invoice): Observable<Object>{
    return this.HttpClient.post(`${this.baseURL}invoice/add`,invoice,{responseType : "text" as "json"});
  }
  
  deleteinvoice(pi_no: number): Observable<Object>{
  return this.HttpClient.delete(`${this.baseURL}invoice/deleteinvoice/${pi_no}`,{responseType:'text'});
  }

  getactiveCurrency(): Observable<any>{
    return this.HttpClient.get<any>(`${this.baseURL}Currency/findactivecurrencies`);
  }
  getCategory(): Observable<any>{
    return this.HttpClient.get<any>(`${this.baseURL}category/findAllCategory`)
  }
  getFrequency(): Observable<any>{
    return this.HttpClient.get<any>(`${this.baseURL}frequency/findActiveFrequency`)
  }

  getinvoicebyId(id: number): Observable<any>{
    return this.HttpClient.get<any>(`${this.baseURL}invoice/findinvoice/${id}`)
 }

 getinvoicebyAmcNo(id: number): Observable<any>{
  return this.HttpClient.get<any>(`${this.baseURL}invoice/activeinvoices/${id}`)
}
doesInvoiceExists(piNo: string): Observable<boolean> {
  return this.HttpClient.get<boolean>(`${this.baseURL}invoice/exists/${piNo}`);
}

calculateTaxValueByTaxRate(form: FormGroup) {
  form.get('totalAmt').valueChanges.subscribe((value: number) => {
    const totalTax = form.get('tax.taxRate').value * value
    form.patchValue({ totalTax: totalTax });
  });
  form.get('tax.taxRate').valueChanges.subscribe((value: number) => {
    const totalTax = form.get('totalAmt').value * value;
    form.patchValue({ totalTax: totalTax });
  })
}

calculateAmountValueByExRate(form: FormGroup) {
  form.get('exchageRate').valueChanges.subscribe((value: number) => {
    const totalAmtLkr = form.get('totalAmt').value * value
    form.patchValue({ totalAmtLkr: totalAmtLkr });
  });
  form.get('totalAmt').valueChanges.subscribe((value: number) => {
    const totalAmtLkr = form.get('exchageRate').value * value;
    form.patchValue({ totalAmtLkr: totalAmtLkr });
  })
}

findactiveTax(): Observable<any>{
  return this.HttpClient.get<any>(`${this.baseURL}tax/findactivetaxes`);
}
getTaxRate(id: number): Observable<any>{
  return this.HttpClient.get<any>(`${this.baseURL}tax/taxRate/${id}`);
}
totalpayble(form: FormGroup){
  form.get('totalAmt').valueChanges.subscribe((value: number) => {
    const totalPayble = form.get('totalTax').value + value
    form.patchValue({ totalPayble: totalPayble });
    const totalPayblelkr = form.get('exchageRate').value * totalPayble
    form.patchValue({ totalPayblelkr: totalPayblelkr });
  });
  form.get('totalTax').valueChanges.subscribe((value: number) => {
    const totalPayble = form.get('totalAmt').value + value;
    form.patchValue({ totalPayble: totalPayble });
    const totalPayblelkr = form.get('exchageRate').value * totalPayble
    form.patchValue({ totalPaybleLkr: totalPayblelkr });
  })
}

}  