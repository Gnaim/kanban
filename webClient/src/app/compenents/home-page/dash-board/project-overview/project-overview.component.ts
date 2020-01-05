import { Component, OnInit, Input, Output, TemplateRef } from '@angular/core';
import { ProjectsService } from 'src/app/services/projectService/projects.service';
import { MyNotificationsService } from 'src/app/services/notifications/notifications.service';
import { EventEmitter } from '@angular/core';
import { Project } from 'src/app/entity/Project';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
@Component({
  selector: 'app-project-overview',
  templateUrl: './project-overview.component.html',
  styleUrls: ['./project-overview.component.scss']
})
export class ProjectOverviewComponent implements OnInit {
  bsModalRef: BsModalRef;
  private projectId : string;
  @Input('project') project : Project;
  @Output('refreshData') getProjectsEvent = new EventEmitter();
  
  constructor(private projectService: ProjectsService,
              private modalService: BsModalService,
              private notification:MyNotificationsService) { }

  ngOnInit() {
      this.projectId = this.project._id;
  }

  openModal(template: TemplateRef<any>) {
    this.bsModalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  confirm(): void {
    this.deleteProject();
    this.bsModalRef.hide();
  }
 
  decline(): void {
    this.bsModalRef.hide();
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