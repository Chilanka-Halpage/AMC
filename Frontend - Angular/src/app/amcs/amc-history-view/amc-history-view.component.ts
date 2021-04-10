import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-amc-history-view',
  templateUrl: './amc-history-view.component.html',
  styleUrls: ['./amc-history-view.component.scss']
})
export class AmcHistoryViewComponent implements OnInit {

  public list: any[];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<any[]>(`${environment.baseServiceUrl}amcHistory/all/20214`).subscribe(res => this.list = res);
  }

}
