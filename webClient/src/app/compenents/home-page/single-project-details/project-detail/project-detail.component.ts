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

  constructor(private modalService: BsModalService) { }

  ngOnInit() {
  }

  openMembersList() {

    this.bsModalRef = this.modalService.show(MembreListComponent, { class: 'modal-md' });
    this.bsModalRef.content.closeBtnName = 'Close';
  }

}
