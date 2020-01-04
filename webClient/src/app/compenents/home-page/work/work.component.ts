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
  emptyResponse: boolean;
  projects : Project[];
  isLoading: boolean;
  errorGetTasks : boolean;

  constructor(private modalService: BsModalService,
              private projectService: ProjectsService,
              private notification:MyNotificationsService) {}

  ngOnInit() {
    this.isLoading = true;
    this.emptyResponse = false;
    this.errorGetTasks = false;
    this.getTasksByProject();
  }

  getTasksByProject(){
      this.projectService.getMyProjects().subscribe(
        (projects) =>{
          let jsonResponse = HttpHelpers.parseData(projects);
          this.projects = jsonResponse.projects as Project[];
          let size = this.projects.length;

          if(size != 0){
            for(let i=0; i<size ;i++){
              if(this.projects[i].cards.length != 0){
                this.emptyResponse = false;
                break;
              }
              if(i == (size-1)) this.emptyResponse = true;
            }
          }else{
            this.emptyResponse = true;
          }
          this.isLoading = false;
        },
        (error) => {
          this.errorGetTasks = this.notification.showErrorNotification(error);
          this.isLoading = false;
        });
  }
}
