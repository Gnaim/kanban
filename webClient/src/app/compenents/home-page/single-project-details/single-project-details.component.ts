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
  projectLoaded: boolean = false;
  constructor(private activatedRoute: ActivatedRoute, private projectService: ProjectsService, private notification: MyNotificationsService) {
    this.activatedRoute.paramMap.subscribe((params) => {
      console.log(params.keys);
      this.id = params.get('id');
    });

    projectService.getProjectById(this.id).subscribe(
      (project) => {
        let jsonResponse = HttpHelpers.parseData(project);
        this.project = jsonResponse.project as Project;
        console.log(this.project);
        this.projectLoaded = true;
      },
      (error) => {
        this.notification.showErrorNotification(error);
      });

  }

  ngOnInit() {


  }

}
