import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { ClientDetails } from './client-details/client-details';
import { FullDetails } from './FullDetails/full-details';
import { PaymentsDetails } from './PaymentsDetails/payments-details';
import { RenewalAmcs } from './RenewalAmcs/renewal-amcs';
import { RenewedAmcs } from './RenewedAmcs/renewed-amcs';
import { ClientAmc } from './ClientAmc/client-amc';
import { ClientPaymentDetails } from './ClientPaymentDetails/client-payment-details'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JrReportDetailsService {

  private baseURL = environment.baseServiceUrl;
  constructor(private httpClient: HttpClient) { }

  //All AMCs jasper report
  AllAmcPdfReport(date1, date2, category, userId): Observable<any> {
    return this.httpClient.get<any>(`${this.baseURL}jrReport/allAmcCtgWiseJr/${date1}/${date2}/${category}/${userId}`,
      {
        responseType: 'text' as 'json'
      });
  }

  //full details jasper report
  FullDetailsJrReport(Date1, Date2, userId): Observable<FullDetails> {
    return this.httpClient.get<FullDetails>(`${this.baseURL}jrReport/FullDetailsJrReport/${Date1}/${Date2}/${userId}`,
      {
        responseType: 'text' as 'json'
      });
  }

  //Renewal Amcs jasper report
  RenewalAmcsJrReport(Date1, Date2, userId): Observable<RenewalAmcs> {
    return this.httpClient.get<RenewalAmcs>(`${this.baseURL}jrReport/RenewalAmcsJrReport/${Date1}/${Date2}/${userId}`,
      {
        responseType: 'text' as 'json'
      });
  }

  //Expired Amcs jasper report
  ExpiredAmcsJrReport(Date1, Date2, userId): Observable<RenewalAmcs> {
    return this.httpClient.get<RenewalAmcs>(`${this.baseURL}jrReport/ExpiredAmcsJrReport/${Date1}/${Date2}/${userId}`,
      {
        responseType: 'text' as 'json'
      });
  }

  //Renewed Amcs jasper report
  RenewedAmcsJrReport(Date1, Date2, userId): Observable<RenewedAmcs> {
    return this.httpClient.get<RenewedAmcs>(`${this.baseURL}jrReport/RenewedAmcsJrReport/${Date1}/${Date2}/${userId}`,
      {
        responseType: 'text' as 'json'
      });
  }

  //Clients Details jasper report
  ClientDetailsJrReport(Date1, Date2, userId): Observable<ClientDetails> {
    return this.httpClient.get<ClientDetails>(`${this.baseURL}jrReport/ClientDetailsJrReport/${Date1}/${Date2}/${userId}`,
      {
        responseType: 'text' as 'json'
      });
  }

  downloadPdf(Date1 ,Date2, userId): Observable<Blob> {
    return this.httpClient
              .get(`${this.baseURL}jrReport/ClientDetailsJrReport/${Date1}/${Date2}/${userId}`, { responseType:'blob' })
  }

  //Payments Details jasper report
  PaymentsDetailsJrReport(Date1, Date2, category, userId): Observable<PaymentsDetails> {
    return this.httpClient.get<PaymentsDetails>(`${this.baseURL}jrReport/PaymentsJrReport/${Date1}/${Date2}/${category}/${userId}`,
      {
        responseType: 'text' as 'json'
      });
  }

  //Amc jasper report for client
  ClientAmcJrReport(userId): Observable<ClientAmc> {
    return this.httpClient.get<ClientAmc>(`${this.baseURL}jrReport/client/ClientAmcReport/${userId}`,
      {
        responseType: 'text' as 'json'
      });
  }

  //Payment Jasper report for client
  ClientPaymentJrReport(userId): Observable<ClientPaymentDetails> {
    return this.httpClient.get<ClientPaymentDetails>(`${this.baseURL}jrReport/client/ClientPaymentsJrReport/${userId}`,
      {
        responseType: 'text' as 'json'
      });
  }

  //Quarter wise revenue report
  QuarterWiseRevenueJrReport(date1, category, userId): Observable<any> {
    return this.httpClient.get<any>(`${this.baseURL}jrReport/QuarterWiseRevenueJrReport/${date1}/${category}/${userId}`,
      {
        responseType: 'text' as 'json'
      });
  }

  //view pdf
  viewPdf(userId): Observable<Blob> {
    return this.httpClient.get(`${this.baseURL}jrReport/viewPdf/${userId}`, {
      responseType: 'blob'
    });
  }

  downloadPdf(Date1, Date2, userId): Observable<Blob> {
    return this.httpClient
      .get(`${this.baseURL}jrReport/ClientDetailsJrReport/${Date1}/${Date2}/${userId}`, { responseType: 'blob' })
  }

}
