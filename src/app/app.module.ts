import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterializeModule } from 'angular2-materialize';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PersistenceModule } from 'angular-persistence';

import { AppComponent } from './app.component';

import { RegisterComponent } from './controller/register.component';
import { NavbarRegisterComponent } from './controller/navbar-register.component';
import { FormRegisterComponent } from './controller/form-register.component';

import { LoginComponent } from './controller/login.component';
import { NavbarLoginComponent } from './controller/navbar-login.component';
import { FormLoginComponent } from './controller/form-login.component';

import { PrincipalComponent } from './controller/principal-component';
import { NavbarPrincipalComponent } from './controller/navbar-principal.component';
import { FooterPrincipalComponent } from './controller/footer-principal.component';

import { DashboardComponent } from './controller/dashboard.component';
import { SearchComponent } from './controller/search.component';
import { ProfileComponent } from './controller/profile.componen';
import { ProfileSellerComponent } from './controller/profile-seller.component';
import { SendQuoteComponent } from './controller/send-quote.component';
import { QuotationsComponent1 } from './controller/quotations-1.component';
import { QuotationsComponent2 } from './controller/quotations-2.component';
import { QuotationsComponent3 } from './controller/quotations-3.component';
import { QuotationsComponent4 } from './controller/quotations-4.component';
import { QuotationsComponent5 } from './controller/quotations-5.component';
import { QuotationsComponent6 } from './controller/quotations-6.component';
import { QuotationDetailComponent } from './controller/quotation-detail.component';

import { routing, appRoutingProviders, routingSeller } from './app.routing';

@NgModule({
  declarations: [
      AppComponent,
      NavbarLoginComponent,
      FormLoginComponent,
      LoginComponent,
      NavbarPrincipalComponent,
      FooterPrincipalComponent,
      PrincipalComponent,
      DashboardComponent,
      RegisterComponent,
      NavbarRegisterComponent,
      FormRegisterComponent,
      SearchComponent,
      ProfileSellerComponent,
      SendQuoteComponent,
      QuotationsComponent1,
      QuotationsComponent2,
      QuotationsComponent3,
      QuotationsComponent4,
      QuotationsComponent5,
      QuotationsComponent6,
      QuotationDetailComponent,
      ProfileComponent
  ],
  imports: [
      BrowserModule.withServerTransition({ appId: 'Comprador - Cotizame' }),
      MaterializeModule,
      routing,
      routingSeller,
      FormsModule,
      ReactiveFormsModule,
      HttpClientModule,
      PersistenceModule
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
