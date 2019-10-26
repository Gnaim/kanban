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

const homePageChildren: Routes = [
  { path: 'Dashboard', component: DashBoardComponent },
  { path: 'Projects', component: ProjectsComponent },
  { path: 'Work', component: WorkComponent },
  { path: 'People', component: PeopleComponent },
  { path: 'Project', component: SingleProjectDetailsComponent },
  { path: 'Profile', component: ProfileComponent },
  {path: 'project-form',component:ProjectFormComponent }
];

const routes: Routes = [
  { path: '', component: LogInComponent },
  { path: 'Login', component: LogInComponent },
  { path: 'Signup', component: SignUpComponent },
  {
    path: 'Home',
    component: HomePageComponent,
    children: homePageChildren
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
