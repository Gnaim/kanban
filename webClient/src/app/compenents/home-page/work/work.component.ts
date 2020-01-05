import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { TaskFormComponent } from '../task-form/task-form.component';
import { ProjectsService } from 'src/app/services/projectService/projects.service';
import { HttpHelpers } from 'src/app/services/helpers/httpHelpers';
import { Project } from 'src/app/entity/Project';
import { MyNotificationsService } from 'src/app/services/notifications/notifications.service';
import { Card } from 'src/app/entity/card';

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.scss']
})
export class WorkComponent implements OnInit {

  bsModalRef: BsModalRef;
  emptyResponse: boolean;
  projects : Project[];
  collapseIdsLink = [];
  collapseIdsDiv = [];
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

          for(let j=0;j<size;j++){
            this.collapseIdsDiv.push("a" + Math.random().toString(36).substring(7));
            this.collapseIdsLink.push("#"+this.collapseIdsDiv[j]);
          }

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

  showTask(card:Card,project:Project){
    this.openTaskDetail(card,project);
}

openTaskDetail(selectedCard:Card,project:Project) {
    const initialState = {
        projectName : project.name,
        projectId : project._id,
        projectMembers : project.members,
        card : selectedCard,
        isConsult : true
    }
    this.bsModalRef = this.modalService.show(TaskFormComponent,{initialState,class: 'modal-lg'});
    this.bsModalRef.content.closeBtnName = 'Close';
    const subscription = this.modalService.onHidden.subscribe((reason:string) => {
      if(reason != "backdrop-click"){ 
        this.getTasksByProject();
        subscription.unsubscribe();
      }
    })
  }
  
}
