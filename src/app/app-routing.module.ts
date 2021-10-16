import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActivateLoginGuard } from './activate-login.guard';
import { HomeComponent } from './home/home.component';
import { JourneyComponent } from './journey/journey.component';
import { UpcomingServiceComponent } from './service/upcoming-service/upcoming-service.component';
import { SignInComponent } from './signin/signin.component';


const routes: Routes = [
  { path: 'login', component: SignInComponent },
  { path: 'home', component: HomeComponent, canActivate: [ActivateLoginGuard] },
  { path: 'journeys', component: JourneyComponent, canActivate: [ActivateLoginGuard] },
  { path: 'services', component: UpcomingServiceComponent, canActivate: [ActivateLoginGuard] },
  { path: '**', component: SignInComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
