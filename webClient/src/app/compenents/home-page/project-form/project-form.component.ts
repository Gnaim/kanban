import { Component, OnInit, Inject } from '@angular/core';
import { HomePageComponent } from '../home-page.component';
import { ProjectsService } from '../../../services/projectService/projects.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss']
})
export class ProjectFormComponent implements OnInit {

  projectForm: FormGroup;
  submitted: boolean = false;
  constructor(private router: Router, private projectsService: ProjectsService, private formBuilder: FormBuilder) {

  }
  selectedMembers = [];
  members = [
    "Anass", "Anis", "Malek", "Naim"
  ];

  priorities = [
    { name: "High", class: "fa-arrow-up" },
    { name: "Normale", class: "fa-grip-lines" },
    { name: "Low", class: "fa-arrow-down" }

  ];
  initForm() {
    this.projectForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.pattern('.+')]],
      priority: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.pattern('.+')]],
      membersProject: [[], []],
    });
  }
  get getFormErrors() {
    return this.projectForm.controls; // to get access to errors in form
  }

  createProject() {
    this.submitted = true;
    if (this.projectForm.invalid) {
      return; //stop if the form is not valid
    }
    const formValue = this.projectForm.value;
    const title = formValue['title'];
    const priority = formValue['priority'];
    const description = formValue['description'];
    const members = formValue['membersProject'];
    console.log("members :" + members);
    console.log(`title:${title} \n priority:${priority} \n description:${description}`)
    let result: boolean = this.projectsService.createProject(title, priority, description, members);

    if (result == true) {
      this.router.navigate(['/Home/Projects']);
    } else {

      //Print the Error 
    }

  }
  ngOnInit() {
    this.initForm();
  }

}
