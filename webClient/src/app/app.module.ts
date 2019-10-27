import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './compenents/nav-bar/nav-bar.component';
import { SideBarComponent } from './compenents/home-page/side-bar/side-bar.component';
import { LogInComponent } from './compenents/log-in/log-in.component';
import { SignUpComponent } from './compenents/sign-up/sign-up.component';
import { HomePageComponent } from './compenents/home-page/home-page.component';
import { DashBoardComponent } from './compenents/home-page/dash-board/dash-board.component';
import { ProjectOverviewComponent } from './compenents/home-page/dash-board/project-overview/project-overview.component';
import { TaskOverviewComponent } from './compenents/home-page/dash-board/task-overview/task-overview.component';
import { ProjectsComponent } from './compenents/home-page/projects/projects.component';
import { WorkComponent } from './compenents/home-page/work/work.component';
import { TasksListComponent } from './compenents/home-page/work/tasks-list/tasks-list.component';
import { PeopleComponent } from './compenents/home-page/people/people.component';
import { ProjectMembersComponent } from './compenents/home-page/people/project-members/project-members.component';
import { SingleProjectDetailsComponent } from './compenents/home-page/single-project-details/single-project-details.component';
import { ProjectDetailComponent } from './compenents/home-page/single-project-details/project-detail/project-detail.component';
import { MembreListComponent } from './compenents/home-page/single-project-details/membre-list/membre-list.component';
import { ErrorPageComponent } from './errors/error-page/error-page.component';
import { ProjectFormComponent } from './compenents/home-page/project-form/project-form.component';
import { TaskFormComponent } from './compenents/home-page/task-form/task-form.component';
import { TabsModule } from 'ngx-bootstrap';
import { ProfileComponent } from './compenents/home-page/profile/profile.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    SideBarComponent,
    LogInComponent,
    SignUpComponent,
    HomePageComponent,
    DashBoardComponent,
    ProjectOverviewComponent,
    TaskOverviewComponent,
    ProjectsComponent,
    WorkComponent,
    TasksListComponent,
    PeopleComponent,
    ProjectMembersComponent,
    SingleProjectDetailsComponent,
    ProjectDetailComponent,
    MembreListComponent,
    ErrorPageComponent,
    ProjectFormComponent,
    TaskFormComponent,
    ProfileComponent
  ],

  entryComponents: [TaskFormComponent],
  imports: [BrowserModule, AppRoutingModule, TabsModule.forRoot(), ModalModule.forRoot(),NgSelectModule, FormsModule],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
