import { RouterModule } from '@angular/router';
import { Injectable } from '@angular/core';


import { AppComponent } from './app.component';
//  Visitor
import { AboutUsComponent } from  './components/visitor/about-us.component';
import { HomeComponent } from  './components/visitor/home.component';
import { LogInComponent } from  './components/visitor/log-in.component';
import { SignUpComponent } from  './components/visitor/sign-up.component';

import { VisitorNavbarComponent } from  './components/visitor/visitor-navbar.component';
import { EmployeeNavbarComponent } from  './components/employee/employee-navbar.component';
import { EmployerNavbarComponent } from  './components/employer/employer-navbar.component';

import { RegisterEmployeeComponent } from  './components/visitor/register-employee.component';
import { RegisterEmployerComponent } from  './components/visitor/register-employer.component';

import { EmployerService } from './modules/http/visitor/employer.service';
import { EmployeeService } from './modules/http/visitor/employee.service';
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
// Guards
import { AdminGuard } from './modules/guards/admin.guard'
import { EmployeeGuard } from './modules/guards/employee.guard'
import { EmployerGuard } from './modules/guards/employer.guard'
import { VisitorGuard } from './modules/guards/visitor.guard'



import { NgModule }             from '@angular/core';
import {  Routes } from '@angular/router';
const routes: Routes = [
            {
                path: '',
                component: HomeComponent,
                canActivate: [VisitorGuard]
            },
            {
                path: 'aboutUs',
                component: AboutUsComponent
            },
            {
                path: 'logIn',
                component: LogInComponent
            },
            {
                path: 'signUp',
                component: SignUpComponent
            },
            {
                path: 'registerEmployer',
                component: RegisterEmployerComponent
            },
            {
                path: 'registerEmployee',
                component: RegisterEmployeeComponent
            },
            //  Employer Routes
            {
                path: 'employer',
                component: EmployerHomeComponent,
                canActivate: [EmployerGuard]
            },
            {
                path: 'employer/postJob',
                component: EmployerPostJobComponent,
                canActivate: [EmployerGuard]
            },
            {
                path: 'employer/clientJobHistory',
                component: EmployerJobHistoryComponent,
                canActivate: [EmployerGuard]
            },
            {
                path: 'employer/subscribes',
                component: EmployerSubscribeComponent,
                canActivate: [EmployerGuard]
            },
            {
                path: 'employer/messenger',
                component: EmployerMessengerComponent,
                canActivate: [EmployerGuard]
            },
            {
                path: 'employer/offers',
                component: EmployerOfferComponent,
                canActivate: [EmployerGuard]
            },
            {
                path: 'employer/account',
                component: EmployerAccountComponent,
                canActivate: [EmployerGuard]
            },
            // Employee Routes
            {
                path: 'employee',
                component: EmployeeHomeComponent,
                canActivate: [EmployeeGuard]
            },

            // Admin Routes
            
        ];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRouter {}