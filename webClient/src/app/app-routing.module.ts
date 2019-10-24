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

const homePageChildren: Routes = [
  { path: 'Dashboard', component: DashBoardComponent },
  { path: 'Projects', component: ProjectsComponent },
  { path: 'Work', component: WorkComponent },
  { path: 'People', component: PeopleComponent },
  { path: 'Project', component: SingleProjectDetailsComponent }
];

const routes: Routes = [
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
