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
import { DashComponent } from './dash/dash.component';
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


const routes: Routes = [
  { path: 'root-nav' , component: RootNavComponent},
  { path: 'login', component: LoginComponent},
  { path: 'dashboard',component: DashComponent,canActivate: [AuthenticationGuard]},
  { path: 'proforma-invoice',component: ProformaInvoiceComponent},
  { path: 'setting',component: SettingComponent},
  { path: 'reports',component: ReportsComponent},
  { path: 'home',component: HomeComponent, canActivate: [AuthenticationGuard] },
  { path: 'client/new', component: AddClientComponent },
  { path: 'client/edit', component: AddClientComponent },
  { path: 'client-list', component: ClientListComponent },
  { path: 'dept-list/:cid', component: DepartmentListComponent },
  { path: 'client/dept/edit/:did', component: AddClientComponent },
  { path: 'client/:cid/dept/new', component: AddClientComponent },
  { path: 'amcMaster/new', component: CreateAmcMasterComponent },
  { path: 'list', component: ListcategoryComponent },
  { path: 'reportslist', component: ReportComponent },
  { path: 'profile/:userId', component: ProfileComponent },
  { path: 'editprofile/:userId', component: EditProfileComponent },
  { path: 'allamcdetailsfilter', component: AllAmcFilterComponent },
  { path: 'usersfilter', component: UsersFilterComponent },
  { path: 'generatereport', component: GenerateReportComponent },
  { path: 'allAmcReport', component: AllAmcReportComponent },
  { path: 'taxlist', component:TaxListComponent},
  { path: 'invoicelist',component:InvoiceListComponent },
  { path: 'createincoice', component:CreateInvoiceComponent },
  { path: 'catogerylist', component:ListcategoryComponent },
  { path: 'currencylist', component:CurrencyListComponent },
  { path: 'paymentHlist', component:PaymentListComponent } ,
  { path: 'productChart' ,component:ProductPieComponent },
  { path: 'clientdashtable', component:ClientdashtableComponent },
  { path: 'createtax',component:TaxFComponent },
  { path: 'updatetax/:taxId', component:UpdateTaxComponent } ,
  { path: 'duepayment', component:DuePaymentComponent },
  { path: 'dueinvoice', component:CreateDueinvoiceComponent },
  { path: 'editdueinvoice/:id', component:EditDueinvoiceComponent},
  { path: 'createReceipt', component:CreateReceiptComponent },
  { path: 'sattled', component:SattlementComponent },
  { path: 'clientDetails/:date1/:date2', component: ClientDetailsComponent },
  { path: 'clientDetailsFilter', component: ClientDetailsFilterComponent },
  { path: 'fullDetails/:date1/:date2', component: FullDetailsComponent },
  { path: 'fullDetailsFilter', component: FullDetailsFilterComponent },
  { path: 'renewalAmcs/:date1/:date2', component: RenewalAmcsReportComponent },
  { path: 'renewedAmcs/:date1/:date2', component: RenewedAmcsReportComponent },
  { path: 'expiredAmcs/:date1/:date2', component: ExpiredAmcsReportComponent },
  { path: 'ClientAmc/:cId', component: ClientAmcComponent },
  { path: 'editprofile/:userId', component: EditProfileComponent },
  { path: 'list',component: ListcategoryComponent},
  { path: 'user', component: UserAddingComponent },
  { path: 'productlist',component: ProductlistComponent},
  { path: 'frequency',component: FrequencyComponent},
  { path: 'client/new', component: AddClientComponent},
  { path: 'client/edit', component: AddClientComponent},
  { path: 'client-list', component: ClientListComponent},
  { path: 'dept-list', component: DepartmentListComponent},
  { path: 'client/dept/edit', component: AddClientComponent},
  { path: 'client/:cid/dept/new', component: AddClientComponent},
  { path: 'amcMaster/new', component: CreateAmcMasterComponent},
  { path: 'amc-serial/new', component: AmcSerialComponent},
  { path: 'clients/:cid/amc-list', component: AmcMasterListComponent},
  { path: 'clients/depts/:did/amc-list', component: AmcSerialListComponent},
  { path: 'clients/amc-list/:no/full', component: AmcFullDataComponent},
  { path: 'clients/amc-list/:no/renew', component: AmcRenewEditComponent},
  {path:'userList',component: UserlistComponent},
  ];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
