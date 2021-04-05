import { AmcRenewEditComponent } from './amcs/amc-renew-edit/amc-renew-edit.component';
import { AmcFullDataComponent } from './amcs/amc-full-data/amc-full-data.component';
import { AmcSerialListComponent } from './amcs/amc-serial-list/amc-serial-list.component';
import { CreateAmcMasterComponent } from './amcs/create-amc-master/create-amc-master.component';

import { ClientListComponent } from './clients/client-list/client-list.component';
import { AddClientComponent } from './clients/add-client/add-client.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DepartmentListComponent } from './clients/department-list/department-list.component';
import { AmcSerialComponent } from './amcs/amc-serial/amc-serial.component';
import { AmcMasterListComponent } from './amcs/amc-master-list/amc-master-list.component';


const routes: Routes = [
  {path: 'client/new', component: AddClientComponent},
  {path: 'client/edit', component: AddClientComponent},
  {path: 'client-list', component: ClientListComponent},
  {path: 'dept-list', component: DepartmentListComponent},
  {path: 'client/dept/edit', component: AddClientComponent},
  {path: 'client/:cid/dept/new', component: AddClientComponent},
  {path: 'amcMaster/new', component: CreateAmcMasterComponent},
  {path: 'amc-serial/new', component: AmcSerialComponent},
  {path: 'clients/:cid/amc-list', component: AmcMasterListComponent},
  {path: 'clients/depts/:did/amc-list', component: AmcSerialListComponent},
  {path: 'clients/amc-list/:no/full', component: AmcFullDataComponent},
  {path: 'clients/amc-list/:no/renew', component: AmcRenewEditComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
