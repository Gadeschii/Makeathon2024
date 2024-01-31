import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { HeaderComponent } from '../header/header.component';
import { BodyUserListComponent } from '../body-user-list/body-user-list.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { AddParticipantComponent } from '../add-participant/add-participant.component';
import { ViewMetricsComponent } from '../view-metrics/view-metrics.component';



const routes: Routes = [

    { path: 'auth/login', component: LoginComponent },
    { path: 'auth/register', component: RegisterComponent },
    { path: 'auth/header', component: HeaderComponent },
    { path: 'auth/body', component: BodyUserListComponent },
    { path: 'auth/dashboard', component: DashboardComponent },
    { path: 'auth/viewmetrics', component: ViewMetricsComponent },
    { path: 'auth/addparticipant', component: AddParticipantComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
