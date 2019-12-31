import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/entity/Project';
import { ProjectsService } from 'src/app/services/projectService/projects.service';
import { HttpHelpers } from 'src/app/services/helpers/httpHelpers';
import { MyNotificationsService } from 'src/app/services/notifications/notifications.service';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent implements OnInit {

  projects : Project[];
  emptyResponse : boolean;
  isLoading : boolean;
  errorGetData : boolean;

  constructor(private projectService: ProjectsService,private notification : MyNotificationsService){ }

  ngOnInit() {
    this.isLoading = true;
    this.emptyResponse = false;
    this.errorGetData = false;
    this.getMembersByProject();
  }

  getMembersByProject(){
    this.projectService.getMyProjects().subscribe(
    (projects) =>{
      let jsonResponse = HttpHelpers.parseData(projects);
      this.projects = jsonResponse.projects as Project[];
      if(this.projects.length !=0){
        this.emptyResponse = false;
      }else{
        this.emptyResponse = true;
      }
      this.isLoading = false;
    },
    (error) => {
      this.errorGetData = this.notification.showErrorNotification(error);
      this.isLoading = false;
    })
  }
}
