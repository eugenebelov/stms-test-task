import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { AuthenticationGuard } from "./authentication-guard.service";
import { LoginService } from "./login/login.service";
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'main', component: MainComponent, canActivate: [AuthenticationGuard] },
  { path: '', redirectTo: '/main', pathMatch: 'full', canActivate: [AuthenticationGuard]},
  { path: '**', redirectTo: '/main', pathMatch: 'full'}
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    AuthenticationGuard,
    LoginService
  ],
  declarations: [
    LoginComponent,
    MainComponent
  ]
})
export class AppRouteModule { }
