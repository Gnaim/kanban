import { Component, OnInit, Inject } from '@angular/core';
import { ProjectsService } from '../../../services/projectService/projects.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Project } from 'src/app/entity/Project';
import { HttpHelpers } from 'src/app/services/helpers/httpHelpers';
import { BsModalRef } from 'ngx-bootstrap';
import { MyNotificationsService } from 'src/app/services/notifications/notifications.service';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss']
})
export class ProjectFormComponent implements OnInit {

  projectForm: FormGroup;
  project : Project;
  selectedMembers = [];
  submitted: boolean = false;
  isUpdate : boolean = false;
  members = [
    "Anass", "Anis", "Malek", "Naim"
  ];

  constructor(private bsModalRef: BsModalRef,private router: Router,
              private projectsService: ProjectsService,
              private formBuilder: FormBuilder,
              private notification : MyNotificationsService) {}
  
  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.projectForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      membersProject: [[], []],
    });
  }

  get getFormErrors() {
    return this.projectForm.controls; // to get access to errors in form
  }

  submitForm(){
    if (this.isUpdate == true) {
      this.updateProject();
    }else{
      this.createProject();
    }
  }

  createProject() {
    this.submitted = true;
    if (this.projectForm.invalid) {
      return; //stop if the form is not valid
    }

    const formValue = this.projectForm.value;
    const title = formValue['title'];
    const description = formValue['description'];
    this.project = new Project(title, description);

    this.projectsService.createProject(this.project).subscribe(
      (response) => {  
        console.log(HttpHelpers.parseData(response));
        this.bsModalRef.hide();
      },
      (error) => {
        this.notification.showErrorNotification(error);
      })
  }

  updateProject(){

  }
}