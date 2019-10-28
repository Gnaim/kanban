import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { TaskFormComponent } from '../task-form/task-form.component';

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.scss']
})
export class WorkComponent implements OnInit {

  bsModalRef: BsModalRef;

  constructor(private modalService: BsModalService) {}

  ngOnInit() {
  }

  openTaskCreation() {
    this.bsModalRef = this.modalService.show(TaskFormComponent, {class: 'modal-lg'});
    this.bsModalRef.content.closeBtnName = 'Close';
  }
}
