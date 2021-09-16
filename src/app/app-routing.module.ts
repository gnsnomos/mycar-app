import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActivateLoginGuard } from './activate-login.guard';
import { HomeComponent } from './home/home.component';
import { SignInComponent } from './signin/signin.component';


const routes: Routes = [
  { path: 'login', component: SignInComponent },
  { path: 'home', component: HomeComponent, canActivate: [ActivateLoginGuard] },
  { path: '**', component: SignInComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
