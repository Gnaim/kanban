import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ProjectsService } from 'src/app/services/projectService/projects.service';
import { Project } from 'src/app/entity/Project';
import { HttpHelpers } from 'src/app/services/helpers/httpHelpers';
import { MyNotificationsService } from 'src/app/services/notifications/notifications.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ProjectFormComponent } from '../project-form/project-form.component';

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
  bsModalRef: BsModalRef;

  constructor(private activatedRoute: ActivatedRoute,
              private projectService: ProjectsService, 
              private router: Router,
              private modalService: BsModalService,
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

  openEditProject(){
    const initialState = {
      project : this.project,
      isUpdate : true,
      class: 'modal-lg'
    }
    this.bsModalRef = this.modalService.show(ProjectFormComponent,{initialState});
    this.modalService.onHidden.subscribe((reason:string) => {
        if(reason != "backdrop-click"){     
          this.ngOnInit();
      }
    })
  }

  deleteProject(){
    if(this.id){
      this.projectService.deleteProject(this.id).subscribe(
        (response) => {
          this.notification.showProjectDeleteSuccess();  
          this.router.navigate(['/Home/Projects']);
        },
        (error) => {
          this.notification.showErrorNotification(error);
        }
      );
    }else{
      this.notification.showError();
    }
  }
}