import { LogDetailsComponent } from './log-details/log-details.component';
import { ClientGuard } from './_helpers/client.guard';
import { SattlementComponent } from './sattlement/sattlement.component';
import { CreateReceiptComponent } from './create-receipt/create-receipt.component';
import { EditDueinvoiceComponent } from './edit-dueinvoice/edit-dueinvoice.component';
import { CreateDueinvoiceComponent } from './create-dueinvoice/create-dueinvoice.component';
import { DuePaymentComponent } from './due-payment/due-payment.component';
import { UpdateTaxComponent } from './update-tax/update-tax.component';
import { TaxFComponent } from './tax-f/tax-f.component';
import { ClientdashtableComponent } from './clientdashtable/clientdashtable.component';
import { ProductPieComponent } from './product-pie/product-pie.component';
import { PaymentListComponent } from './payment-list/payment-list.component';
import { CurrencyListComponent } from './currency-list/currency-list.component';
import { InvoiceListComponent } from './invoice-list/invoice-list.component';
import { TaxListComponent } from './tax-list/tax-list.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProformaInvoiceComponent } from './proforma-invoice/proforma-invoice.component';
import { SettingComponent } from './setting/setting.component';
import { ReportsComponent } from './reports/reports.component';
import { HomeComponent } from './home/home.component';
import { CreateAmcMasterComponent } from './amcs/create-amc-master/create-amc-master.component';
import { ClientListComponent } from './clients/client-list/client-list.component';
import { AddClientComponent } from './clients/add-client/add-client.component';
import { DepartmentListComponent } from './clients/department-list/department-list.component';
import { ListcategoryComponent } from './listcategory/listcategory.component';
import { ProfileComponent } from './profile/profile.component';
import { ReportComponent } from './report/report.component';
import { GenerateReportComponent } from './generate-report/generate-report.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { AllAmcFilterComponent } from './Filters/all-amc-filter/all-amc-filter.component'
import { UsersFilterComponent } from './Filters/users-filter/users-filter.component';
import { AllAmcReportComponent } from './Reports/all-amc-report/all-amc-report.component';
import { RootNavComponent } from './root-nav/root-nav.component';
import { AuthenticationGuard } from './_helpers/authentication.guard';
import { LoginComponent } from './login/login.component';
import { CreateInvoiceComponent } from './create-invoice/create-invoice.component';
import { ClientDetailsFilterComponent } from './Filters/client-details-filter/client-details-filter.component';
import { ClientDetailsComponent } from './reports/client-details/client-details/client-details.component';
import { FullDetailsComponent } from './reports/full-details/full-details.component';
import { FullDetailsFilterComponent } from './Filters/full-details-filter/full-details-filter.component';
import { RenewalAmcsReportComponent } from './reports/renewal-amcs-report/renewal-amcs-report.component';
import { RenewedAmcsReportComponent } from './reports/renewed-amcs-report/renewed-amcs-report.component';
import { ExpiredAmcsReportComponent } from './reports/expired-amcs-report/expired-amcs-report.component';
import { ClientAmcComponent } from './reports/client-amc/client-amc.component';
import { UserAddingComponent } from './user-adding/user-adding.component';
import { FrequencyComponent } from './frequency/frequency.component';
import { ProductlistComponent } from './productlist/productlist.component';
import { AmcSerialComponent } from './amcs/amc-serial/amc-serial.component';
import { AmcMasterListComponent } from './amcs/amc-master-list/amc-master-list.component';
import { AmcFullDataComponent } from './amcs/amc-full-data/amc-full-data.component';
import { AmcRenewEditComponent } from './amcs/amc-renew-edit/amc-renew-edit.component';
import { AmcSerialListComponent } from './amcs/amc-serial-list/amc-serial-list.component';
import { UserlistComponent } from './userlist/userlist.component';
import { RevalueComponent } from './revalue/revalue.component';
import { SalesComponent } from './sales/sales.component';
import { AMCStatusComponent } from './amcstatus/amcstatus.component';

const routes: Routes = [
  { path: 'root-nav' , component: RootNavComponent},
  { path: 'login', component: LoginComponent},
  { path: 'clienthome', component: ClientdashtableComponent,canActivate: [AuthenticationGuard] },
  { path: 'proforma-invoice',component: ProformaInvoiceComponent,canActivate: [AuthenticationGuard, ClientGuard] },
  { path: '',component: SettingComponent,canActivate: [AuthenticationGuard]},//default landing page for any not logged user
  { path: 'reports',component: ReportsComponent,canActivate: [AuthenticationGuard]},
  { path: 'adminhome',component: HomeComponent, canActivate: [AuthenticationGuard, ClientGuard] },
  { path: 'client/new', component: AddClientComponent,canActivate: [AuthenticationGuard, ClientGuard] },
  { path: 'client/edit', component: AddClientComponent,canActivate: [AuthenticationGuard,ClientGuard]},
  { path: 'client-list', component: ClientListComponent,canActivate: [AuthenticationGuard,ClientGuard]},
  { path: 'dept-list/:cid', component: DepartmentListComponent,canActivate: [AuthenticationGuard]},
  { path: 'client/dept/edit/:did', component: AddClientComponent,canActivate: [AuthenticationGuard]},
  { path: 'client/:cid/dept/new', component: AddClientComponent,canActivate: [AuthenticationGuard]},
  { path: 'amcMaster/new', component: CreateAmcMasterComponent,canActivate: [AuthenticationGuard,ClientGuard]},
  { path: 'list', component: ListcategoryComponent,canActivate: [AuthenticationGuard]},
  { path: 'reportslist', component: ReportComponent,canActivate: [AuthenticationGuard]},
  { path: 'profile/:userId', component: ProfileComponent,canActivate: [AuthenticationGuard]},
  { path: 'editprofile/:userId', component: EditProfileComponent,canActivate: [AuthenticationGuard]},
  { path: 'allamcdetailsfilter', component: AllAmcFilterComponent,canActivate: [AuthenticationGuard]},
  { path: 'usersfilter', component: UsersFilterComponent,canActivate: [AuthenticationGuard]},
  { path: 'generatereport', component: GenerateReportComponent,canActivate: [AuthenticationGuard]},
  { path: 'allAmcReport/', component: AllAmcReportComponent,canActivate: [AuthenticationGuard]},
  { path: 'taxlist', component:TaxListComponent,canActivate: [AuthenticationGuard]},
  { path: 'invoicelist',component:InvoiceListComponent,canActivate: [AuthenticationGuard]},
  { path: 'createincoice', component:CreateInvoiceComponent,canActivate: [AuthenticationGuard]},
  { path: 'catogerylist', component:ListcategoryComponent,canActivate: [AuthenticationGuard]},
  { path: 'currencylist', component:CurrencyListComponent,canActivate: [AuthenticationGuard,ClientGuard]},
  { path: 'paymentHlist', component:PaymentListComponent,canActivate: [AuthenticationGuard]} ,
  { path: 'productChart' ,component:ProductPieComponent,canActivate: [AuthenticationGuard]},
  { path: 'clientdashtable', component:ClientdashtableComponent,canActivate: [AuthenticationGuard]},
  { path: 'createtax',component:TaxFComponent,canActivate: [AuthenticationGuard]},
  { path: 'updatetax/:taxId', component:UpdateTaxComponent,canActivate: [AuthenticationGuard]} ,
  { path: 'duepayment', component:DuePaymentComponent,canActivate: [AuthenticationGuard]},
  { path: 'dueinvoice', component:CreateDueinvoiceComponent,canActivate: [AuthenticationGuard]},
  { path: 'editdueinvoice/:id', component:EditDueinvoiceComponent,canActivate: [AuthenticationGuard]},
  { path: 'createReceipt', component:CreateReceiptComponent,canActivate: [AuthenticationGuard]},
  { path: 'clientDetails/:date1/:date2', component: ClientDetailsComponent,canActivate: [AuthenticationGuard]},
  { path: 'clientDetailsFilter', component: ClientDetailsFilterComponent,canActivate: [AuthenticationGuard]},
  { path: 'fullDetails/:date1/:date2', component: FullDetailsComponent,canActivate: [AuthenticationGuard]},
  { path: 'fullDetailsFilter', component: FullDetailsFilterComponent,canActivate: [AuthenticationGuard]},
  { path: 'renewalAmcs/:date1/:date2', component: RenewalAmcsReportComponent,canActivate: [AuthenticationGuard]},
  { path: 'renewedAmcs/:date1/:date2', component: RenewedAmcsReportComponent,canActivate: [AuthenticationGuard]},
  { path: 'expiredAmcs/:date1/:date2', component: ExpiredAmcsReportComponent,canActivate: [AuthenticationGuard]},
  { path: 'ClientAmc/:cId', component: ClientAmcComponent,canActivate: [AuthenticationGuard]},
  { path: 'editprofile/:userId', component: EditProfileComponent,canActivate: [AuthenticationGuard]},
  { path: 'list',component: ListcategoryComponent,canActivate: [AuthenticationGuard]},
  { path: 'user', component: UserAddingComponent,canActivate: [AuthenticationGuard]},
  { path: 'productlist',component: ProductlistComponent,canActivate: [AuthenticationGuard]},
  { path: 'frequency',component: FrequencyComponent,canActivate: [AuthenticationGuard]},
  { path: 'client/new', component: AddClientComponent,canActivate: [AuthenticationGuard,ClientGuard]},
  { path: 'client/edit', component: AddClientComponent,canActivate: [AuthenticationGuard,ClientGuard]},
  { path: 'client-list', component: ClientListComponent,canActivate: [AuthenticationGuard]},
  { path: 'dept-list', component: DepartmentListComponent,canActivate: [AuthenticationGuard]},
  { path: 'client/dept/edit', component: AddClientComponent,canActivate: [AuthenticationGuard]},
  { path: 'client/:cid/dept/new', component: AddClientComponent,canActivate: [AuthenticationGuard]},
  { path: 'amcMaster/new', component: CreateAmcMasterComponent,canActivate: [AuthenticationGuard]},
  { path: 'amc-serial/new', component: AmcSerialComponent,canActivate: [AuthenticationGuard]},
  { path: 'clients/:cid/amc-list', component: AmcMasterListComponent,canActivate: [AuthenticationGuard]},
  { path: 'clients/depts/:did/amc-list', component: AmcSerialListComponent,canActivate: [AuthenticationGuard]},
  { path: 'clients/amc-list/:no/full', component: AmcFullDataComponent,canActivate: [AuthenticationGuard]},//client can access
  { path: 'clients/amc-list/:no/renew', component: AmcRenewEditComponent,canActivate: [AuthenticationGuard]},
  { path: 'userList',component: UserlistComponent,canActivate: [AuthenticationGuard]},
  { path: 'bar',component: RevalueComponent,canActivate: [AuthenticationGuard]},
  { path: 'pchart/sales', component: SalesComponent,canActivate: [AuthenticationGuard] },
  { path: 'amcstatus', component: AMCStatusComponent,canActivate: [AuthenticationGuard] },
  { path: 'settled', component: SattlementComponent,canActivate: [AuthenticationGuard]  },
  { path: 'logdetails', component: LogDetailsComponent, canActivate: [AuthenticationGuard,ClientGuard] }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
