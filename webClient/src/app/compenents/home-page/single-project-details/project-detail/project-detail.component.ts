import { Component, OnInit, Input } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { MembreListComponent } from '../membre-list/membre-list.component';
import { Project } from 'src/app/entity/Project';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit {
  @Input('project') project: Project;
  bsModalRef: BsModalRef;
  adminName : string;
  constructor(private modalService: BsModalService) { }

  ngOnInit() {
    for(let member of this.project.members){
        if(member.role == 'admin'){
          this.adminName = member.email;
        }
    }
  }

  openMembersList() {
    const initialState = {
      membersList : this.project.members,
      class: 'modal-lg'
    }
    this.bsModalRef = this.modalService.show(MembreListComponent, {initialState});
    this.bsModalRef.content.closeBtnName = 'Close';
  }

}
