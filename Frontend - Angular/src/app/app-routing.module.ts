import { CreateAmcMasterComponent } from './amcs/create-amc-master/create-amc-master.component';

import { ClientListComponent } from './clients/client-list/client-list.component';
import { AddClientComponent } from './clients/add-client/add-client.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DepartmentListComponent } from './clients/department-list/department-list.component';
import { AmcSerialComponent } from './amcs/amc-serial/amc-serial.component';


const routes: Routes = [
  {path: 'client/new', component: AddClientComponent},
  {path: 'client/edit', component: AddClientComponent},
  {path: 'client-list', component: ClientListComponent},
  {path: 'dept-list/:cid', component: DepartmentListComponent},
  {path: 'client/dept/edit/:did', component: AddClientComponent},
  {path: 'client/:cid/dept/new', component: AddClientComponent},
  {path: 'amcMaster/new', component: CreateAmcMasterComponent},
  {path: 'amc-serial/new', component: AmcSerialComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
