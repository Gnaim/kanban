import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { MembreListComponent } from '../membre-list/membre-list.component';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit {
  bsModalRef: BsModalRef;

  constructor(private modalService: BsModalService) {}

  ngOnInit() {
  }

  openMembersList() {
    
    this.bsModalRef = this.modalService.show(MembreListComponent, {class: 'modal-md'});
    this.bsModalRef.content.closeBtnName = 'Close';
  }

}
