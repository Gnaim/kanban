import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { CardsService } from '../../../services/cardService/cards.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Project } from 'src/app/entity/Project';
import { Card } from 'src/app/entity/card';
import { CardStatus } from 'src/app/services/helpers/CardStatus';
import { MyNotificationsService } from 'src/app/services/notifications/notifications.service';


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
  project: Project;
  isUpdate:boolean;

  constructor(private bsModalRef: BsModalRef,
              private router: Router, 
              private notification:MyNotificationsService,
              private cardsService: CardsService, 
              private formBuilder: FormBuilder) {

  }

  ngOnInit() {
    this.cardForm = this.formBuilder.group({
      type: ['', [Validators.required]],
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      members: [[], []],
    });
    if(this.isUpdate && this.isUpdate == true){
      //remplir le form avec les doonnes
    }
  }

  get getFormErrors() {
    return this.cardForm.controls; // to get access to errors in form
  }

  submitForm(){
    if(this.isUpdate && this.isUpdate == true){
      this.updateCard();
    }else{
      this.createCard();
    }
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
    const card : Card = new Card(title,type,null,description);
    
    this.cardsService.createCard(card,this.project._id).subscribe(
      (response) => {
        console.log(response);
        this.notification.showTaskCreationSuccess();
        this.bsModalRef.hide();
      },(error) => {
        this.notification.showErrorNotification(error);
      }
    );

  }

  updateCard(){

  }

}
