import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { FullDetails } from './FullDetails/full-details';
import { RenewalAmcs } from './RenewalAmcs/renewal-amcs';
import { RenewedAmcs } from './RenewedAmcs/renewed-amcs';
import { ExpiredAmcs } from './ExpiredAmcs/expired-amcs';
import { PaymentsDetails } from './PaymentsDetails/payments-details';
import { ClientAmc } from './ClientAmc/client-amc';
import { ClientPaymentDetails } from './ClientPaymentDetails/client-payment-details';
import { AllAmcs } from './all-amcs/all-amcs';
import { ClientDetails } from './client-details/client-details';

@Injectable({
  providedIn: 'root'
})
export class ReportDetailsService {

  private baseURL ="http://localhost:8080";
  constructor( private httpClient: HttpClient ) { }

  //All Amcs details
  getAllAmcs(Date1 ,Date2): Observable<AllAmcs>{
    return this.httpClient.get<AllAmcs>(`${this.baseURL}/AllAmcs/${Date1}/${Date2}`);
  }

  //Client details report
  ClientDetails(Date1 ,Date2): Observable<ClientDetails>{
    return this.httpClient.get<ClientDetails>(`${this.baseURL}/AllClients/${Date1}/${Date2}`);
  }

  //full details report
  FullDetails(Date1 ,Date2): Observable<FullDetails>{
    return this.httpClient.get<FullDetails>(`${this.baseURL}/FullDeatils/${Date1}/${Date2}`);
  }

  //Renewal Amcs report
  RenewalAmcsDetails(Date1 ,Date2): Observable<RenewalAmcs>{
    return this.httpClient.get<RenewalAmcs>(`${this.baseURL}/RenewalAmcs/${Date1}/${Date2}`);
  }

  //Renewed Amcs report
  RenewedAmcsDetails(Date1 ,Date2): Observable<RenewedAmcs>{
    return this.httpClient.get<RenewedAmcs>(`${this.baseURL}/RenewedAmcs/${Date1}/${Date2}`);
  }

  //Expired Amcs report
  ExpiredAmcsDetails(Date1 ,Date2): Observable<ExpiredAmcs>{
    return this.httpClient.get<ExpiredAmcs>(`${this.baseURL}/ExpiredAmcs/${Date1}/${Date2}`);
  }

  //Payments Details report
  PaymentDetails(Date1 ,Date2): Observable<PaymentsDetails>{
    return this.httpClient.get<PaymentsDetails>(`${this.baseURL}/PaymentReport/${Date1}/${Date2}`);
  }

  //Amc report for client
  ClientAmc(cId): Observable<ClientAmc>{
    return this.httpClient.get<ClientAmc>(`${this.baseURL}/ClientAmc/${cId}`);
  }

  //Payment Report for client
  ClientPayment(cId): Observable<ClientPaymentDetails>{
    return this.httpClient.get<ClientPaymentDetails>(`${this.baseURL}/ClientAmc/${cId}`);
  }
}
