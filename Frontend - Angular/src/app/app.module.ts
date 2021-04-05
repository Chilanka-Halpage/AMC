import { AmcMasterService } from './shared/amc-master.service';
import { ClientService } from './shared/client.service';
import { NotificationService } from './shared/notification.service';
import { AddClientComponent } from './clients/add-client/add-client.component';
import { MaterialModule } from './material/material.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClientListComponent } from './clients/client-list/client-list.component';
import { DepartmentListComponent } from './clients/department-list/department-list.component';
import { CreateAmcMasterComponent } from './amcs/create-amc-master/create-amc-master.component';
import { AmcSerialComponent } from './amcs/amc-serial/amc-serial.component';
import { TableFiterPipe } from './clients/table-fiter.pipe';
import { AmcMasterListComponent } from './amcs/amc-master-list/amc-master-list.component';
import { AmcSerialListComponent } from './amcs/amc-serial-list/amc-serial-list.component';
import { AmcFullDataComponent } from './amcs/amc-full-data/amc-full-data.component';
import { AmcRenewEditComponent } from './amcs/amc-renew-edit/amc-renew-edit.component';
import { NotifierComponent } from './notifier/notifier.component';



@NgModule({
  declarations: [
    AppComponent,
    AddClientComponent,
    ClientListComponent,
    DepartmentListComponent,
    CreateAmcMasterComponent,
    AmcSerialComponent,
    TableFiterPipe,
    AmcMasterListComponent,
    AmcSerialListComponent,
    AmcFullDataComponent,
    AmcRenewEditComponent,
    NotifierComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    MaterialModule
  ],
  providers: [
    ClientService,
    AmcMasterService,
    NotificationService
  ],
  bootstrap: [AppComponent],
  entryComponents:[AddClientComponent],
})
export class AppModule { }
