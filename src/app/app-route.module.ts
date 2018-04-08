import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { AuthenticationGuard } from "./user/authentication-guard.service";
import { UserService } from "./user/user.service";
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
    UserService
  ],
  declarations: [
    LoginComponent,
    MainComponent
  ]
})
export class AppRouteModule { }
