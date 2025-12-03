import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent as AuthLayout } from './pages/layout-page/layout-page.component';
import { LayoutPageComponent as MainLayout } from '../shared/pages/layout-page/layout-page.component'; 
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '', 
    component: AuthLayout,
    children: [
      { path: 'login', component: LoginPageComponent },
      { path: 'register', component: RegisterPageComponent },
    ]
  },
  {
    path: 'profile',
    component: MainLayout,
    canActivate: [authGuard],
    children: [
       { path: '', component: ProfilePageComponent }
    ]
  }
];
@NgModule({ imports: [RouterModule.forChild(routes)], exports: [RouterModule] })
export class AuthRoutingModule {}
