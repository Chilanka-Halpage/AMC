import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedAmcService {

  data: any;
  dataChange = new ReplaySubject<any>(1);

  constructor() { }

  changeData(data: any): void {
    this.dataChange.next(data);
  }
}
