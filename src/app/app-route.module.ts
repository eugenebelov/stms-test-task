import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthenticationGuard } from "@stms-app/user/auth/auth-guard.service";
import { UserService } from "@stms-app/user/user.service";
import { LoginComponent } from '@stms-app/login/login.component';
import { MainComponent } from '@stms-app/main/main.component';
import { StmsCommonModule } from '@stms-app/common/common.module';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'main', component: MainComponent, canActivate: [AuthenticationGuard] },
  { path: '', redirectTo: '/main', pathMatch: 'full', canActivate: [AuthenticationGuard]},
  { path: '**', redirectTo: '/main', pathMatch: 'full'}
]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    StmsCommonModule
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
