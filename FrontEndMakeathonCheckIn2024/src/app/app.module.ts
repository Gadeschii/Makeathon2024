import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth/auth.routing.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BodyUserListComponent } from './body-user-list/body-user-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule } from '@angular/forms';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FooterComponent } from './footer/footer.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { LocationStrategy, HashLocationStrategy } from '@angular/common'; //Necessary for routing/deployment


import { AgChartsAngularModule } from "ag-charts-angular";
import { RouterModule, Routes } from "@angular/router";
import { routing } from './app.routing';
import { AddParticipantComponent } from './add-participant/add-participant.component';
import { ViewMetricsComponent } from './view-metrics/view-metrics.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BodyUserListComponent,
    FooterComponent,
    DashboardComponent,
    LoginComponent,
    AddParticipantComponent,
    ViewMetricsComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSlideToggleModule,
    BrowserModule,
    CommonModule,
    FormsModule,
    AuthRoutingModule,
    HttpClientModule,
    RouterModule,
    MatSelectModule,
    ReactiveFormsModule,
<<<<<<< HEAD
    AgChartsAngularModule
=======
    AgChartsAngularModule,
    
>>>>>>> parent of 018b5e7 (solver some from error and upgrade the angular cors)
  ],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
  //providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
