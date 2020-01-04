import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ProjectsService } from 'src/app/services/projectService/projects.service';
import { Project } from 'src/app/entity/Project';
import { HttpHelpers } from 'src/app/services/helpers/httpHelpers';
import { MyNotificationsService } from 'src/app/services/notifications/notifications.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ProjectFormComponent } from '../project-form/project-form.component';
import { TaskFormComponent } from '../task-form/task-form.component';
import { Card } from 'src/app/entity/card';
import { CardsService } from 'src/app/services/cardService/cards.service';

@Component({
  selector: 'app-single-project-details',
  templateUrl: './single-project-details.component.html',
  styleUrls: ['./single-project-details.component.scss']
})
export class SingleProjectDetailsComponent implements OnInit {
  project: Project;
  projectCards: Card[];
  id: string;
  isLoading: boolean;
  errorGetData : boolean;
  bsModalRef: BsModalRef;

  constructor(private activatedRoute: ActivatedRoute,
              private projectService: ProjectsService, 
              private cardService:CardsService,
              private router: Router,
              private modalService: BsModalService,
              private notification: MyNotificationsService) {}

  ngOnInit() {
    this.isLoading = true;
    this.errorGetData = false;
    this.activatedRoute.paramMap.subscribe((params) => {
      this.id = params.get('id');
    });
    this.getProject();
    this.getProjectCards();
    this.isLoading = false;
  }

  getProject(){
    this.projectService.getProjectById(this.id).subscribe(
      (project) => {
        let jsonResponse = HttpHelpers.parseData(project.body);
        this.project = jsonResponse.project as Project;
      },
      (error) => {
        this.errorGetData = this.notification.showErrorNotification(error);
      });
  }

  getProjectCards(){
    this.cardService.getCardsByProject(this.id).subscribe(
      (cards) => {
        console.log(cards);
        let jsonResponse = HttpHelpers.parseData(cards.body);
        this.projectCards = jsonResponse as Card[];
      },(error) => {
        this.notification.showErrorNotification(error);
      });
  }

  openEditProject(){
    const initialState = {
      project : this.project,
      isUpdate : true
    }
    this.bsModalRef = this.modalService.show(ProjectFormComponent,{initialState,class: 'modal-lg'});
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

  openTaskCreation(){
    const initialState = {
      project : this.project
    }
    this.bsModalRef = this.modalService.show(TaskFormComponent,{initialState,class: 'modal-lg'});
    this.modalService.onHidden.subscribe((reason:string) => {
        if(reason != "backdrop-click"){     
          this.ngOnInit();
      }
    })
  }

  cardsUpdated($event){
    console.log($event);
    this.ngOnInit();
  }
}