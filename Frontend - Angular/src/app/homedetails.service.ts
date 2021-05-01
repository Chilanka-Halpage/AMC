import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomedetailsService {

  private baseURL = environment.baseServiceUrl;

  constructor(private HttpClient: HttpClient) { }

  getActiveClient(): Observable<any> {
    return this.HttpClient.get<any>(`${this.baseURL}client/activeclient`, { responseType: 'text' as 'json' });
  }

  getActiveAmcCount(): Observable<any> {
    return this.HttpClient.get<any>(`${this.baseURL}amcMaster/dashboard/activeAmcCount`, { responseType: 'text' as 'json' })
  }

  getTotalAmc(): Observable<any> {
    return this.HttpClient.get<any>(`${this.baseURL}amcMaster/dashboard/totalAmc`, { responseType: 'text' as 'json' })
  }

  getInactiveAmcCount(): Observable<any> {
    return this.HttpClient.get<any>(`${this.baseURL}amcMaster/dashboard/inactiveAmcCount`, { responseType: 'text' as 'json' })
  }

  Amcreminders(Date1 ,Date2): Observable<any>{
    return this.HttpClient.get<any>(`${this.baseURL}report/dashboard/AmcReminders/${Date1}/${Date2}`);
  }

  RenewedAmcscount(Date1 ,Date2): Observable<any>{
    return this.HttpClient.get<any>(`${this.baseURL}report/dashboard/RenewedAmccount/${Date1}/${Date2}`,{responseType : 'text' as 'json'});
  }
 
 expiredamcCount(Date1 ,Date2): Observable<any>{
  return this.HttpClient.get<any>(`${this.baseURL}report/dashboard/ExpiredAmcscount/${Date1}/${Date2}`,{responseType : 'text' as 'json'});
 }

  lastyearrevanue(Date1, Date2): Observable<any> {
    return this.HttpClient.get<any>(`${this.baseURL}receipt/lastyearrevanue/${Date1}/${Date2}`, { responseType: 'text' as 'json' });
  }

  last2yearrevanue(Date1, Date2): Observable<any> {
    return this.HttpClient.get<any>(`${this.baseURL}receipt/last2yearrevanue/${Date1}/${Date2}`, { responseType: 'text' as 'json' });
  }

  last3yearrevanue(Date1, Date2): Observable<any> {
    return this.HttpClient.get<any>(`${this.baseURL}receipt/last3yearrevanue/${Date1}/${Date2}`, { responseType: 'text' as 'json' });
  }

  last4yearrevanue(Date1, Date2): Observable<any> {
    return this.HttpClient.get<any>(`${this.baseURL}receipt/last4yearrevanue/${Date1}/${Date2}`, { responseType: 'text' as 'json' });
  }

  last5yearrevanue(Date1, Date2): Observable<any> {
    return this.HttpClient.get<any>(`${this.baseURL}receipt/last5yearrevanue/${Date1}/${Date2}`, { responseType: 'text' as 'json' });
  }

  getclienthome(userId: String): Observable<any> {
    return this.HttpClient.get<any>(`${this.baseURL}receipt/findreceiptsforclient/${userId}`)
  }

  gettotalAmcforclient(userId: String): Observable<any> {
    return this.HttpClient.get<any>(`${this.baseURL}amcMaster/dashboard/AmcCountforclient/${userId}`, { responseType: 'text' as 'json' })
  }

  getActiveAmcforclient(userId: String): Observable<any> {
    return this.HttpClient.get<any>(`${this.baseURL}amcMaster/dashboard/AmcActiveCountforclient/${userId}`, { responseType: 'text' as 'json' })
  }

  getdepartmentcount(userId: String): Observable<any> {
    return this.HttpClient.get<any>(`${this.baseURL}clientDept/departmetncount/${userId}`, { responseType: 'text' as 'json' })
  }

  gterenevelAMCforClient(Date1, Date2, id): Observable<any> {
    return this.HttpClient.get<any>(`${this.baseURL}report/dashboard/RenewelAmccountC/${id}/${Date1}/${Date2}`, { responseType: 'text' as 'json' });
  }

  public getImage(imgName): Observable<any> {
    return this.HttpClient.get<any>(`${this.baseURL}api/images/getImage/${imgName}.jpg`,
      {
        responseType: 'text' as 'json'
      });
  }

  public Image(userId) {
    return `${this.baseURL}api/images/getImage/${userId}.jpg`;
  }
  logdetails(): Observable<any> {
    return this.HttpClient.get<any>(`${this.baseURL}User/getlast7logdetails`);
  }

}
