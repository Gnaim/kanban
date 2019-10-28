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
  
  priorities= [
    {name:"High", class:"fa-arrow-up"},
    {name:"Normale", class:"fa-grip-lines"},
    {name:"low", class:"fa-arrow-down"}
  
  ];
 
  constructor() {}
  createProject(){}

  ngOnInit() {}
}
