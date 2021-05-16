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
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportDetailsService {

  private baseURL =environment.baseServiceUrl;
  constructor( private httpClient: HttpClient ) { }

  //All Amcs details
  getAllAmcs(date1 ,date2,category): Observable<AllAmcs[]>{
    return this.httpClient.get<AllAmcs[]>(`${this.baseURL}report/AllAmcs/${date1}/${date2}/${category}`);
  }

  //Client details report
  ClientDetails(Date1 ,Date2): Observable<ClientDetails[]>{
    return this.httpClient.get<ClientDetails[]>(`${this.baseURL}report/AllClients/${Date1}/${Date2}`);
  }

  //full details report
  FullDetails(Date1 ,Date2): Observable<FullDetails[]>{
    return this.httpClient.get<FullDetails[]>(`${this.baseURL}report/FullDeatils/${Date1}/${Date2}`);
  }

  //Renewal Amcs report
  RenewalAmcsDetails(Date1 ,Date2): Observable<RenewalAmcs[]>{
    return this.httpClient.get<RenewalAmcs[]>(`${this.baseURL}report/RenewalAmcs/${Date1}/${Date2}`);
  }

  //Renewed Amcs report
  RenewedAmcsDetails(Date1 ,Date2): Observable<RenewedAmcs[]>{
    return this.httpClient.get<RenewedAmcs[]>(`${this.baseURL}report/RenewedAmcs/${Date1}/${Date2}`);
  }

  //Expired Amcs report
  ExpiredAmcsDetails(Date1 ,Date2): Observable<ExpiredAmcs[]>{
    return this.httpClient.get<ExpiredAmcs[]>(`${this.baseURL}report/ExpiredAmcs/${Date1}/${Date2}`);
  }

  //Payments Details report
  PaymentDetails(Date1 ,Date2,category): Observable<PaymentsDetails[]>{
    return this.httpClient.get<PaymentsDetails[]>(`${this.baseURL}report/PaymentReport/${Date1}/${Date2}/${category}`);
  }

  //Quarter wise revenue report
  QuarterWiseRevenue(date1,category): Observable<any[]>{
    return this.httpClient.get<any[]>(`${this.baseURL}report/QuarterWiseRevenue/${date1}/${category}`);
  }

  //Amc report for client
  ClientAmc(userId): Observable<ClientAmc[]>{
    return this.httpClient.get<ClientAmc[]>(`${this.baseURL}report/client/ClientAmc/${userId}`);
  }

  //Payment Report for client
  ClientPayment(userId): Observable<ClientPaymentDetails[]>{
    return this.httpClient.get<ClientPaymentDetails[]>(`${this.baseURL}report/client/ClientAmc/${userId}`);
  }
}
