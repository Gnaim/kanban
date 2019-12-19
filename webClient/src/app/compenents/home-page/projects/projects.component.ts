import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ProjectFormComponent } from '../project-form/project-form.component';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  bsModalRef: BsModalRef;

  constructor(private modalService: BsModalService) { }

  ngOnInit() {
  }

  openProjectCreation() {

    this.bsModalRef = this.modalService.show(ProjectFormComponent, { class: 'modal-lg' });
    this.bsModalRef.content.closeBtnName = 'Close';
  }

}
