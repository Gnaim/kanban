import { Component, OnInit, Inject } from '@angular/core';
import { HomePageComponent } from '../home-page.component';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss']
})
export class ProjectFormComponent implements OnInit {
  members = [
    "Anass","Anis","Malek","Naim"
  ];
  selectedMembers=[];
  priorities= [
    {name:"High", colorClass:"bg-danger"},
    {name:"Normale", colorClass:"bg-warning"},
    {name:"low", colorClass:"bg-success"}
  
  ];
 
  constructor() {}
  createProject(){}

  ngOnInit() {}
}
