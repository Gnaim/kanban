import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-project-overview',
  templateUrl: './project-overview.component.html',
  styleUrls: ['./project-overview.component.scss']
})
export class ProjectOverviewComponent implements OnInit {

  @Input('id') projectId : number;
  @Input('name') projectName : string;
  @Input('description') projectDescription : string; 
  @Input('createdAt') creationDate : string;

  constructor() { }

  ngOnInit() {
    
  }

}