import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ProjectFormComponent } from '../project-form/project-form.component';
import { Project } from 'src/app/entity/Project';
import { ProjectsService } from 'src/app/services/projectService/projects.service';
import { HttpHelpers } from 'src/app/services/helpers/httpHelpers';
import { Response } from 'src/app/entity/response';
import { MyNotificationsService } from 'src/app/services/notifications/notifications.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  bsModalRef: BsModalRef;
  projects : Project[];
  emptyProjects : boolean;
  errorGetProject : boolean;
  loadingData : Boolean;

  constructor(private modalService: BsModalService,
              private projectService: ProjectsService,
              private notification : MyNotificationsService) { }

  ngOnInit() {
    this.loadingData = true;
    this.emptyProjects = false;
    this.errorGetProject = false;
    this.getProjects();
  }

  getProjects() {
    this.projectService.getMyProjects().subscribe(
      (projects) =>{
        let jsonResponse = HttpHelpers.parseData(projects);
        this.projects = jsonResponse.projects as Project[];

        if(this.projects.length == 0){
          this.emptyProjects = true;
        }else{
          this.emptyProjects = false;
        }
        this.loadingData = false;
      },
      (error) => {
        this.errorGetProject = this.notification.showErrorNotification(error);
        this.loadingData = false;
      })
  }

  openProjectCreation() {
    this.bsModalRef = this.modalService.show(ProjectFormComponent, { class: 'modal-lg' });
    this.modalService.onHidden.subscribe((reason:string) => {
        if(reason != "backdrop-click"){     
          this.notification.showProjectCreationSuccess();
          this.getProjects();
      }
    })
  }

   /* openProjectUpdate() {
    const initialState = {
      isUpdate : true,
      class: 'modal-lg'
    }
  this.bsModalRef = this.modalService.show(ProjectFormComponent,{initialState});
    this.modalService.onHidden.subscribe((reason:string) => {
      //if(reason != "backdrop-click"){     
        this.notification.showProjectUpdateSuccess();
     // }
    })*/
  
}