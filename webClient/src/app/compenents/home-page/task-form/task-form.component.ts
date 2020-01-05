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
  
  people = ["Anass", "Anis", "Malek", "Naim"];
  types = ["Dev", "Bug"];
  status = ["Backlog","Doing","Done"];
  
  cardForm: FormGroup;
  project: Project;
  projectName: string;
  projectId : string;
  card : Card;
  selectedMembers = [];
  projectMembers = [];
  submitted: boolean = false;
  isUpdate:boolean;
  isConsult:boolean;
            
  constructor(private bsModalRef: BsModalRef,
              private router: Router, 
              private notification:MyNotificationsService,
              private cardsService: CardsService, 
              private formBuilder: FormBuilder) {

  }

  ngOnInit() {
    console.log(this.card);
    if(this.project){
      this.projectName = this.project.name;
    }
    this.cardForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      type: ['', [Validators.required]],
      status : ['Backlog',[Validators.required]],
      description: ['', [Validators.required]],
      members: [[], []],
    });
    if(this.isUpdate && this.isUpdate == true){
      this.initFormWithValues();
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

  switchToEdit(){
    this.initFormWithValues();
    this.isConsult = false;
    this.isUpdate = true;
  }

  cancelEdit(){
    this.isConsult = true;
    this.isUpdate = false;
  }

  initFormWithValues(){
    this.cardForm.patchValue({
      title : this.card.title,
      description : this.card.description,
      type : this.card.type,
      status : this.card.status,
      members : this.card.members,
    });
  }

  updateCard(){
    console.log("updateCard");
    this.submitted = true;
    if (this.cardForm.invalid) {
      return; //stop if the form is not valid
    }
    const formValue = this.cardForm.value;
    const type = formValue['type'];
    const status = formValue['status'];
    const title = formValue['title'];
    const description = formValue['description'];
    const members = formValue['members'];
    const membersEmails = this.getAssignedMembersEmails(members);
    const cardStatus = status as CardStatus;
    const card : Card = new Card(title,type,cardStatus,description,null,null,membersEmails,this.card._id);
    this.cardsService.updateCard(card,this.projectId).subscribe(
      (response) => {
        console.log(response);
        this.notification.showTaskUpdateSuccess();
        this.bsModalRef.hide();
      },
      (error) => {
        console.log(error);
        this.notification.showErrorNotification(error);
      } 
    );
  }

  deleteCard(){
    this.cardsService.deleteCard(this.card._id,this.projectId).subscribe(
      (response) => {
        this.notification.showTaskDeleteSuccess();
        this.bsModalRef.hide();
      },(error) => {
        console.log(error);
        this.notification.showErrorNotification(error);
      }
    );
  }

  getAssignedMembersEmails(assignedMembers){
    let membersIds = [];
    console.log(assignedMembers);
      for(let i=0; i<assignedMembers.length; i++){
          membersIds.push(assignedMembers[i].email);
      }
      return membersIds;
  }
}
