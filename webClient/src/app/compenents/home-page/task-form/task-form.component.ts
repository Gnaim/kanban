import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit {

  constructor(public bsModalRef: BsModalRef) { }
  people = [
    "Anass","Anis","Malek","Naim"
  ];
  selectedPeople = [];
  ngOnInit() {
  }

}
