import { AmcMasterService } from './shared/amc-master.service';
import { ClientService } from './shared/client.service';
import { SharedAmcService } from './shared/shared-amc.service';
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



@NgModule({
  declarations: [
    AppComponent,
    AddClientComponent,
    ClientListComponent,
    DepartmentListComponent,
    CreateAmcMasterComponent,
    AmcSerialComponent,
    TableFiterPipe
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
    SharedAmcService
  ],
  bootstrap: [AppComponent],
  entryComponents:[AddClientComponent],
})
export class AppModule { }
