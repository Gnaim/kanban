import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { CardsService } from '../../../services/cardService/cards.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit {
  people = [
    "Anass", "Anis", "Malek", "Naim"
  ];

  types = ["Dev", "Bug"];
  selectedPeople = [];
  cardForm: FormGroup;
  submitted: boolean = false;
  constructor(public bsModalRef: BsModalRef, private router: Router, private cardsService: CardsService, private formBuilder: FormBuilder) {

  }
  get getFormErrors() {
    return this.cardForm.controls; // to get access to errors in form
  }
  ngOnInit() {
    this.cardForm = this.formBuilder.group({
      type: ['', [Validators.required]],
      title: ['', [Validators.required, Validators.pattern('.+')]],
      description: ['', [Validators.required, Validators.pattern('.+')]],
      point: [0, [Validators.required, Validators.pattern('[0-9]')]],
      members: [[], []],
    });
  }


  createCard() {
    this.submitted = true;
    if (this.cardForm.invalid) {
      return; //stop if the form is not valid
    }
    const formValue = this.cardForm.value;
    const type = formValue['type'];
    const title = formValue['title'];
    const description = formValue['description'];
    const point = formValue['point'];
    const members = formValue['members'];
    // console.log("members :" + members);
    // console.log(`title:${title} \n priority:${point} \n description:${description}`)
    let result: boolean = this.cardsService.createCard(type, title, description, point, members);

    if (result == true) {
      this.router.navigate(['/Home/Cards']);
    } else {

      //Print the Error 
    }

  }


}
