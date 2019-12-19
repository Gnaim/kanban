import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { SignUpComponent } from './compenents/sign-up/sign-up.component';
import { LogInComponent } from './compenents/log-in/log-in.component';
import { HomePageComponent } from './compenents/home-page/home-page.component';
import { DashBoardComponent } from './compenents/home-page/dash-board/dash-board.component';
import { ProjectsComponent } from './compenents/home-page/projects/projects.component';
import { WorkComponent } from './compenents/home-page/work/work.component';
import { PeopleComponent } from './compenents/home-page/people/people.component';
import { SingleProjectDetailsComponent } from './compenents/home-page/single-project-details/single-project-details.component';
import { ProfileComponent } from './compenents/home-page/profile/profile.component';
import { ProjectFormComponent } from './compenents/home-page/project-form/project-form.component';
import { ErrorPageComponent } from './compenents/errors/error-page/error-page.component';
import { ResetPasswordComponent } from './compenents/reset-password/reset-password.component';

const homePageChildren: Routes = [
  { path: 'Dashboard', component: DashBoardComponent },
  { path: 'Projects', component: ProjectsComponent },
  { path: 'Work', component: WorkComponent },
  { path: 'People', component: PeopleComponent },
  { path: 'Project/:id', component: SingleProjectDetailsComponent },
  { path: 'Profile', component: ProfileComponent },
  { path: 'project-form', component: ProjectFormComponent }
];

const routes: Routes = [
  { path: '', component: LogInComponent },
  { path: 'Login', component: LogInComponent },
  { path: 'Signup', component: SignUpComponent },
  { path: 'ResetPassword/:token', component: ResetPasswordComponent },
  {
    path: 'Home',
    component: HomePageComponent,
    children: homePageChildren
  },
  { path: 'Error', component: ErrorPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
