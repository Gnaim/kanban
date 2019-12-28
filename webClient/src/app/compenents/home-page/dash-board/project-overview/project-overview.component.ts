import { Component, OnInit, Input, Output } from '@angular/core';
import { ProjectsService } from 'src/app/services/projectService/projects.service';
import { MyNotificationsService } from 'src/app/services/notifications/notifications.service';
import { EventEmitter } from '@angular/core';
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

  constructor(private projectService: ProjectsService,private notification:MyNotificationsService) { }

  ngOnInit() {
  }

  deleteProject() {
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