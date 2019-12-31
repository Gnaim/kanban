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

  private projectId : number;
  @Input('project') project : Project;
  @Output('refreshData') getProjectsEvent = new EventEmitter();
  
  constructor(private projectService: ProjectsService,private notification:MyNotificationsService) { }

  ngOnInit() {
      this.projectId = this.project._id;
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