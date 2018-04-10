import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthenticationGuard } from "./user/authentication-guard.service";
import { UserService } from "./user/user.service";
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { DragdropDirective } from './main/directives/dragdrop.directive';
import { DragContainerComponent } from './main/drag-container/drag-container.component';

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
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule,
    DragdropDirective
  ],
  providers: [
    AuthenticationGuard,
    UserService
  ],
  declarations: [
    LoginComponent,
    MainComponent,
    DragContainerComponent,
    DragdropDirective
  ]
})
export class AppRouteModule { }
