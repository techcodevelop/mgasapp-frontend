import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { authGuard } from './utils/auth.guard';

export const routes: Routes = [

    { path: '', component: LoginComponent },
    { path: 'signIn', component: SignInComponent },
    { path: 'dashboard', component: DashboardComponent, canActivate:[authGuard] },
    { path: '**', redirectTo: '', pathMatch: 'full' }

];


