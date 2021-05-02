import { EditInvoiceComponent } from './edit-invoice/edit-invoice.component';

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
import { NgModule } from '@angular/core';
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
import { AccountantGuard } from './_helpers/accountant.guard';
import { AmccordinatorGuard } from './_helpers/amccordinator.guard';
import { AmcHistoryViewComponent } from './amcs/amc-history-view/amc-history-view.component';
import { PageComponent } from './forgotPassword/page/page.component';
import { ResetPageComponent } from './forgotPassword/reset-page/reset-page.component';
import { UpdateuserComponent } from './updateuser/updateuser.component';
import { ClientPaymentDetailsComponent } from './reports/client-payment-details/client-payment-details.component';
import { PaymentsDetailsComponent } from './reports/payments-details/payments-details.component';
import { NotificationComponent } from './notification/notification.component';
import { LoginDetailsComponent } from './login-details/login-details.component';
import { QuarterWiseRevenueReportComponent } from './reports/quarter-wise-report/quarter-wise-revenue-report.component'
import { from } from 'rxjs';

const routes: Routes = [
  { path: 'root-nav' , component: RootNavComponent,canActivate: [AuthenticationGuard]},
  { path: 'login', component: LoginComponent},
  { path: 'clienthome', component: ClientdashtableComponent,canActivate: [AuthenticationGuard,AccountantGuard,AmccordinatorGuard] },
  { path: 'proforma-invoice',component: ProformaInvoiceComponent,canActivate: [AuthenticationGuard, ClientGuard]},
  { path: '',component: SettingComponent,canActivate: [AuthenticationGuard]},//default landing page for any not logged user
  { path: 'reports',component: ReportsComponent,canActivate: [AuthenticationGuard]},
  { path: 'adminhome',component: HomeComponent, canActivate: [AuthenticationGuard, ClientGuard]},
  { path: 'client/new', component: AddClientComponent,canActivate: [AuthenticationGuard, ClientGuard,AccountantGuard]},
  { path: 'client/edit', component: AddClientComponent,canActivate: [AuthenticationGuard,ClientGuard,AccountantGuard]},
  { path: 'client-list', component: ClientListComponent,canActivate: [AuthenticationGuard,ClientGuard,AccountantGuard]},
  { path: 'dept-list/:cid', component: DepartmentListComponent,canActivate: [AuthenticationGuard,AccountantGuard]},
  { path: 'client/dept/edit/:did', component: AddClientComponent,canActivate: [AuthenticationGuard,ClientGuard,AccountantGuard]},
  { path: 'client/:cid/dept/new', component: AddClientComponent,canActivate: [AuthenticationGuard,ClientGuard,AccountantGuard]},
  { path: 'amcMaster/new', component: CreateAmcMasterComponent,canActivate: [AuthenticationGuard,ClientGuard,AccountantGuard]},
  { path: 'list', component: ListcategoryComponent,canActivate: [AuthenticationGuard,ClientGuard,AccountantGuard]},
  { path: 'reportslist', component: ReportComponent,canActivate: [AuthenticationGuard]},
  { path: 'profile/:userId', component: ProfileComponent,canActivate: [AuthenticationGuard]},//all
  { path: 'editprofile/:userId', component: EditProfileComponent,canActivate: [AuthenticationGuard]},//all
  { path: 'allamcdetailsfilter', component: AllAmcFilterComponent,canActivate: [AuthenticationGuard]},
  { path: 'generatereport', component: GenerateReportComponent,canActivate: [AuthenticationGuard]},
  { path: 'taxlist', component:TaxListComponent,canActivate: [AuthenticationGuard,ClientGuard]},
  { path: 'invoicelist/:amc_no',component:InvoiceListComponent,canActivate: [AuthenticationGuard,ClientGuard]},
  { path: 'createinvoice/:amc_no', component:CreateInvoiceComponent,canActivate: [AuthenticationGuard,ClientGuard,AmccordinatorGuard]},
  { path: 'allAmcReport/:date1/:date2', component: AllAmcReportComponent,canActivate: [AuthenticationGuard,ClientGuard,AccountantGuard]},//admin,amc cordinater 
  { path: 'allAmcReport/:date1/:date2/:category', component: AllAmcReportComponent,canActivate: [AuthenticationGuard,ClientGuard,AccountantGuard]},//admin,amc cordinater 
  { path: 'catogerylist', component:ListcategoryComponent,canActivate: [AuthenticationGuard,ClientGuard,AccountantGuard]},
  { path: 'currencylist', component:CurrencyListComponent,canActivate: [AuthenticationGuard]},
  { path: 'paymentHlist', component:PaymentListComponent,canActivate: [AuthenticationGuard,ClientGuard]} ,
  { path: 'productChart' ,component:ProductPieComponent,canActivate: [AuthenticationGuard]},
  { path: 'clientdashtable', component:ClientdashtableComponent,canActivate: [AuthenticationGuard]},
  { path: 'createtax',component:TaxFComponent,canActivate: [AuthenticationGuard]},
  { path: 'updatetax/:taxId', component:UpdateTaxComponent,canActivate: [AuthenticationGuard]} ,
  { path: 'duepayment', component:DuePaymentComponent,canActivate: [AuthenticationGuard]},
  { path: 'dueinvoice', component:CreateDueinvoiceComponent,canActivate: [AuthenticationGuard]},
  { path: 'editdueinvoice/:id', component:EditDueinvoiceComponent,canActivate: [AuthenticationGuard]},
  { path: 'createReceipt/:pi_no', component:CreateReceiptComponent,canActivate: [AuthenticationGuard,ClientGuard]},
  { path: 'sattled', component:SattlementComponent,canActivate: [AuthenticationGuard,ClientGuard]},
  { path: 'clientDetails/:date1/:date2', component: ClientDetailsComponent,canActivate: [AuthenticationGuard,ClientGuard,AccountantGuard]},//admin,amc cordinater
  { path: 'clientDetailsFilter', component: ClientDetailsFilterComponent,canActivate: [AuthenticationGuard]},
  { path: 'fullDetails/:date1/:date2', component: FullDetailsComponent,canActivate: [AuthenticationGuard,ClientGuard,AccountantGuard]},//admin,amc cordinater
  { path: 'fullDetailsFilter', component: FullDetailsFilterComponent,canActivate: [AuthenticationGuard]},
  { path: 'renewalAmcs/:date1/:date2', component: RenewalAmcsReportComponent,canActivate: [AuthenticationGuard,ClientGuard,AccountantGuard]},//admin,amc cordinater
  { path: 'renewedAmcs/:date1/:date2', component: RenewedAmcsReportComponent,canActivate: [AuthenticationGuard,ClientGuard,AccountantGuard]},//admin,amc cordinater
  { path: 'expiredAmcs/:date1/:date2', component: ExpiredAmcsReportComponent,canActivate: [AuthenticationGuard,ClientGuard,AccountantGuard]},//admin,amc cordinater
  { path: 'paymentDetails/:date1/:date2/:category', component: PaymentsDetailsComponent,canActivate: [AuthenticationGuard,ClientGuard]},//admin,amc cordinater,accountant
  { path: 'clientAmc/:cId', component: ClientAmcComponent,canActivate: [AuthenticationGuard,AccountantGuard,AmccordinatorGuard ]},//client
  { path: 'list/:id',component: ListcategoryComponent,canActivate: [AuthenticationGuard,ClientGuard,AccountantGuard]},
  { path: 'frequency/:id',component: FrequencyComponent,canActivate: [AuthenticationGuard,ClientGuard,AccountantGuard]},
  { path: 'user', component: UserAddingComponent,canActivate: [AuthenticationGuard,ClientGuard,AccountantGuard,AmccordinatorGuard]},
  { path: 'productlist',component: ProductlistComponent,canActivate: [AuthenticationGuard,ClientGuard,AccountantGuard]},
  { path: 'productlist/:id',component: ProductlistComponent,canActivate: [AuthenticationGuard,ClientGuard,AccountantGuard]},
  { path: 'frequency',component: FrequencyComponent,canActivate: [AuthenticationGuard,ClientGuard,AccountantGuard]},
  { path: 'dept-list', component: DepartmentListComponent,canActivate: [AuthenticationGuard]},
  { path: 'client/dept/edit', component: AddClientComponent,canActivate: [AuthenticationGuard,ClientGuard,AccountantGuard]},
  { path: 'amc-serial/new', component: AmcSerialComponent,canActivate: [AuthenticationGuard,ClientGuard,AccountantGuard]},
  { path: 'clients/:cid/amc-list', component: AmcMasterListComponent,canActivate: [AuthenticationGuard]},
  { path: 'clients/depts/:did/amc-list', component: AmcSerialListComponent,canActivate: [AuthenticationGuard]},
  { path: 'clients/amc-list/:no/full', component: AmcFullDataComponent,canActivate: [AuthenticationGuard,AccountantGuard]},
  { path: 'clients/amc-list/:no/renew', component: AmcRenewEditComponent,canActivate: [AuthenticationGuard,ClientGuard,AccountantGuard]},
  { path: 'userList',component: UserlistComponent,canActivate: [AuthenticationGuard,ClientGuard,AccountantGuard,AmccordinatorGuard]},
  { path: 'bar',component: RevalueComponent,canActivate: [AuthenticationGuard]},
  { path: 'pchart/sales', component: SalesComponent,canActivate: [AuthenticationGuard] },
  { path: 'amcstatus', component: AMCStatusComponent,canActivate: [AuthenticationGuard] },
  { path: 'logdetails', component: LogDetailsComponent, canActivate: [AuthenticationGuard,ClientGuard] },
  { path: 'amcHistory/view', component: AmcHistoryViewComponent,canActivate: [AuthenticationGuard,AccountantGuard] },
  { path: 'login/forgetPassword',component: PageComponent},
  { path: 'ResetPassword',component: ResetPageComponent,canActivate: [AuthenticationGuard]},
  { path: 'userList/:id',component: UserlistComponent,canActivate: [AuthenticationGuard]},
  { path: 'notification/:userId', component: NotificationComponent,canActivate: [AuthenticationGuard]},//all
  { path: 'clientPaymentReport/:userId', component: ClientPaymentDetailsComponent,canActivate: [AuthenticationGuard,AccountantGuard,AmccordinatorGuard] },//client
  { path: 'quarterWiseRevenueReport/:date1', component: QuarterWiseRevenueReportComponent,canActivate: [AuthenticationGuard,ClientGuard]},//admin,amc cordinater,accountant
  { path: 'loginDetails', component:LoginDetailsComponent,canActivate: [AuthenticationGuard]},
  { path: 'edit-Invoice/:piNo',component: EditInvoiceComponent,canActivate: [AuthenticationGuard,AccountantGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
