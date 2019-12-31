import { Component, OnInit, Input, Output } from '@angular/core';
import { ProjectsService } from 'src/app/services/projectService/projects.service';
import { MyNotificationsService } from 'src/app/services/notifications/notifications.service';
import { EventEmitter } from '@angular/core';
import { Project } from 'src/app/entity/Project';
@Component({
  selector: 'app-project-overview',
  templateUrl: './project-overview.component.html',
  styleUrls: ['./project-overview.component.scss']
})
export class ProjectOverviewComponent implements OnInit {

  @Input('id') projectId : number;
  @Input('name') projectName : string;
  @Input('description') projectDescription : string; 
  @Input('createdAt') creationDate : string;
  @Output('refreshData') getProjectsEvent = new EventEmitter();
  @Input('project') project : Project;

  constructor(private projectService: ProjectsService,private notification:MyNotificationsService) { }

  ngOnInit() {
    if(this.project){
      console.log(this.project);
      this.projectId = this.project._id;
      this.projectName = this.project.name;
      this.projectDescription = this.project.description;
      this.creationDate = this.project.createdAt.toString();
    }
  }

  deleteProject() {
    console.log("ID : "+this.projectId);
    this.projectService.deleteProject(this.projectId).subscribe(
      (response) => {
        this.notification.showProjectDeleteSuccess();  
        this.getProjectsEvent.emit("");
      },
      (error) => {
        this.notification.showErrorNotification(error);
      }
    );
  }
}