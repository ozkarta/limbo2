import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { LocalStorageModule } from 'angular-2-local-storage';

import { AppComponent } from './app.component';
// General
import { LogOutComponent } from './components/log-out.component';

// Visitor
import { AboutUsComponent } from  './components/visitor/about-us.component';
import { HomeComponent } from  './components/visitor/home.component';
import { LogInComponent } from  './components/visitor/log-in.component';
import { SignUpComponent } from  './components/visitor/sign-up.component';

//import { VisitorNavbarComponent } from  './components/visitor-navbar.component';
import { VisitorNavbarComponent } from  './components/visitor/visitor-navbar.component';
import { EmployeeNavbarComponent } from  './components/employee/employee-navbar.component';
import { EmployerNavbarComponent } from  './components/employer/employer-navbar.component';

import { RegisterEmployeeComponent } from  './components/visitor/register-employee.component';
import { RegisterEmployerComponent } from  './components/visitor/register-employer.component';
//Employer 
import { EmployerHomeComponent } from  './components/employer/home-component'

import { EmployerAccountComponent } from  './components/employer/account.component';
import { EmployerJobHistoryComponent } from  './components/employer/job-history.component';
import { EmployerMessengerComponent } from  './components/employer/messenger.component';
import { EmployerPostJobComponent } from  './components/employer/post-job.component';
import { EmployerSubscribeComponent } from  './components/employer/subscribe.component';
import { EmployerOfferComponent } from  './components/employer/offer.component';

//Employee 
import { EmployeeHomeComponent } from './components/employee/home-component';
// Services
import { EmployerService } from './modules/http/visitor/employer.service';
import { EmployeeService } from './modules/http/visitor/employee.service';
import { Authentication } from './modules/http/visitor/authentication.service';

import { AppRouter } from './Router.component';


// Guards
import { AdminGuard } from './modules/guards/admin.guard'
import { EmployeeGuard } from './modules/guards/employee.guard'
import { EmployerGuard } from './modules/guards/employer.guard'
import { VisitorGuard } from './modules/guards/visitor.guard'

@NgModule({
  declarations: [
    //General
    LogOutComponent,
    AppComponent,
    // Visitor
    AboutUsComponent,
    HomeComponent,
    LogInComponent,
    SignUpComponent,
    VisitorNavbarComponent,
    EmployeeNavbarComponent,
    EmployerNavbarComponent,
    RegisterEmployeeComponent,
    RegisterEmployerComponent,
    // Employer
    EmployerHomeComponent,
    EmployerAccountComponent,
    EmployerJobHistoryComponent,
    EmployerMessengerComponent,
    EmployerPostJobComponent,
    EmployerSubscribeComponent,
    EmployerOfferComponent,
    // Employee 
    EmployeeHomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,    
    AppRouter
  ],
  providers: [
    //
    EmployerService,EmployeeService,Authentication,LocalStorageModule,
    //Guards
    AdminGuard,EmployerGuard,EmployeeGuard,VisitorGuard
    //
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
