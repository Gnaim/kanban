import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignUpComponent } from './compenents/sign-up/sign-up.component';
import { LogInComponent } from './compenents/log-in/log-in.component';
import { HomePageComponent } from './compenents/home-page/home-page.component';
import { DashBoardComponent } from './compenents/home-page/dash-board/dash-board.component';
import { ProjectsComponent } from './compenents/home-page/projects/projects.component';
import { WorkComponent } from './compenents/home-page/work/work.component';
import { PeopleComponent } from './compenents/home-page/people/people.component';
import { SingleProjectDetailsComponent } from './compenents/home-page/single-project-details/single-project-details.component';
import { ProfileComponent } from './compenents/home-page/profile/profile.component';
import { ErrorPageComponent } from './compenents/errors/error-page/error-page.component';
import { ResetPasswordComponent } from './compenents/reset-password/reset-password.component';
import { AuthGuardService as Guard } from './services/guards/authguard.service';
import { TokenGuardService as TokenGuard } from './services/guards/tokenguard.service';
import { ConfirmMailComponent } from './compenents/confirm-mail/confirm-mail.component';

const homePageChildren: Routes = [
  { path: 'Dashboard', component: DashBoardComponent, canActivate: [TokenGuard] },
  { path: 'Projects', component: ProjectsComponent, canActivate: [TokenGuard] },
  { path: 'Work', component: WorkComponent, canActivate: [TokenGuard] },
  { path: 'People', component: PeopleComponent, canActivate: [TokenGuard] },
  { path: 'Project/:id', component: SingleProjectDetailsComponent, canActivate: [TokenGuard] },
  { path: 'Profile', component: ProfileComponent, canActivate: [TokenGuard] }
];

const routes: Routes = [
  { path: '', component: LogInComponent, canActivate: [Guard] },
  { path: 'Login', component: LogInComponent, canActivate: [Guard] },
  { path: 'Signup', component: SignUpComponent, canActivate: [Guard] },
  { path: 'ResetPassword/:token', component: ResetPasswordComponent, canActivate: [Guard] },
  { path: 'ConfirmMail/:token', component: ConfirmMailComponent, canActivate: [Guard] },
  {
    path: 'Home',
    component: HomePageComponent,
    children: homePageChildren
  },
  { path: '**', component: ErrorPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
