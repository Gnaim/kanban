import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { TaskFormComponent } from '../task-form/task-form.component';
import { ProjectsService } from 'src/app/services/projectService/projects.service';
import { HttpHelpers } from 'src/app/services/helpers/httpHelpers';
import { Project } from 'src/app/entity/Project';
import { MyNotificationsService } from 'src/app/services/notifications/notifications.service';

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.scss']
})
export class WorkComponent implements OnInit {

  bsModalRef: BsModalRef;
  emptyResponse: boolean = false;
  projects : Project[];

  constructor(private modalService: BsModalService,
              private projectService: ProjectsService, private notification:MyNotificationsService) {}

  ngOnInit() {
    this.getTasksByProject();
  }

  getTasksByProject(){
      this.projectService.getMyProjects().subscribe(
        (projects) =>{
          let jsonResponse = HttpHelpers.parseData(projects);
          
          this.projects = jsonResponse.projects as Project[];
          console.log(this.projects);
          let size = this.projects.length;
          if(size != 0){
            for(let i=0; i<size ;i++){
              if(this.projects[i].cards.length != 0){
                this.emptyResponse = false;
                return;
              }
              if(i == (size-1)){
                this.emptyResponse = true;
              }
            }
          }else{
            this.emptyResponse = true;
          }
        },
        (error) => {
          this.notification.showErrorNotification(error);
        });
  }

  openTaskCreation() {
    this.bsModalRef = this.modalService.show(TaskFormComponent, {class: 'modal-lg'});
    this.bsModalRef.content.closeBtnName = 'Close';
  }

}
