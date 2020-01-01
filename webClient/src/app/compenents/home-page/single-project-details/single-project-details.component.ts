import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ProjectsService } from 'src/app/services/projectService/projects.service';
import { Project } from 'src/app/entity/Project';
import { HttpHelpers } from 'src/app/services/helpers/httpHelpers';
import { MyNotificationsService } from 'src/app/services/notifications/notifications.service';

@Component({
  selector: 'app-single-project-details',
  templateUrl: './single-project-details.component.html',
  styleUrls: ['./single-project-details.component.scss']
})
export class SingleProjectDetailsComponent implements OnInit {
  project: Project;
  id: string;
  isLoading: boolean;
  errorGetData : boolean;

  constructor(private activatedRoute: ActivatedRoute,
              private projectService: ProjectsService, 
              private notification: MyNotificationsService) {}

  ngOnInit() {
    this.isLoading = true;
    this.errorGetData = false;
    this.activatedRoute.paramMap.subscribe((params) => {
      console.log(params.keys);
      this.id = params.get('id');
    });
    this.getProject();
  }

  getProject(){
    this.projectService.getProjectById(this.id).subscribe(
      (project) => {
        let jsonResponse = HttpHelpers.parseData(project);
        this.project = jsonResponse.project as Project;
        console.log(this.project);
        this.isLoading = false;
      },
      (error) => {
        this.errorGetData = this.notification.showErrorNotification(error);
        this.isLoading = false;
      });
  }
}