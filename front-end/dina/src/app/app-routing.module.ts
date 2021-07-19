import { UserProfComponent } from './user-prof/user-prof.component';
import { AuthGuard } from './_helpers/auth.guard';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { LogoutComponent } from './logout/logout.component';

const routes: Routes = [
  { path: '', redirectTo: '/welcome', pathMatch: 'full' },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'home', component: UserHomeComponent, canActivate: [AuthGuard] },
  { path: '404', component: NotFoundComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  // TODO(gliontos): Add this route dynamically after we have made sure that the user
  // is an admin user
  { path: 'admin', component: AdminPageComponent, canActivate: [AuthGuard] },
  { path: 'user-prof', component: UserProfComponent },
  { path: 'logout', component: LogoutComponent },
  { path: '**', redirectTo: '/404', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
