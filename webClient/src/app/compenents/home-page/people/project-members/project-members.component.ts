import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/entity/user';

@Component({
  selector: 'app-project-members',
  templateUrl: './project-members.component.html',
  styleUrls: ['./project-members.component.scss']
})
export class ProjectMembersComponent implements OnInit {

  @Input('projectName') name: string;
  @Input('members') members: User[];
  idCollapse : string;
  constructor() { }

  ngOnInit() {
    console.log(this.members);
    this.idCollapse = "a" + Math.random().toString(36).substring(7);
  }

}
