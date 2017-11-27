﻿import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterializeModule } from 'angular2-materialize';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { LoginComponent } from './controller/login.component';
import { NavbarLoginComponent } from './controller/navbar-login.component';
import { FormLoginComponent } from './controller/form-login.component';

import { PrincipalComponent } from './controller/principal-component';
import { NavbarPrincipalComponent } from './controller/navbar-principal.component';
import { FooterPrincipalComponent } from './controller/footer-principal.component';

import { DashboardComponent } from './controller/dashboard.component';

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
      DashboardComponent
  ],
  imports: [
      BrowserModule,
      MaterializeModule,
      routing,
      routingSeller,
      FormsModule,
      ReactiveFormsModule
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
