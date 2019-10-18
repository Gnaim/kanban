import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';
import { AuthGuardService } from './core/auth/auth-guard.service';
import { ProfileComponent } from './modules/profile/profile.component';
import { HelpComponent } from './modules/help/help.component';


const routes: Routes = [
  {path: '', component: HomeComponent, canActivate: [AuthGuardService]},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService]},
  {path: 'settings', component: ProfileComponent, canActivate: [AuthGuardService]},
  {path: 'help', component: HelpComponent, canActivate: [AuthGuardService]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
