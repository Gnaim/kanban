import { Component, OnInit, Inject } from '@angular/core';
import { HomePageComponent } from '../home-page.component';
import { ProjectsService } from '../../../services/projects.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss']
})
export class ProjectFormComponent implements OnInit {

  projectForm: FormGroup;
  constructor(private router: Router, private projectsService: ProjectsService, private formBuilder: FormBuilder) {

  }
  members = [
    "Anass", "Anis", "Malek", "Naim"
  ];

  priorities = [
    { name: "High", class: "fa-arrow-up" },
    { name: "Normale", class: "fa-grip-lines" },
    { name: "low", class: "fa-arrow-down" }

  ];
  initForm() {
    this.projectForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.pattern('[a-z].+')]],
      priority: [0, [Validators.required, Validators.pattern('.+')]],
      description: ['', [Validators.required, Validators.pattern('.+')]],
      membersProject: [[''], [Validators.required]],
    });
  }

  createProject() {
    const formValue = this.projectForm.value;
    const title = formValue['title'];
    const priority = formValue['priority'];
    const description = formValue['description'];
    const members = formValue['membersProject'];

    let result: boolean = this.projectsService.createProject(title, priority, description, members);

    if (result) {
      this.router.navigate(['/Home/Projects']);
    } else {

      //Print the Error 
    }

  }
  ngOnInit() {
    this.initForm();
  }

}
